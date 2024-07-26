"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { H4 } from "@/app/components/general/Text";

export default function AdminHeaders() {
  const { data: session } = useSession();
  return (
    <>
      <H4 className="text-black font-normal">
        Selamat Datang di Dashboard{" "}
        {session ? `${session.user?.name}!` : "Admin!"}
      </H4>
    </>
  );
}
