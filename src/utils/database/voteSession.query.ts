import client from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllVoteSession = async () => {
  try {
    const voteSession = await client.vote_session.findMany({
      // select: { User_vote: { include: { candidate: true } } },
      include: { User_vote: { include: { candidate: true } } },
    });
    return voteSession;
  } catch (error) {
    console.error((error as Error).message);
    return [];
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
      },
    });
    return voteSession;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};

export const upsertVoteSession = async (
  id: string | undefined,
  formData: FormData,
) => {
  try {
    const title = formData.get("title") as string;
    const start_time = new Date(formData.get("start_time") as string);
    const end_time = new Date(formData.get("end_time") as string);
    const is_active = formData.get("is_active") === "true";
    const max_vote = parseInt(formData.get("max_vote") as string, 10) || 1000;

    if (id) {
      const updatedVoteSession = await client.vote_session.update({
        where: { id },
        data: {
          title: title,
          openedAt: start_time,
          closeAt: end_time,
          isPublic: is_active,
          max_vote: max_vote,
        },
      });
      return {
        error: false,
        message: "Vote session updated successfully",
        data: updatedVoteSession,
      };
    } else {
      const newVoteSession = await client.vote_session.create({
        data: {
          title: title,
          openedAt: start_time,
          closeAt: end_time,
          isPublic: is_active,
          max_vote: max_vote,
        },
      });
      return {
        error: false,
        message: "Vote session created successfully",
        data: newVoteSession,
      };
    }
  } catch (error) {
    console.error((error as Error).message);
    return {
      error: true,
      message: "An error occurred while upserting the vote session",
    };
  }
};

export const deleteVoteSessionById = async (id: string) => {
  try {
    await client.vote_session.delete({ where: { id } });
    return { error: false, message: "Vote session deleted successfully" };
  } catch (error) {
    console.error((error as Error).message);
    return {
      error: true,
      message: "An error occurred while deleting the vote session",
    };
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

export type VoteSessionGeneralPayload = Prisma.Vote_sessionGetPayload<{}>;
export type VoteSessionWithCandidates = Prisma.Vote_sessionGetPayload<{
  include: {
    Vote_session_candidate: true;
    User_vote: { select: { candidate: true; candidate_id: true } };
  };
}>;

export type VoteSessionWithUserVotePayload = Prisma.Vote_sessionGetPayload<{
  include: { User_vote: { select: { user: true } } };
}>;

export type getCandidatesWhereVoteSessionInput =
  Prisma.CandidatesCreateWithoutUser_voteInput;
