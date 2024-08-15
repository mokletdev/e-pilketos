import {
  getAllVoteSession,
  VoteSessionGeneralPayload,
} from "@/utils/database/voteSession.query";
import VoteSessionTable from "./_components/Table";
import client from "@/lib/prisma";

export default async function VotesesionPage() {
  const data = await getAllVoteSession();
  const candidates = await client.candidates.findMany({});

  return (
    <div className="max-w-full min-h-screen">
      <VoteSessionTable data={data} candidates={candidates} />
    </div>
  );
}
