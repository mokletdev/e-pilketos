"use client";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { VoteSessionGeneralPayload } from "../../../../../utils/database/voteSession.query"; // Adjust the import path as needed
import VoteSessionModal from "./Modal"; // Adjust the import path as needed
import toast from "react-hot-toast";
import AddVoteSession from "./AddVoteSession";
import { deleteVoteSessionById } from "@/utils/database/getServerSession";
import { Candidates } from "@prisma/client";

export default function VoteSessionTable({
  data,
  candidates,
}: {
  data: VoteSessionGeneralPayload[];
  candidates: Candidates[];
}) {
  const [loader, setLoader] = useState(true);
  const [modalData, setModalData] = useState<VoteSessionGeneralPayload | null>(
    null,
  );
  const [isOpenModal, setIsOpenModal] = useState(false);

  const columns: TableColumn<VoteSessionGeneralPayload>[] = [
    {
      name: "Session Name",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Start Time",
      selector: (row) => new Date(row.openedAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "End Time",
      selector: (row) => new Date(row.closeAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "Active",
      selector: (row) => row.isPublic,
      cell: (row) => <span>{row.isPublic ? "Yes" : "No"}</span>,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => editVoteSession(row)}
            title="Edit Vote Session"
            className="bg-blue-100 text-blue-800 text-xs font-medium me-2 p-2.5 rounded hover:text-white hover:bg-blue-700 transition-all"
          >
            <FaPencilAlt />
          </button>
          <button
            onClick={() => deleteAction(row.id)}
            title="Delete Vote Session"
            className="bg-red-100 text-red-800 text-xs font-medium me-2 p-2.5 rounded hover:text-white hover:bg-red-700 transition-all"
          >
            <FaRegTrashAlt />
          </button>
        </div>
      ),
    },
  ];

  function editVoteSession(data: VoteSessionGeneralPayload) {
    setModalData(data);
    setIsOpenModal(true);
  }

  async function deleteAction(id: string) {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const toastId = toast.loading("Loading...");
    const result = await deleteVoteSessionById(id);
    if (!result.error) toast.success(result.message, { id: toastId });
    else toast.error(result.message, { id: toastId });
  }

  useEffect(() => {
    setLoader(false);
  }, []);

  if (loader) return <div>Loading</div>;

  return (
    <div>
      <div className="flex w-full justify-end">
        <AddVoteSession candidates={candidates} />
      </div>
      <section
        className={`max-w-full w-full grid grid-cols-1 xl:grid-cols-2 gap-6 mb-20 `}
      >
        {isOpenModal && (
          <VoteSessionModal
            setIsOpenModal={setIsOpenModal}
            data={modalData}
            candidats={candidates}
          />
        )}
      </section>
      <DataTable columns={columns} data={data} pagination highlightOnHover />
    </div>
  );
}
