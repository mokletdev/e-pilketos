import {
  getAllVoteSession,
  VoteSessionGeneralPayload,
} from "@/utils/database/voteSession.query";
import VoteSessionTable from "./_components/Table";

export default async function VotesesionPage() {
  const data: VoteSessionGeneralPayload[] = await getAllVoteSession();

  return (
    <div className="max-w-full min-h-screen">
      <VoteSessionTable data={data} />
    </div>
  );
}
