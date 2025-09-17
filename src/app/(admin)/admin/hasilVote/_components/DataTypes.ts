import { Role } from "@prisma/client";

export interface HasilProps {
  color?: string;
  percentage: number;
  _count: { User_vote: number };
  name: string;
  weightedPercentage: number;
  User_vote?: Array<{
    user?: {
      role?: Role;
    };
  }>;
  rawVotes?: {
    gukar: number;
    mpk: number;
    osis: number;
  };
  weightedVotesByRole?: {
    gukar: number;
    mpk: number;
    osis: number;
  };
}
export interface VoteSessionListProps {
  id: string;
  title: string;
  max_vote: string;
}
