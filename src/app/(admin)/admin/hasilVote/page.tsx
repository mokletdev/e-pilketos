import React from "react";
import { Large_Text, H1 } from "@/app/components/general/Text";
import WinnerCard from "./_components/WinnerCard";
import ProgessCard from "./_components/ProgessCard";
import FotoKandidat from "@/../public/images/FotoKandidat.png";
// import ChartDougnuts from "./_components/ChartDougnuts";

export default function HasilVote() {
  return (
    <main className="min-h-screen flex">
      <div className="my-auto gap-24 mx-auto">
        <div className="mb-24">
          <H1 className="text-center">Pemenang Pilketos 2024 adalah ...</H1>
          {/*Ganti tahunnya :D*/}
          <Large_Text
            className="text-center text-secondary-text-color"
            variant="REGULAR"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </Large_Text>
        </div>
        <div>
          <div className="grid grid-cols-4 gap-7 justify-between">
            <div className="col-span-4 xl:col-span-2 ">
              <WinnerCard
                image={FotoKandidat}
                kelas="Apatuh"
                pemenang="Aziz"
                nomor={2}
              />
            </div>
            <div className="col-span-4 md:col-span-2 xl:col-span-1">
              <ProgessCard
                target="Siswa"
                percent={50}
                className="flex-col text-center"
              >
                Lorem ipsum dolor sit amet.
              </ProgessCard>
            </div>
            <div className="col-span-4 md:col-span-2 xl:col-span-1">
              <ProgessCard
                className="flex-col text-center"
                target="Siswa"
                percent={50}
              >
                Lorem ipsum dolor sit amet.
              </ProgessCard>
            </div>
          </div>
          <ProgessCard
            className="flex-col xl:flex-row"
            target="Siswa"
            percent={50}
          >
            Lorem ipsum dolor sit amet.
          </ProgessCard>
        </div>
      </div>
    </main>
  );
}
