import { GetServerSideProps } from "next";
import { getAllVoteSession } from "@/utils/database/voteSession.query";
import VoteSessionTable from "./_components/Table";

interface VoteSession {
    id: string;
    title: string;
    openedAt: string;
    closeAt: string;
    isPublic: boolean;
  }
  
  interface VotesesionProps {
    data: VoteSession[];
  }
  
  export default function Votesesion({ data }: VotesesionProps) {
    return (
      <div className="max-w-full min-h-screen">
        <VoteSessionTable data={data} />
      </div>
    );
  }
  
  export const getServerSideProps: GetServerSideProps = async () => {
    const result = await getAllVoteSession();
    const data = result.map((item) => ({
      id: item.id,
      title: item.title,
      openedAt: item.openedAt.toISOString(),
      closeAt: item.closeAt.toISOString(),
      isPublic: item.isPublic,
    }));
  
    return {
      props: { data },
    };
  };