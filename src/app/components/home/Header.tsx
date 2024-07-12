import React from "react";
import SectionsGap from "../general/SectionsGap";
import Image from "next/image";
import HeaderSect from "@/../public/images/headersection.png";

export default function Header() {
  return (
    <>
      <main className="bg-red-light-6 w-full h-auto flex ">
        <SectionsGap>
          <div className="flex flex-row-reverse items-center mx-auto">
            <div>
              <Image src={HeaderSect} alt="HeaderSection" />
            </div>
            <div>halo1</div>
          </div>
        </SectionsGap>
      </main>
    </>
  );
}
