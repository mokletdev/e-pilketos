import { Large_Text } from "@/app/components/general/Text";
import { GetVoteSessionList } from "@/utils/database/voteSession.query";
import React from "react";
import DataVoteSesion from "./_components/DataVoteSession";

export default async function recap() {
  const data = await GetVoteSessionList();

  return (
    <>
      <Large_Text className="mt-12" variant="SEMIBOLD">
        Recap Voting
      </Large_Text>
      <DataVoteSesion data={data!} />
    </>
  );
}
