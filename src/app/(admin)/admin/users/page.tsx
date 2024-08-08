import React from "react";
import UserTable from "./_components/Table";
import { nextGetServerSession } from "@/lib/AuthOptions";
import { getAllUser, userLastLoginPayload } from "@/utils/database/user.query";
import { User } from "@prisma/client";

export default async function Candidates() {
  const session = await nextGetServerSession();
  const { user } = session!;

  const users: userLastLoginPayload[] = await getAllUser();

  return (
    <div className="max-w-full min-h-screen">
      <UserTable data={users} />
    </div>
  );
}
