"use client";

import { LinkButton } from "@/app/components/general/Button";
import LoadingDots from "@/app/components/general/LoadingDots";
import { Large_Text, Medium_Text } from "@/app/components/general/Text";
import { useCountdown } from "@/utils/useCountdown";
import { Vote_session } from "@prisma/client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";

export default function CardVote({
  voteSession,
  alreadyVote,
}: {
  voteSession: Vote_session;
  alreadyVote: boolean;
}) {
  const [loading, setLoading] = useState(true);
  const [closed, setClosed] = useState(true);

  const [days, hours, minutes, seconds] = useCountdown(voteSession.closeAt);

  useEffect(() => {
    setClosed(
      days + hours + minutes + seconds <= 0 ||
        voteSession.openedAt.getTime() > new Date().getTime(),
    );
  }, [days, hours, minutes, seconds, voteSession.openedAt]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <LoadingDots />;

  return (
    <div
      className="bg-white rounded-md flex p-4 flex-col justify-between"
      key={voteSession.id}
    >
      <Large_Text variant="SEMIBOLD">{voteSession.title}</Large_Text>
      <div className="flex flex-col">
        <Medium_Text variant="REGULAR" className="flex items-center gap-2 mt-4">
          <FaClock />{" "}
          {closed
            ? "closed / not started yet."
            : `${days}d ${hours}h ${minutes}m ${seconds}s`}
        </Medium_Text>
        <div className="border border-bottom border-solid w-full border-black my-4"></div>
        <LinkButton
          variant={closed ? "DISABLE" : alreadyVote ? "DISABLE" : "PRIMARY"}
          className={clsx(
            "w-full text-center",
            (closed || alreadyVote) && "pointer-events-none",
          )}
          href={
            closed || alreadyVote ? "/AccessDenied" : `/vote/${voteSession.id}`
          }
        >
          {closed ? "Ditutup" : alreadyVote ? "Sudah Vote" : "Akses Pemilihan"}
        </LinkButton>
      </div>
    </div>
  );
}
