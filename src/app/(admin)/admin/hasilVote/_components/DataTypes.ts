export interface HasilProps {
  color?: string;
  percentage: number;
  _count: { User_vote: number };
  name: string;
  weightedPercentage: number;
}

export interface VoteSessionListProps {
  id: string;
  title: string;
  max_vote: string;
}
