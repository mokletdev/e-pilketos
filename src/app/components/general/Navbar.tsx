import React from "react";
import SectionsGap from "./SectionsGap";

interface NavbarProops {
  title: string;
  href: string;
}

export default function Navbar() {
  return (
    <>
      <main className="bg-white w-full h-full">
        <SectionsGap>
          <nav>{/* place content here */}</nav>
        </SectionsGap>
      </main>
    </>
  );
}
