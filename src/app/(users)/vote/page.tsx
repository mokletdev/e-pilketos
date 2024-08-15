import { LinkButton } from "@/app/components/general/Button";
import SectionsGap from "@/app/components/general/SectionsGap";

import { H4 } from "@/app/components/general/Text";
import { nextGetServerSession } from "@/lib/AuthOptions";
import { getAllVoteSession } from "@/utils/database/voteSession.query";
import CardVote from "./_components/cardVote";
import { redirect } from "next/navigation";

export default async function VoteList() {
  const session = await nextGetServerSession();
  if (!session?.user) return redirect("/login?callbackUrl=/vote");

  const voteList = await getAllVoteSession({
    OR: [
      { isPublic: true },
      { vote_session_access: { some: { user_Id: session?.user?.id } } },
    ],
  });

  return (
    <SectionsGap>
      <section className={`max-w-full w-full mx-auto mt-20 mb-20 min-h-[80vh]`}>
        <H4 className="text-center">Pemungutan Suara</H4>
        <div className="grid grid-cols- md:grid-cols-2 xl:grid-cols-3 gap-6 px-6 mt-8">
          {voteList.map(
            (
              {
                vote_session_access,
                vote_session_candidate,
                User_vote,
                ...vote
              },
              i,
            ) => {
              const alreadyVote =
                User_vote.findIndex(
                  (data) => data.user_Id === session.user?.id,
                ) !== -1;
              return (
                <CardVote
                  voteSession={vote}
                  key={vote.id}
                  alreadyVote={alreadyVote}
                />
              );
            },
          )}
        </div>
      </section>
    </SectionsGap>
  );
}
