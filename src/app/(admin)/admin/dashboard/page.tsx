import React from "react";
import Progress from "@/app/components/general/Progress";

export default function dashboard() {
  return (
    <main className="h-full overflow-x-hidden">
      <Progress percent={25} />
    </main>
  );
}
