"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Trash from "@/../public/images/TrashIcon.png";
import Edit from "@/../public/images/EditIcon.png";
import AddCandidates from "./AddCandidates";
import EmptyCandidates from "../../_components/EmptyCandidates";
import { CandidatesPayload } from "@/utils/database/user.query";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import { deleteCandidatesById } from "@/utils/database/getServerSession";
import Modal from "./Modal";
export default function CandidatesTable({
  data,
}: {
  data: CandidatesPayload[];
}) {
  const [modal, setModal] = useState(false);
  const [dataCandidate, setDataCandidate] = useState<CandidatesPayload | null>(
    null,
  );
  const [loader, setLoader] = useState(true);

  const columns: TableColumn<CandidatesPayload>[] = [
    {
      name: "No",
      cell: (row, i) => i + 1,
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: false,
    },
    {
      name: "Kelas",
      selector: (row) => row.kandidat_kelas as string,
      sortable: false,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-x-3">
          <button
            title="Button"
            onClick={() => EditDataCandidates(row)}
            className="p-[8px] bg-[#D0F0FD] text-white rounded-md hover:ring hover:ring-[#D0F0FD] duration-300"
          >
            <Image src={Edit} alt="edit" />
          </button>
          <button
            title="Button"
            onClick={() => DeteleDataCandidates(row.id)}
            className="p-[8px] bg-red-light-4 text-white rounded-md ml-2 hover:ring hover:ring-red-light-4 duration-300"
          >
            <Image src={Trash} alt="delete" />
          </button>
        </div>
      ),
      sortable: false,
    },
  ];

  function EditDataCandidates(data: CandidatesPayload) {
    setDataCandidate(data);
    setModal(true);
  }

  const DeteleDataCandidates = async (id: string) => {
    if (!confirm("Anda yakin ingin menghapus kandidat ini?")) return;
    const toastId = toast.loading("Loading...");
    const result = await deleteCandidatesById(id);
    if (!result.error) {
      toast.success(result.message, { id: toastId });
    } else toast.error(result.message, { id: toastId });
  };

  useEffect(() => {
    setLoader(false);
  }, []);

  if (loader) return <div>Loading</div>;
  return (
    <>
      <div className="flex w-full justify-end mt-4">
        <AddCandidates />
      </div>
      <div>{data.length === 0 && <EmptyCandidates />}</div>

      <section
        className={`max-w-full w-full grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6`}
      >
        {modal && <Modal data={dataCandidate} setIsOpenModal={setModal} />}
      </section>
      {data.length !== 0 && (
        <div className="z-0">
          <DataTable
            columns={columns}
            data={data}
            pagination
            highlightOnHover
          />
        </div>
      )}
    </>
  );
}
