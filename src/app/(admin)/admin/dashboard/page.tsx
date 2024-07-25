import React from "react";
import Progress from "@/app/components/general/Progress";

export default function dashboard() {
  return (
    <main className="bg-red-light-6 w-screen h-screen overflow-hidden">
      <Progress percent={25} />
    </main>
  );
}
