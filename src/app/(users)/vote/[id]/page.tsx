import AccessDenied from "@/app/(unauthorize)/AccessDenied/page";
import { nextGetServerSession } from "@/lib/AuthOptions";
import client from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import VotePage from "../_components/VotePage";
import RejectedDoubleVote from "@/app/(unauthorize)/RejectedDoubleVote/page";

export default async function Vote({ params }: { params: { id: string } }) {
  const session = await nextGetServerSession();
  const { id } = params;

  if (!session?.user) return redirect("/login?callbackUrl=/vote/" + id);

  const voteSession = await client.vote_session.findFirst({
    where: {
      id,
      OR: [
        { isPublic: true },
        { vote_session_access: { some: { user_Id: session?.user?.id } } },
      ],
    },
    include: {
      vote_session_candidate: {
        orderBy: { candidates_number: "asc" },
        include: { candidate: { include: { pengalaman: true } } },
      },
    },
  });

  if (!voteSession) return notFound();
  if (
    voteSession.openedAt.getTime() >= Date.now() ||
    voteSession.closeAt.getTime() <= Date.now()
  )
    return <AccessDenied />;

  const countUserVote = await client.user_vote.count({
    where: { vote_session_id: voteSession.id, user_Id: session.user.id },
  });

  if (countUserVote >= voteSession.max_vote) return <RejectedDoubleVote />;

  return (
    <VotePage
      candidates={voteSession.vote_session_candidate}
      maxVote={voteSession.max_vote}
      voteSessionId={voteSession.id}
    />
  );
}
