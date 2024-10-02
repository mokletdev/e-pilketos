"use server";

import { nextGetServerSession } from "@/lib/AuthOptions";
import client from "@/lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { syncSpreadsheet } from "./spreadsheet.actions";

async function getVoteSession(voteSessionId: string, userId: string) {
  return await client.vote_session.findFirst({
    where: {
      id: voteSessionId,
      OR: [
        { isPublic: true },
        { vote_session_access: { some: { user_Id: userId } } },
      ],
    },
  });
}

async function hasUserExceededVotes(
  tx: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >,
  voteSessionId: string,
  userId: string,
  maxVotes: number,
) {
  const userVotes = await tx.user_vote.count({
    where: { vote_session_id: voteSessionId, user_Id: userId },
  });
  return userVotes >= maxVotes;
}

async function saveUserVote(
  tx: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >,
  voteSessionId: string,
  candidateId: string,
  userId: string,
) {
  return await tx.user_vote.create({
    data: {
      vote_session_id: voteSessionId,
      candidate_id: candidateId,
      user_Id: userId,
    },
  });
}

async function vote(
  voteSessionId: string,
  candidateId: string,
  userId: string,
  retryCount = 0,
) {
  const maxRetries = 3;

  try {
    return await client.$transaction(
      async (tx) => {
        const voteSession = await tx.vote_session.findUnique({
          where: { id: voteSessionId },
        });

        if (!voteSession) {
          throw new Error(`Vote session with ID ${voteSessionId} not found`);
        }

        if (
          await hasUserExceededVotes(
            tx,
            voteSessionId,
            userId,
            voteSession.max_vote,
          )
        ) {
          throw new Error(
            `User ${userId} has reached the maximum allowed votes`,
          );
        }

        return await saveUserVote(tx, voteSessionId, candidateId, userId);
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 10000,
        timeout: 10000,
      },
    );
  } catch (error) {
    const isDeadlockOrWriteConflict =
      (error as Prisma.PrismaClientKnownRequestError).code === "P2034";

    if (isDeadlockOrWriteConflict && retryCount < maxRetries) {
      console.warn(
        `Write conflict detected, retrying transaction... Attempt ${
          retryCount + 1
        }`,
      );
      await new Promise((resolve) =>
        setTimeout(resolve, (retryCount + 1) * 1000),
      );
      return vote(voteSessionId, candidateId, userId, retryCount + 1);
    }

    throw new Error(
      `Transaction failed after ${retryCount + 1} attempts: ${error}`,
    );
  }
}

export const submitVote = async ({
  voteSessionId,
  candidateId,
}: {
  voteSessionId: string;
  candidateId: string[];
}) => {
  try {
    const session = await nextGetServerSession();
    if (!session?.user) {
      return {
        success: false,
        message: "Unauthorized access. Please reload the page.",
      };
    }

    const userId = session.user.id;
    const voteSession = await getVoteSession(voteSessionId, userId);

    if (!voteSession) {
      return {
        success: false,
        message: "Unauthorized access. Please reload the page.",
      };
    }

    const now = Date.now();
    if (
      voteSession.openedAt.getTime() > now ||
      voteSession.closeAt.getTime() < now
    ) {
      return {
        success: false,
        message: "The voting session is currently closed.",
      };
    }

    if (candidateId.length !== voteSession.max_vote) {
      return {
        success: false,
        message: `You must select exactly ${voteSession.max_vote} candidates.`,
      };
    }

    const voting = await Promise.all(
      candidateId.map((id) => vote(voteSessionId, id, userId)),
    );
    if (voting.some((result) => !result)) {
      return {
        success: false,
        message: "Failed to submit vote. Please try again.",
      };
    }

    if (voteSession.spreadsheetId) await syncSpreadsheet(voteSessionId);

    return { success: true, message: "Vote successfully submitted." };
  } catch (error) {
    console.error("Error during vote submission:", (error as Error).message);
    return {
      success: false,
      message: "Internal Server Error. Please contact the administrator.",
    };
  }
};
