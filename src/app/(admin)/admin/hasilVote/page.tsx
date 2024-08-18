"use client";
import React, { useEffect, useState } from "react";
import { VoteSessionListProps } from "./_components/DataTypes";
import { getDataAPIMany } from "@/utils/DataFetching/getData";
import DataTable, { TableColumn } from "react-data-table-component";
import { LinkButton } from "@/app/components/general/Button";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function HasilVote() {
  const [voteResult, setVoteResult] = useState<VoteSessionListProps[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function GetVoteSessionList() {
      const res = await getDataAPIMany("/api/votesession-list");
      const data = res.data || [];
      setVoteResult(data);
    }
    GetVoteSessionList();
  }, []);

  const columns: TableColumn<VoteSessionListProps>[] = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Max Vote",
      selector: (row) => row.max_vote,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          className={clsx(
            "px-6 py-2 bg-primary-color border-2 border-primary-color text-white rounded-full",
            "transition-all duration-300 ease-in-out",
            "hover:bg-transparent hover:text-primary-color",
          )}
          onClick={() => router.push(`/admin/hasilVote/${row.id}`)}
        >
          Detail
        </button>
      ),
    },
  ];
  return (
    <>
      <div className="mt-10">
        <DataTable columns={columns} data={voteResult} />
      </div>
    </>
  );
}
