import client from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllUser = async () => {
  return await client.user.findMany();
};

export const getUserNotVote = async () => {
  return await client.user.findMany({
    where: {
      Candidates: undefined,
      User_vote: {
        candidate: undefined,
      },
    },
  });
};
export const findUser = async (filter: Prisma.UserWhereInput) => {
  return await client.user.findFirst({
    where: filter,
    include: { User_Auth: { select: { last_login: true } } },
  });
};

export const getUser = async (id: string) => {
  return await client.user.findUnique({
    where: {
      id: id,
    },
  });
};

export const createUser = async (data: Prisma.UserUncheckedCreateInput) => {
  return await client.user.create({
    data,
  });
};

export const updateUser = async (
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput,
) => {
  return await client.user.update({
    where,
    data: data,
  });
};

export const deleteUser = async (id: string) => {
  return await client.user.delete({
    where: {
      id: id,
    },
  });
};

export const CountUserbyVoteSession = async (id_session: string) => {
  return await client.user.count({
    where: {
      User_vote: {
        vote_session_id: id_session,
      },
    },
  });
};

export const UserbyVoteSession = async (id_session: string) => {
  return await client.user.findMany({
    where: {
      User_vote: {
        vote_session_id: id_session,
      },
    },
  });
};
