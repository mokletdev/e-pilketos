import client from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllVoteSession = async (
  where?: Prisma.Vote_sessionWhereInput,
) => {
  try {
    const voteSession = await client.vote_session.findMany({
      where,
      include: {
        User_vote: { include: { candidate: true } },
        vote_session_access: true,
        vote_session_candidate: { include: { candidate: true } },
      },
    });
    return voteSession;
  } catch (error) {
    console.error((error as Error).message);
    return [];
  }
};

export type VoteSessionAccessType = Prisma.Vote_sessionGetPayload<{
  select: {
    title: true;
    vote_session_access: {
      include: { user: { select: { name: true; role: true } } };
    };
  };
}>;

export const getVoteSessionAccess = async (
  where?: Prisma.Vote_sessionWhereInput,
) => {
  try {
    const voteSession = await client.vote_session.findFirst({
      where,
      select: {
        title: true,
        vote_session_access: {
          include: { user: { select: { name: true, role: true } } },
        },
      },
    });

    return voteSession;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};

export const getAllVoteSessionCandidates = async () => {
  try {
    const voteSessionCandidates =
      await client.vote_session_candidate.findMany();
    return voteSessionCandidates;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getVoteSessionById = async (id: string) => {
  try {
    const voteSession = await client.vote_session.findFirst({
      where: { id },
    });
    return voteSession;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};

export const createVoteSession = async (data: VoteSessionGeneralPayload) => {
  try {
    const voteSession = await client.vote_session.create({
      data: {
        title: data.title,
        openedAt: data.openedAt,
        closeAt: data.closeAt,
        isPublic: data.isPublic,
        max_vote: data.max_vote,
        vote_session_candidate: {
          create: data.vote_session_candidate.map((can) => ({
            candidate_id: can.candidate_id,
            candidates_number: can.candidates_number,
          })),
        },
      },
    });

    return voteSession;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};

export const GetVoteSessionList = async () => {
  try {
    const voteSessionList = await client.vote_session.findMany({
      select: { id: true, title: true, max_vote: true },
    });
    return voteSessionList;
  } catch (error) {
    console.log(error as Error);
    return;
  }
};

export const updatedVoteSessionbyId = async (
  id: string,
  data: VoteSessionGeneralPayload,
) => {
  try {
    const voteSession = await client.vote_session.update({
      where: { id },
      data: {
        title: data.title,
        openedAt: data.openedAt,
        closeAt: data.closeAt,
        isPublic: data.isPublic,
        max_vote: data.max_vote,
      },
    });
    return voteSession;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};

export const deleteVoteSession = async (id: string) => {
  try {
    await client.vote_session.delete({
      where: {
        id,
      },
    });
    return true;
  } catch (error) {
    console.error((error as Error).message);
    return false;
  }
};

export const getVoteSession = async (id: string) => {
  try {
    const voteSession = await client.vote_session.findFirst({
      where: {
        id,
      },
    });
    return voteSession;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};

export const getVoteSessionByTitle = async (title: string) => {
  try {
    const voteSession = await client.vote_session.findFirst({
      where: {
        title,
      },
    });
    return voteSession;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};

export const getVoteSessionByDate = async (date: Date) => {
  try {
    const voteSession = await client.vote_session.findFirst({
      where: {
        openedAt: date,
      },
    });
    return voteSession;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};

export const getVoteSessionByPublic = async (isPublic: boolean) => {
  try {
    const voteSession = await client.vote_session.findFirst({
      where: {
        isPublic,
      },
    });
    return voteSession;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};

export const UpdateVoteSession = async (
  id: string,
  data: VoteSessionGeneralPayload,
) => {
  try {
    await client.vote_session_candidate.deleteMany({
      where: { vote_session_id: id },
    });

    const voteSession = await client.vote_session.update({
      where: { id },
      data: {
        title: data.title,
        openedAt: data.openedAt,
        closeAt: data.closeAt,
        isPublic: data.isPublic,
        max_vote: data.max_vote,
      },
    });

    await client.vote_session_candidate.createMany({
      data: data.vote_session_candidate.map((can) => ({
        candidate_id: can.candidate_id,
        candidates_number: can.candidates_number,
        vote_session_id: id,
      })),
    });

    return voteSession;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};

export type VoteSessionGeneralPayload = Prisma.Vote_sessionGetPayload<{
  include: {
    vote_session_candidate: {
      select: { candidate_id: true; candidates_number: true };
    };
    // User_vote: true;
    // vote_session_access: true;
  };
}>;
export type VoteSessionWithCandidates = Prisma.Vote_sessionGetPayload<{
  include: {
    vote_session_candidate: {
      select: { candidate_id: true; candidates_number: true };
    };
    // User_vote: true;
    // vote_session_access: true;
  };
}>;

export type LiveCountPayload = Prisma.Vote_session_candidateGetPayload<{
  include: {
    candidate: {
      select: {
        _count: { select: { User_vote: true } };
        img: true;
        kandidat_kelas: true;
        name: true;
        id: true;
        User_vote: {
          select: { user: { select: { role: true } } };
        };
        Vote_session_candidate: true;
      };
    };
  };
}>;

export type VoteSessionListPayload = Prisma.Vote_sessionGetPayload<{
  select: { id: true; title: true; max_vote: true };
}>;
export type VoteSessionLiveCountListPayload = Prisma.Vote_sessionGetPayload<{
  select: { id: true; title: true; max_vote: true; isPublic: true };
}>;

export type VoteSessionWithUserVotePayload = Prisma.Vote_sessionGetPayload<{
  include: { User_vote: { select: { user: true } } };
}>;

export type getCandidatesWhereVoteSessionInput =
  Prisma.Vote_session_candidateGetPayload<{
    include: { vote_session: true };
  }>;

export type CandidatesWithVoteSessionCandidates =
  Prisma.Vote_session_candidateGetPayload<{
    select: { candidate_id: true; candidates_number: true };
  }>;
