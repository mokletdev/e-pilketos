import React from "react";

import ImageProfile from "./ImageProfile";
import FotoKandidat from "@/../public/images/FotoKandidat.png";
import Progressbar from "./Progressbar";
import { H3, H4, H5, Large_Text } from "@/app/components/general/Text";

export default function CandidateCard() {
  return (
    <main className="flex flex-col gap-7">
      <div className="p-14 bg-white rounded-xl shadow-shadow-2">
        <div className="justify-between flex items-center">
          <ImageProfile src={FotoKandidat} />
          <div className="flex flex-col max-w-[800px] w-full mx-4 gap-8">
            <div className="grid grid-cols-3 justify-center gap-x-2">
              <div className="flex flex-col gap-30 justify-between">
                <div>
                  <H4>Calon 1</H4>
                  <H5>XI RPL 8</H5>
                </div>
                <H3 className="text-primary-color">40%</H3>
              </div>
              <div className="h-full flex items-center justify-center">
                <H3 className="text-primary-color text-center my-auto">VS</H3>
              </div>
              <div className="flex flex-col gap-30 text-right justify-between">
                <div>
                  <H4>Joe</H4>
                  <H5>XI RPL 8</H5>
                </div>
                <H3 className="text-primary-color">60%</H3>
              </div>
            </div>
            <div className="">
              <Progressbar progress={25} />
            </div>
          </div>
          <ImageProfile src={FotoKandidat} />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-shadow-2 justify-between flex items-center px-12 py-7">
        <div className="flex items-center gap-4">
          <div className="rounded-full size-4 bg-red-light"></div>
          <Large_Text variant="REGULAR">Kandidat 1</Large_Text>
        </div>
        <div className="flex flex-row-reverse  items-center gap-4">
          <div className="rounded-full size-4 bg-secondary-color"></div>
          <Large_Text variant="REGULAR">Kandidat 2</Large_Text>
        </div>
      </div>
    </main>
  );
}
