import React from "react";
import ProgessCard from "./ProgessCard";

export default function InformationCard({
  studentVote,
  teacherVote,
}: {
  studentVote: number;
  teacherVote: number;
}) {
  return (
    <div>
      <div className="w-full bg-red-light-6 gap-x-[28px] flex flex-col xl:flex-row">
        <ProgessCard target="Siswa" percent={studentVote}>
          Total Siswa yang sudah vote.
        </ProgessCard>
        <ProgessCard target="Guru" percent={teacherVote}>
          Total Guru yang sudah vote.
        </ProgessCard>
      </div>
    </div>
  );
}
