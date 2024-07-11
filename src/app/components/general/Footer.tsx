import React from "react";
import SectionsGap from "./SectionsGap";

interface FooterProops {
  title: string;
  href: string;
  logo?: string;
}

export default function Footer() {
  return (
    <>
      <main className="bg-white w-full h-full">
        <SectionsGap>
          <footer>{/* place content here */}</footer>
        </SectionsGap>
      </main>
    </>
  );
}
