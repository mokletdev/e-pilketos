"use client";

import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Role } from "@prisma/client";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import MiniSearch from "minisearch";
import clsx from "clsx";
import AddUser from "./AddUser";
import DataTable, { TableColumn } from "react-data-table-component";
import { H5, Small_Text } from "@/app/components/general/Text";
import { userLastLoginPayload } from "@/utils/database/user.query";
import { deleteUserById } from "@/utils/database/getServerSession";
import Modal from "./Modal";
import { AddBulk } from "./ModalBulk";
import { TextField } from "@/app/components/general/Input";
import { bulkDeleteUsers } from "@/utils/actions/users.actions";
import { useRouter } from "next/navigation";

export default function UserTable({ data }: { data: userLastLoginPayload[] }) {
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState<userLastLoginPayload | null>(null);
  const [loader, setLoader] = useState(true);
  const [usersData, setUsersData] = useState(data);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [selectedRole, setRoleSelected] = useState<Role | "ALL" | null>(null);
  const router = useRouter();

  const columns: TableColumn<userLastLoginPayload>[] = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Last Login",
      selector: (row) =>
        row.User_Auth?.last_login
          ? row.User_Auth?.last_login.toUTCString()
          : "Never",
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-x-3">
          <button
            title="Edit"
            onClick={() => editUserData(row)}
            className="p-2 bg-blue-500 text-white rounded-lg hover:scale-110 active:scale-105 duration-150"
          >
            <FaPencilAlt size={14} />
          </button>
          <button
            title="Delete"
            onClick={() => deteleUserData(row.id)}
            className="p-2.5 bg-red-500 text-white rounded-md hover:scale-110 active:scale-105 duration-150"
          >
            <FaTrash size={14} />
          </button>
        </div>
      ),
      sortable: false,
    },
  ];

  function editUserData(data: userLastLoginPayload) {
    setUserData(data);
    setModal(true);
  }

  const deteleUserData = async (id: string) => {
    if (!confirm("Anda yakin ingin menghapus user ini?")) return;
    const toastId = toast.loading("Loading...");
    const result = await deleteUserById(id);
    if (!result.error) {
      toast.success(result.message, { id: toastId });
      router.refresh();
    } else toast.error(result.message, { id: toastId });
  };

  const handleRowSelected = useCallback(
    (state: {
      allSelected: boolean;
      selectedCount: number;
      selectedRows: userLastLoginPayload[];
    }) => {
      setSelectedRows(state.selectedRows.map((item) => item.id));
    },
    [],
  );

  const selectableRowSelected = useCallback(
    (row: userLastLoginPayload) =>
      row.role === selectedRole || selectedRole === "ALL",
    [selectedRole],
  );

  async function deleteUsers() {
    if (!confirm("Anda yakin ingin menghapus user yang dipilih?")) return;
    const toastId = toast.loading("Loading...");
    const result = await bulkDeleteUsers(selectedRows);
    if (!result.error) {
      toast.success(result.message, { id: toastId });
      router.refresh();
    } else toast.error(result.message, { id: toastId });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let miniSearch = new MiniSearch({
    fields: ["name", "email", "role"],
    searchOptions: {
      fuzzy: 0.2,
    },
  });
  miniSearch.addAll(data);

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (value.trim().length !== 0) {
        setUsersData(
          miniSearch
            .search(value)
            .map((result) =>
              data.find((user) => result?.id == user.id),
            ) as userLastLoginPayload[],
        );
      } else {
        setUsersData(data);
      }
    },
    [data, miniSearch],
  );

  useEffect(() => {
    setLoader(false);
  }, []);

  if (loader) return <div>Loading</div>;

  return (
    <>
      <div className="flex justify-between items-center mb-[36px] flex-col gap-4 text-center xl:text-start xl:flex-row ">
        <div>
          <H5>User Management</H5>
        </div>
        <div className="flex gap-2">
          <AddBulk />
          <AddUser />
        </div>
      </div>
      {modal && <Modal data={userData} setIsOpenModal={setModal} />}
      <div className="w-full px-4 py-2 bg-white flex justify-between">
        <TextField
          type="text"
          placeholder="search user"
          handleChange={handleSearch}
        />
        {selectedRows.length > 0 && (
          <div className="flex items-center">
            <Small_Text variant="REGULAR" className="items-center">
              {selectedRows.length} users selected
            </Small_Text>
          </div>
        )}
        <div className="flex gap-2 items-center transition-all">
          <button
            title="Delete"
            onClick={deleteUsers}
            className={clsx(
              "p-2 bg-red-500 text-xs text-white rounded-lg hover:scale-110 hover:-translate-y-0.5 hover:shadow-md active:scale-105 duration-150",
              selectedRows.length > 0 ? "opacity-100" : "opacity-0",
            )}
          >
            Delete
          </button>
          <button
            title="Select all SISWA"
            onClick={() => setRoleSelected("SISWA")}
            className="p-2 bg-gray-500 text-xs text-white rounded-lg hover:scale-110 hover:-translate-y-0.5 hover:shadow-md active:scale-105 duration-150"
          >
            Select Siswa
          </button>
          <button
            title="Select all GURU"
            onClick={() => setRoleSelected("GURU")}
            className="p-2 bg-gray-500 text-xs text-white rounded-lg hover:scale-110 hover:-translate-y-0.5 hover:shadow-md active:scale-105 duration-150"
          >
            Select Guru
          </button>
          <button
            title="Select all MPK"
            onClick={() => setRoleSelected("MPK")}
            className="p-2 bg-gray-500 text-xs text-white rounded-lg hover:scale-110 hover:-translate-y-0.5 hover:shadow-md active:scale-105 duration-150"
          >
            Select MPK
          </button>
          <button
            title="Select all OSIS"
            onClick={() => setRoleSelected("OSIS")}
            className="p-2 bg-gray-500 text-xs text-white rounded-lg hover:scale-110 hover:-translate-y-0.5 hover:shadow-md active:scale-105 duration-150"
          >
            Select OSIS
          </button>
          <button
            title="Select all ADMIN"
            onClick={() => setRoleSelected("ADMIN")}
            className="p-2 bg-gray-500 text-xs text-white rounded-lg hover:scale-110 hover:-translate-y-0.5 hover:shadow-md active:scale-105 duration-150"
          >
            Select Admin
          </button>
          <button
            title="Select all"
            onClick={() => setRoleSelected("ALL")}
            className="p-2 bg-gray-500 text-xs text-white rounded-lg hover:scale-110 hover:-translate-y-0.5 hover:shadow-md active:scale-105 duration-150"
          >
            Select All
          </button>
          <button
            title="Clear"
            onClick={() => {
              setToggleCleared(!toggleCleared);
              setRoleSelected(null);
              setSelectedRows([]);
            }}
            className="p-2 bg-gray-500 text-xs text-white rounded-lg hover:scale-110 hover:-translate-y-0.5 hover:shadow-md active:scale-105 duration-150"
          >
            Clear
          </button>
        </div>
      </div>
      <DataTable
        selectableRows
        onSelectedRowsChange={handleRowSelected}
        columns={columns}
        data={usersData}
        selectableRowSelected={selectableRowSelected}
        clearSelectedRows={toggleCleared}
        pagination
        highlightOnHover
      />
    </>
  );
}
