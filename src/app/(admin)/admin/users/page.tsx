import React from "react";
import UserTable from "./_components/Table";
import { getAllUser, userLastLoginPayload } from "@/utils/database/user.query";

export default async function Candidates() {
  const users: userLastLoginPayload[] = await getAllUser();

  return (
    <div className="max-w-full min-h-screen pt-12">
      <UserTable data={users} />
    </div>
  );
}
