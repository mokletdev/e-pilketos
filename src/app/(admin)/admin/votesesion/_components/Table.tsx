"use client";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaCheck, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { VoteSessionGeneralPayload } from "@/utils/database/voteSession.query"; // Adjust the import path as needed
import VoteSessionModal from "./Modal"; // Adjust the import path as needed
import toast from "react-hot-toast";
import AddVoteSession from "./AddVoteSession";
import { deleteVoteSessionById } from "@/utils/database/getServerSession";
import { Candidates } from "@prisma/client";
import { useRouter } from "next/navigation";
import { createSheet } from "@/utils/actions/spreadsheet.actions";

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
  const router = useRouter();

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
      name: "Show Public",
      selector: (row) => row.isPublic,
      cell: (row) => <span>{row.isPublic ? "Yes" : "No"}</span>,
      sortable: true,
    },
    {
      name: "Spreadsheet",
      cell: (row) =>
        row.spreadsheetId ? (
          <button
            onClick={() =>
              router.push(
                `https://drive.google.com/open?id=${row.spreadsheetId}`,
              )
            }
            title="Open Spreadsheet"
            className="bg-green-100 text-black-800 text-xs font-medium me-2 p-2.5 rounded hover:text-white hover:bg-green-700 transition-all"
          >
            Open
          </button>
        ) : (
          <button
            onClick={() => createSpreadsheet(row.id)}
            title="Create spreadsheet"
            className="bg-gray-200 text-black-800 text-xs font-medium me-2 p-2.5 rounded hover:text-white hover:bg-gray-700 transition-all"
          >
            Create
          </button>
        ),
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

  async function createSpreadsheet(id: string) {
    const toastId = toast.loading("Loading...");
    const sheet = await createSheet(id);

    if (!sheet?.success) return toast.error(sheet?.message, { id: toastId });

    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <FaCheck />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Success create spreadsheet
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() =>
                window.open(
                  `https://drive.google.com/open?id=${sheet.data?.id}`,
                )
              }
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Open Sheet
            </button>
          </div>
        </div>
      ),
      { id: toastId, duration: 4000 },
    );
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
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        onRowClicked={(row) => router.push(`/admin/votesesion/${row.id}`)}
        customStyles={{ rows: { style: { cursor: "pointer" } } }}
      />
    </div>
  );
}
