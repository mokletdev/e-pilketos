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

export const getUser = async (id: number) => {
  return await client.user.findUnique({
    where: {
      id: id,
    },
  });
};

export const createUser = async (data: Prisma.UserCreateInput) => {
  return await client.user.create({
    data: data,
  });
};

export const updateUser = async (id: number, data: Prisma.UserUpdateInput) => {
  return await client.user.update({
    where: {
      id: id,
    },
    data: data,
  });
};

export const deleteUser = async (id: number) => {
  return await client.user.delete({
    where: {
      id: id,
    },
  });
};

export const CountUserAngkatanbyVoteCandidate = async (id_candidate: number, angkatan: string) => {
  return await client.user.count({
    where: {
      Candidates: {
        id: id_candidate,
      },
      angkatan: angkatan,
    },
  });
}