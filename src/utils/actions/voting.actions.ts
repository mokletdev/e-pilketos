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
) {
  return client.$transaction(
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
        throw new Error(`User ${userId} has reached the maximum allowed votes`);
      }

      return await saveUserVote(tx, voteSessionId, candidateId, userId);
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead,
      maxWait: 5000,
      timeout: 10000,
    },
  );
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

    await Promise.all(candidateId.map((id) => vote(voteSessionId, id, userId)));

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
