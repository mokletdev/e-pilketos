import React from "react";
import Progress from "@/app/components/general/Progress";
import { H3, H4, Medium_Text } from "@/app/components/general/Text";

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
      <div className="w-full bg-red-light-6 gap-x-[28px] grid grid-cols-2 grid-rows-1">
        <div className="w-full h-[219px] bg-white rounded-[10px] shadow-md mt-[28px]">
          <div className="flex py-[28px] px-[64px] justify-between">
            <div className="grid grid-row">
              <H3>Total Vote</H3>
              <H4 className="">Siswa</H4>
              <Medium_Text
                variant="REGULAR"
                className="text-secondary-text-color"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Medium_Text>
            </div>
            <Progress percent={80} />
          </div>
        </div>
        <div className="w-full h-[219px] bg-white rounded-[10px] shadow-md mt-[28px]">
          <div className="flex py-[28px] px-[64px] justify-between">
            <div className="grid grid-row">
              <H3>Total Vote</H3>
              <H4 className="">Guru</H4>
              <Medium_Text
                variant="REGULAR"
                className="text-secondary-text-color"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Medium_Text>
            </div>
            <Progress percent={80} />
          </div>
        </div>
      </div>
      <div className="mt-[28px] pb-[52px]">
        <div className="w-full h-[219px] bg-white rounded-[10px] shadow-md mt-[28px]">
          <div className="flex py-[28px] px-[64px] justify-between">
            <div className="grid grid-row">
              <H3>Total Vote</H3>
              <H4 className="">Semua</H4>
              <Medium_Text
                variant="REGULAR"
                className="text-secondary-text-color"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Medium_Text>
            </div>
            <Progress percent={80} />
          </div>
        </div>
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
