import client from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllUser = async (filter?: Prisma.UserWhereInput) => {
  return await client.user.findMany({
    where: filter,
    include: { User_Auth: { select: { last_login: true, password: true } } },
  });
};

export const getAllUserAuth = async () => {
  return await client.user_Auth.findMany();
};

// export const getUserNotVote = async () => {
//   return await client.user.findMany({
//     where: {
//       Candidates: undefined,
//       User_vote: {
//         candidate: undefined,
//       },
//     },
//   });
// };
export const findUser = async (filter: Prisma.UserWhereInput) => {
  return await client.user.findFirst({
    where: filter,
    include: { User_Auth: { select: { last_login: true, password: true } } },
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
export const deleteUsers = async (where: Prisma.UserWhereInput) => {
  return await client.user.deleteMany({
    where,
  });
};

// export const CountUserbyVoteSession = async (id_session: string) => {
//   return await client.user.count({
//     where: {
//       User_vote: {
//         vote_session_id: id_session,
//       },
//     },
//   });
// };

// export const UserbyVoteSession = async (id_session: string) => {
//   return await client.user.findMany({
//     where: {
//       User_vote: {
//         vote_session_id: id_session,
//       },
//     },
//   });
// };

export type userLastLoginPayload = Prisma.UserGetPayload<{
  include: { User_Auth: { select: { last_login: true; password?: true } } };
}>;

export type VotesessionCandidateWithPengalaman =
  Prisma.Vote_session_candidateGetPayload<{
    include: { candidate: { include: { pengalaman: true } } };
  }>;

export type CandidatesPayload = Prisma.CandidatesGetPayload<{
  include: {
    pengalaman: { select: { desc: true } };
    User_vote: { select: { vote_session: true } };
    user: true;
  };
}>;
