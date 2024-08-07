"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { FormButton } from "@/app/components/general/Button";
import PlusIcon from "@/app/components/Icons/PlusIcon";
import { Medium_Text } from "@/app/components/general/Text";

export default function AddCandidates() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <Modal setIsOpenModal={setShowModal} />}
      <FormButton
        variant="PRIMARY"
        className="flex gap-x-3 items-center"
        onClick={() => setShowModal(true)}
      >
        <PlusIcon />
        <Medium_Text variant="BOLD">Tambah Kandidat</Medium_Text>
      </FormButton>
    </>
  );
}
