import client from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllCandidates = async (filter?: Prisma.UserWhereInput) => {
  return await client.candidates.findMany();
};

export const getCandidates = async (id: number) => {
  return await client.candidates.findUnique({
    where: {
      id: id,
    },
  });
};
