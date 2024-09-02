export interface VoteSessionResponse {
  id: string;
  title: string;
  openedAt: string;
  closeAt: string;
  isPublic: boolean;
  max_vote: number;
  spreadsheetId: string;
  candidates: Candidate[];
}

interface Candidate {
  _count: {
    User_vote: number;
  };
  img: string;
  kandidat_kelas: string;
  name: string;
  id: string;
  User_vote: UserVote[];
  Vote_session_candidate: VoteSessionCandidate[];
  percentage: number;
  weightedPercentage: number;
}

interface UserVote {
  user: {
    role: string;
  };
}

interface VoteSessionCandidate {
  id: string;
  vote_session_id: string;
  candidate_id: string;
  candidates_number: number;
}
