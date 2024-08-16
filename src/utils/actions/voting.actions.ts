"use server";

import { nextGetServerSession } from "@/lib/AuthOptions";
import client from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getVoteSession } from "../database/voteSession.query";

function vote(voteSessionId: string, candidateId: string, userId: string) {
  return client.$transaction(
    async (tx) => {
      const voteSession = await tx.vote_session.findUnique({
        where: { id: voteSessionId },
      });
      const countVote = await tx.user_vote.count({
        where: { vote_session_id: voteSessionId, user_Id: userId },
      });

      if (!voteSession) {
        throw new Error(`${voteSessionId} not found in database`);
      }

      if (countVote >= voteSession.max_vote) {
        throw new Error(`User ${userId} has voted. Unauthorised request`);
      }

      const save = await tx.user_vote.create({
        data: {
          vote_session_id: voteSessionId,
          candidate_id: candidateId,
          user_Id: userId,
        },
      });

      return save;
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
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

    if (!session?.user)
      return {
        success: false,
        message: "Akses tidak sah. Coba muat ulang halaman",
      };

    const userId = session?.user?.id;

    const voteSession = await client.vote_session.findFirst({
      where: {
        id: voteSessionId,
        OR: [
          { isPublic: true },
          { vote_session_access: { some: { user_Id: userId } } },
        ],
      },
    });

    if (!voteSession)
      return {
        success: false,
        message: "Akses tidak sah. Coba muat ulang halaman",
      };

    if (
      voteSession.openedAt.getTime() >= Date.now() ||
      voteSession.closeAt.getTime() <= Date.now()
    ) {
      return {
        success: false,
        message: "Akses tidak sah. Coba muat ulang halaman",
      };
    }

    if (candidateId.length !== voteSession.max_vote)
      return {
        success: false,
        message: "Akses tidak sah. Coba muat ulang halaman",
      };

    await Promise.all(candidateId.map((id) => vote(voteSessionId, id, userId)));
    return { success: true, message: "Berhasil melakukan voting" };
  } catch (e) {
    console.log((e as Error).message);
    return { success: false, message: "Internal Server Error. Hubungi Admin" };
  }
};
