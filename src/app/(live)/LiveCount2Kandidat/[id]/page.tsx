"use client";
import React, { useEffect, useState } from "react";
import { H1, Large_Text, Medium_Text } from "@/app/components/general/Text";
import { getDataAPIMany } from "@/utils/DataFetching/getData";
import { VoteSessionResponse } from "@/types/liveCount";
import CandidateCard from "@/app/(admin)/admin/liveCount/_components/CandidateCard";

export default function DetailLiveCount({
  params,
}: {
  params: { id: string };
}) {
  const [liveCount, setLiveCount] = useState<VoteSessionResponse>();
  const duration = 5;

  useEffect(() => {
    async function GetDataLiveCount() {
      const responses = await getDataAPIMany(`/api/votesession/${params.id}`);
      const result: VoteSessionResponse = responses.data || [];
      setLiveCount(result);
    }

    GetDataLiveCount();

    const intervalId = setInterval(() => {
      GetDataLiveCount();
    }, duration * 1000);

    return () => clearInterval(intervalId);
  }, [params.id, duration]);

  return (
    <main className="h-[100vh] flex px-44">
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
        {liveCount && <CandidateCard data={liveCount} />}
      </div>
    </main>
  );
}
