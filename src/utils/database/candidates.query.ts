import client from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllCandidates = async (
  filter?: Prisma.CandidatesWhereInput,
) => {
  return await client.candidates.findMany({
    where: filter,
    include: {
      pengalaman: true,
      User_vote: { select: { vote_session: true } },
      user: true,
    },
  });
};

export const getCandidates = async (id: string) => {
  return await client.candidates.findFirst({
    where: {
      id: id,
    },
    include: { pengalaman: true, user: true, User_vote: true },
  });
};

export const createCandidate = async (data: Prisma.CandidatesCreateInput) => {
  return await client.candidates.create({
    data: data,
    include: {
      pengalaman: true,
      user: true,
    },
  });
};

export const updateCandidate = async (
  id: string,
  data: Prisma.CandidatesUpdateInput,
) => {
  return await client.candidates.update({
    where: {
      id: id,
    },
    data: data,
  });
};

export const deleteCandidate = async (id: string) => {
  return await client.candidates.delete({
    where: {
      id: id,
    },
  });
};

export const CountCandidatesbyId = async (
  CadidateId: string,
  vote_session_id: string,
) => {
  return await client.user_vote.count({
    where: {
      candidate_id: CadidateId,
      vote_session_id: vote_session_id,
    },
  });
};

export const getAllCandidatesByVoteSession = async (
  vote_session_id: string,
) => {
  return await client.user_vote.findMany({
    where: {
      vote_session_id: vote_session_id,
    },
  });
};

export type getCandidatesPayload = Prisma.CandidatesGetPayload<{
  include: { pengalaman: true };
}>;

export type getPengalamanCandidates = Prisma.PengalamanGetPayload<{}>;

export type getCreatePengalamanCandidates =
  Prisma.PengalamanCreateWithoutCandidatesInput;
