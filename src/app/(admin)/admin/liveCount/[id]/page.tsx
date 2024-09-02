"use client";
import React, { useEffect, useState } from "react";
import CandidateCard from "../_components/CandidateCard";
import { H1, Large_Text } from "@/app/components/general/Text";
import { getDataAPIMany } from "@/utils/DataFetching/getData";
import { LiveCountPayload } from "@/utils/database/voteSession.query";
import { VoteSessionResponse } from "@/types/liveCount";

export default function DetailLiveCount({
  params,
}: {
  params: { id: string };
}) {
  const [liveCount, setLiveCount] = useState<VoteSessionResponse>();

  useEffect(() => {
    async function GetDataLiveCount() {
      const responses = await getDataAPIMany(`/api/votesession/${params.id}`);
      const result: VoteSessionResponse = responses.data || [];
      setLiveCount(result);
    }
    GetDataLiveCount();
  }, [params.id]);

  console.log(liveCount);

  return (
    <main className="h-[100vh] flex">
      <div className="my-auto w-full mx-auto flex flex-col gap-24">
        <div>
          <H1 className="text-center">Live Count</H1>
          <Large_Text
            className="text-center text-secondary-text-color"
            variant="REGULAR"
          >
            {liveCount?.title}
          </Large_Text>
        </div>
        <CandidateCard data={liveCount!} />
      </div>
    </main>
  );
}
