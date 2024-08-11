"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Trash from "@/../public/images/TrashIcon.png";
import Edit from "@/../public/images/EditIcon.png";
import AddUser from "./AddUser";
import DataTable, { TableColumn } from "react-data-table-component";
import { H5, Medium_Text } from "@/app/components/general/Text";
import { userLastLoginPayload } from "@/utils/database/user.query";
import { deleteUserById } from "@/utils/database/getServerSession";
import toast from "react-hot-toast";
import Modal from "./Modal";

export default function UserTable({
  data,
  roles,
  desc,
}: {
  data: userLastLoginPayload[];
  roles: string;
  desc: string;
}) {
  const [modal, setModal] = useState(false);
  const [dataUser, setDataUser] = useState<userLastLoginPayload | null>(null);
  const [loader, setLoader] = useState(true);

  const columns: TableColumn<userLastLoginPayload>[] = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: false,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: false,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: false,
    },
    {
      name: "Last Login",
      selector: (row) =>
        row.User_Auth?.last_login
          ? row.User_Auth?.last_login.toUTCString()
          : "Never",
      sortable: false,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-x-3">
          <button
            title="Button"
            onClick={() => EditDataUser(row)}
            className="p-[8px] bg-[#D0F0FD] text-white rounded-md hover:ring hover:ring-[#D0F0FD] duration-300"
          >
            <Image src={Edit} alt="edit" />
          </button>
          <button
            title="Button"
            onClick={() => DeteleDataUser(row.id)}
            className="p-[8px] bg-red-light-4 text-white rounded-md ml-2 hover:ring hover:ring-red-light-4 duration-300"
          >
            <Image src={Trash} alt="delete" />
          </button>
        </div>
      ),
      sortable: false,
    },
  ];

  function EditDataUser(data: userLastLoginPayload) {
    setDataUser(data);
    setModal(true);
  }

  const DeteleDataUser = async (id: string) => {
    if (!confirm("Anda yakin ingin menghapus user ini?")) return;
    const toastId = toast.loading("Loading...");
    const result = await deleteUserById(id);
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
      <div className="flex justify-between items-center mb-[36px] flex-col gap-4 text-center xl:text-start xl:flex-row ">
        <div>
          <H5>User Management | Data {roles}</H5>
          <Medium_Text variant="REGULAR" className="text-secondary-text-color">
            {desc}
          </Medium_Text>
        </div>
        <div>
          <AddUser />
        </div>
      </div>
      {modal && <Modal data={dataUser} setIsOpenModal={setModal} />}
      <DataTable columns={columns} data={data} pagination highlightOnHover />
    </>
  );
}
