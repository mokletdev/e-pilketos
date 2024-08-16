"use client";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  VoteSessionAccessType,
  VoteSessionGeneralPayload,
} from "@/utils/database/voteSession.query";
import toast from "react-hot-toast";
import { deleteVoteSessionById } from "@/utils/database/getServerSession";
import { Large_Text } from "@/app/components/general/Text";
import VoteSessionModal from "./Modal";
import { FormButton } from "@/app/components/general/Button";
import PlusIcon from "@/app/components/Icons/PlusIcon";
import { deleteAcess } from "@/utils/actions/voteSession.actions";
import { Role } from "@prisma/client";

export default function VoteSessionAccessTable({
  data,
  users,
  id,
}: {
  data: VoteSessionAccessType;
  users: {
    id: string;
    name: string;
    kelas: string | null;
    role: Role;
  }[];
  id: string;
}) {
  const [loader, setLoader] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const columns: TableColumn<
    VoteSessionAccessType["vote_session_access"][0]
  >[] = [
    {
      name: "Name",
      selector: (row) => row.user.name,
      sortable: true,
    },
    {
      name: "User Role",
      selector: (row) => row.user.role,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
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

  async function deleteAction(id: string) {
    if (!confirm("Are you sure you want to delete access?")) return;
    const toastId = toast.loading("Loading...");
    const result = await deleteAcess(id);

    if (result.success) toast.success(result.message, { id: toastId });
    else toast.error(result.message, { id: toastId });
  }

  useEffect(() => {
    setLoader(false);
  }, []);

  if (loader) return <div>Loading</div>;

  return (
    <div>
      <div className="flex w-full justify-between">
        <Large_Text variant="SEMIBOLD">{data.title}</Large_Text>
        <FormButton variant="PRIMARY" onClick={() => setIsOpenModal(true)}>
          <div className="flex items-center gap-x-3">
            <PlusIcon />
            Add Users
          </div>
        </FormButton>
      </div>
      <section
        className={`max-w-full w-full grid grid-cols-1 xl:grid-cols-2 gap-6 mb-20 `}
      >
        {isOpenModal && (
          <VoteSessionModal
            setIsOpenModal={setIsOpenModal}
            users={users}
            id={id}
          />
        )}
      </section>
      <DataTable
        columns={columns}
        data={data.vote_session_access}
        pagination
        highlightOnHover
      />
    </div>
  );
}
