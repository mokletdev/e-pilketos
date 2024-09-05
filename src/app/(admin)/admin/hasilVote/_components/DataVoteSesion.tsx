"use client";
import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import clsx from "clsx";
import { VoteSessionListPayload } from "@/utils/database/voteSession.query";
import Link from "next/link";

export default function DataVoteSesion({
  data,
}: {
  data: VoteSessionListPayload[];
}) {
  const columns: TableColumn<VoteSessionListPayload>[] = [
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
        <Link
          className={clsx(
            "px-6 py-2 bg-primary-color border-2 border-primary-color text-white rounded-full",
            "transition-all duration-300 ease-in-out",
            "hover:bg-transparent hover:text-primary-color",
          )}
          href={`/admin/hasilVote/${row.id}`}
        >
          Detail
        </Link>
      ),
    },
  ];
  return (
    <div className="mt-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
