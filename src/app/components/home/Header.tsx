import React from "react";
import SectionsGap from "../general/SectionsGap";
import Image from "next/image";
import HeaderSect from "@/../public/images/headersection.png";
import { H1, Large_Text } from "../general/Text";
import { FormButton } from "../general/Button";

export default function Header() {
  return (
    <>
      <main className="bg-red-light-6 w-full h-auto flex ">
        <SectionsGap>
          <div className="flex flex-row-reverse items-center mx-auto gap-[50px]">
            <div>
              <Image src={HeaderSect} alt="HeaderSection" />
            </div>
            <div className="max-w-[600px] flex-col flex gap-[28px]">
              <H1>Pemilihan Ketua Osis SMK Telkom Malang 2024</H1>
              <Large_Text
                variant="REGULAR"
                className="text-secondary-text-color"
              >
                Pemilihan ini sangat berdampak besar untuk masa depan SMK Telkom
                Malang. Ayo gunakan hak suara kalian!
              </Large_Text>
              <FormButton variant="PRIMARY" className="max-w-[210px]">
                Yuk Vote Sekarang !
              </FormButton>
            </div>
          </div>
        </SectionsGap>
      </main>
    </>
  );
}
