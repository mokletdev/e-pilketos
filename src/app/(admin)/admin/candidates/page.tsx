import React from "react";
import fotoKandidat from "@/../public/images/FotoKandidat.png";
import PlusIcon from "@/app/components/Icons/PlusIcon";
import EmptyCandidates from "../_components/EmptyCandidates";
import Modal from "./_components/Modal";
import AddCandidates from "./_components/AddCandidates";
import CandidatesTable from "./_components/Table";
import { nextGetServerSession } from "@/lib/AuthOptions";
import { CandidatesPayload } from "@/utils/database/user.query";
import { getAllCandidates } from "@/utils/database/candidates.query";

export default async function Candidates() {
  const session = await nextGetServerSession();
  const { user } = session!;

  const candidate: CandidatesPayload[] = await getAllCandidates();

  return (
    <div className="max-w-full min-h-screen">
      <CandidatesTable data={candidate} />
    </div>
  );
}
