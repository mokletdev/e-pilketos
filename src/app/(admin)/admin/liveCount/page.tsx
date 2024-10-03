import { GetVoteSessionList } from "@/utils/database/voteSession.query";
import DataVoteSesion from "./_components/DataVoteSesion";
import { Large_Text } from "@/app/components/general/Text";
import React from "react";

export default async function LiveCount() {
  const data = await GetVoteSessionList();

  return (
    <>
      <Large_Text className="mt-12" variant="SEMIBOLD">
        Data Live Count
      </Large_Text>
      <DataVoteSesion data={data!} />
    </>
  );
}
