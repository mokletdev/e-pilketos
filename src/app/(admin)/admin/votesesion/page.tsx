import { getAllVoteSession } from "@/utils/database/voteSession.query";
import VoteSessionTable from "./_components/Table";
import AddVoteSession from "./_components/AddVoteSession";

type VoteSession = {
  id: string;
  title: string;
  openedAt: string;
  closeAt: string;
  isPublic: boolean;
};

async function fetchVoteSessions() {
  const result = await getAllVoteSession();
  return result.map((item) => ({
    id: item.id,
    title: item.title,
    openedAt: item.openedAt.toISOString(),
    closeAt: item.closeAt.toISOString(),
    isPublic: item.isPublic,
  }));
}

export default async function VotesesionPage() {
  const data = await fetchVoteSessions();

  return (
    <div className="max-w-full min-h-screen">
      <ClientWrapper>
        <AddVoteSession />
      </ClientWrapper>
      <VoteSessionTable data={data} />
    </div>
  );
}

function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
