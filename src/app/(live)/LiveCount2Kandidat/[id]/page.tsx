"use client";
import React, { useEffect, useState } from "react";
import { H1, Large_Text } from "../../../components/general/Text";
import CandidateCard from "../../../(admin)/admin/liveCount/_components/CandidateCard";
import { VoteSessionResponse } from "@/types/liveCount";
import { getDataAPIMany } from "@/utils/DataFetching/getData";

export default function LiveCount2Kandidat({
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
  return (
    <main className="h-[100vh] flex max-w-screen-2xl mx-auto">
      <div className="my-auto w-full mx-auto flex flex-col gap-10">
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
