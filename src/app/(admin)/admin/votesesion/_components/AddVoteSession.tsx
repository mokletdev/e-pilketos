// src/app/(admin)/admin/votesesion/_components/AddVoteSession.tsx
"use client";

import { useState } from "react";
import VoteSessionModal from "./Modal";
import { FormButton } from "@/app/components/general/Button";
import PlusIcon from "@/app/components/Icons/PlusIcon";
import { Candidates } from "@prisma/client";

export default function AddVoteSession({
  candidates,
}: {
  candidates: Candidates[];
}) {
  const [showModalCreate, setShowModalCreate] = useState(false);

  return (
    <>
      {showModalCreate && (
        <VoteSessionModal
          setIsOpenModal={setShowModalCreate}
          candidats={candidates}
        />
      )}
      <FormButton variant="PRIMARY" onClick={() => setShowModalCreate(true)}>
        <div className="flex items-center gap-x-3">
          <PlusIcon />
          Add Vote Session
        </div>
      </FormButton>
    </>
  );
}
