import React, { ReactNode } from "react";

interface GapProps {
  children: ReactNode;
}

export default function SectionsGap({ children }: GapProps) {
  return (
    <main className="mx-auto max-w-[94%] lg:max-w-[87.5%] xl:max-w-[1502px]">
      {children}
    </main>
  );
}
