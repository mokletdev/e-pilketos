import React, { ReactNode } from "react";

interface GapProps {
  children: ReactNode;
}

export default function SectionsGap({ children }: GapProps) {
  return (
    <main className="mx-auto w-full px-[22px] md:px-[40px] xl:max-w-[1352px]">
      {children}
    </main>
  );
}
