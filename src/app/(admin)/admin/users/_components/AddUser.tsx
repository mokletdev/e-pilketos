"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { FormButton } from "@/app/components/general/Button";
import PlusIcon from "@/app/components/Icons/PlusIcon";
import { Medium_Text } from "@/app/components/general/Text";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddUser() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && <Modal setIsOpenModal={setShowModal} />}
      <FormButton
        onClick={() => setShowModal(true)}
        variant="PRIMARY"
        className="flex gap-x-3 items-center"
      >
        <PlusIcon />
        <Medium_Text variant="BOLD">Tambah User</Medium_Text>
      </FormButton>
    </>
  );
}
export function ExportUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleExport = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Exporting users...");

    try {
      // Use router to navigate to API endpoint for download
      router.push("/api/export-user");

      toast.success("Export initiated successfully!", { id: toastId });
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export users", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormButton
        onClick={handleExport}
        variant="PRIMARY"
        className="flex gap-x-3 items-center"
        isDisabled={isLoading}
      >
        <PlusIcon />
        <Medium_Text variant="BOLD">
          {isLoading ? "Exporting..." : "Export User"}
        </Medium_Text>
      </FormButton>
    </>
  );
}
