import client from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllCandidates = async () => {
  return await client.candidates.findMany();
};

export const getCandidates = async (id: number) => {
  return await client.candidates.findUnique({
    where: {
      id: id,
    },
  });
};

export const createCandidate = async (data: Prisma.CandidatesCreateInput) => {
  return await client.candidates.create({
    data: data,
  });
};

export const updateCandidate = async (id: number, data: Prisma.CandidatesUpdateInput) => {
  return await client.candidates.update({
    where: {
      id: id,
    },
    data: data,
  });
};

export const deleteCandidate = async (id: number) => {
  return await client.candidates.delete({
    where: {
      id: id,
    },
  });
};

export const CountCandidatesbyId = async (CadidateId : number, vote_session_id : number) => {
  return await client.user_vote.count({
    where: {
      candidate_id : CadidateId,
      vote_session_id : vote_session_id
    }
  })
}

export const getAllCandidatesByVoteSession = async (vote_session_id : number) => {
  return await client.user_vote.findMany({
    where: {
      vote_session_id : vote_session_id
    }
  })
}
