import React from "react";
import Progress from "@/app/components/general/Progress";
import { H3, H4, Medium_Text } from "@/app/components/general/Text";
import ProgessCard from "./_components/ProgessCard";

import { getAllUser, userLastLoginPayload } from "@/utils/database/user.query";
import UserTable from "./_components/Table";
import { nextGetServerSession } from "@/lib/AuthOptions";
import { Role } from "@prisma/client";

export default async function Dashboard() {
  const session = await nextGetServerSession();
  const { user } = session!;
  const AllDataUserVote = [900, 300];
  const AllUser = AllDataUserVote.reduce((acc, cur) => acc + cur);
  const VoteUser = [0, 0];
  const AllVote = VoteUser.reduce((acc, cur) => acc + cur);
  const percentGuru = Math.floor((VoteUser[0] / AllDataUserVote[0]) * 100);
  const percentSiswa = Math.floor((VoteUser[1] / AllDataUserVote[1]) * 100);
  const percentAll = Math.floor((AllVote / AllUser) * 100);

  const admin: userLastLoginPayload[] = await getAllUser({
    AND: [
      { NOT: { role: "SISWA" } },
      {
        role:
          (user?.role as Role) === "ADMIN" ? undefined : (user?.role as Role),
      },
    ],
  });

  return (
    <main className="h-full overflow-x-hidden">
      <div className="w-full bg-red-light-6 gap-x-[28px] flex flex-col xl:flex-row">
        <ProgessCard target="Siswa" percent={percentSiswa}>
          Persentase Siswa yang sudah vote.
        </ProgessCard>
        <ProgessCard target="Guru" percent={percentGuru}>
          Persentase Guru yang sudah vote.
        </ProgessCard>
      </div>
      <div className="mt-[28px] pb-[52px]">
        <ProgessCard target="Semua" percent={percentAll}>
          Persentase Siswa dan Guru yang sudah vote.
        </ProgessCard>
      </div>
      <UserTable
        roles="Admin"
        desc="Bertugas Untuk Mengontrol dan Mengawasi Sepenuhnya atas Sistem yang sudah di buat"
        data={admin}
      />
      <div className="my-10"></div>
    </main>
  );
}
