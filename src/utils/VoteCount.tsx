import { Prisma } from "@prisma/client";

export const voteCount = async (
  totalVote: number,
  candidates: Prisma.CandidatesCreateInput[],
  getAllUser: Prisma.UserUncheckedCreateInput[],
) => {
  return {
    totalVote,
    totalVoteAll: candidates.map((candidate, i) => ({
      name: candidate,
      voteCount: getAllUser.filter((user) => user["User_vote"] == i + 1).length,
    })),
    angkatan31: candidates.map((candidate, i) => ({
      name: candidate,
      voteCount: getAllUser.filter(
        (user) => user["User_vote"] == i + 1 && user.email.includes("31"),
      ).length,
    })),
    angkatan32: candidates.map((candidate, i) => ({
      name: candidate,
      voteCount: getAllUser.filter(
        (user) => user["User_vote"] == i + 1 && user.email.includes("32"),
      ).length,
    })),
    angkatan33: candidates.map((candidate, i) => ({
      name: candidate,
      voteCount: getAllUser.filter(
        (user) => user["User_vote"] == i + 1 && user.email.includes("33"),
      ).length,
    })),
    guru: candidates.map((candidate, i) => ({
      name: candidate,
      voteCount: getAllUser.filter(
        (user) => user["User_vote"] == i + 1 && !user.email.includes("student"),
      ).length,
    })),
    all: candidates.map((candidate, i) => ({
      name: candidate,
      voteCount: getAllUser.filter((user) => user["User_vote"] == i + 1).length,
    })),
  };
};
