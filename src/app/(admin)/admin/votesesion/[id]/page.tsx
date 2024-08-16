import {
  getAllVoteSession,
  getVoteSessionAccess,
  VoteSessionAccessType,
  VoteSessionGeneralPayload,
} from "@/utils/database/voteSession.query";
import VoteSessionTable from "./_components/Table";
import client from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function VotesesionPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getVoteSessionAccess({ id: params.id });
  const users = await client.user.findMany({
    select: { id: true, name: true, kelas: true, role: true },
    where: {
      NOT: { vote_session_access: { some: { vote_session_id: params.id } } },
    },
  });

  if (!data) return notFound();

  return (
    <div className="max-w-full min-h-screen">
      <VoteSessionTable data={data} users={users} id={params.id} />
    </div>
  );
}
