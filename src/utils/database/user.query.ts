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
