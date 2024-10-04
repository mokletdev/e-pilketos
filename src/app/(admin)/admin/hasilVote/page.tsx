import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import clsx from "clsx";
import { GetVoteSessionList } from "@/utils/database/voteSession.query";
import Link from "next/link";
import DataVoteSesion from "./_components/DataVoteSesion";
import { Large_Text } from "@/app/components/general/Text";
import InformationCard from "./_components/InformationCard";

export default async function HasilVote() {
  const data = await GetVoteSessionList();

  return (
    <>
      <Large_Text className="mt-12" variant="SEMIBOLD">
        Data Hasil Vote
      </Large_Text>
      <DataVoteSesion data={data!} />
    </>
  );
}
