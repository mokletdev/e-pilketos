import {
  getAllVoteSession,
  VoteSessionGeneralPayload,
} from "@/utils/database/voteSession.query";
import VoteSessionTable from "./_components/Table";
import { CandidatesPayload } from "@/utils/database/user.query";
import { getAllCandidates } from "@/utils/database/candidates.query";

export default async function VotesesionPage() {
  const data: VoteSessionGeneralPayload[] = await getAllVoteSession();
  const candidates: CandidatesPayload[] = await getAllCandidates();

  return (
    <div className="max-w-full min-h-screen">
      <VoteSessionTable data={data} candidates={candidates} />
    </div>
  );
}
