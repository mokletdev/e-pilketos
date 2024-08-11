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
        <ProgessCard target="Siswa" percent={50}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </ProgessCard>
        <ProgessCard target="Guru" percent={90}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </ProgessCard>
      </div>
      <div className="mt-[28px] pb-[52px]">
        <ProgessCard target="Semua" percent={20}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
