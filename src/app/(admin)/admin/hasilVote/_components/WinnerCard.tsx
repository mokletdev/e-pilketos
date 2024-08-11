import React from "react";
// import Progress from "@/app/components/general/Progress";
import { H2, H4, Large_Text } from "@/app/components/general/Text";
import Image from "next/image";

interface ProgessCardProps {
  children?: React.ReactNode;
  pemenang: string;
  image: any;
  nomor?: number;
  kelas?: string;
}

export default function WinnerCard({
  pemenang,
  children,
  image,
  nomor,
  kelas,
}: ProgessCardProps) {
  return (
    <div className="w-full h-auto bg-white rounded-[10px] shadow-md mt-[28px]">
      <div className="flex flex-col xl:flex-row p-7 gap-8 xl:gap-0 justify-center items-center ">
        <div className="flex flex-col md:flex-col lg:flex-row xl:flex-col justify-between gap-9 items-center">
          <Image src={image} alt="Pemenang!" />
          <div className="flex justify-between gap-8">
            <H2 className="text-primary-color">0{nomor}</H2>
            <div className="">
              <H4 className="">{pemenang}</H4>
              <Large_Text variant="BOLD">{kelas}</Large_Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
