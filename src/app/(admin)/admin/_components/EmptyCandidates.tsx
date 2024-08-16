import React from "react";
import { H1, Large_Text } from "@/app/components/general/Text";
import Image from "next/image";
import TandaTanya from "@public/images/TandaTanyaIcon.png";

export default function EmptyCandidates() {
  return (
    <div className="bg-red-light-6 w-full h-full max-h-screen">
      <div className="flex items-center justify-center pt-[200px] pb-[173px]">
        <div className="bg-white w-[1050px] h-[492px] rounded-[15px] flex items-center text-center shadow-md">
          <div className="place-items-center absolute top-11 left-1/2  pt-[50px]">
            <Image
              src={TandaTanya}
              alt="gambar not found"
              className="w-[328px] h-[314px] "
            />
          </div>
          <div className="w-full mx-[85px]">
            <H1>Oops.. Disini Masih Belum Ada Kandidat</H1>
            <Large_Text
              variant="REGULAR"
              className="text-secondary-text-color mt-[18px]"
            >
              Klik Tambah Kandidat untuk menambahkan kandidat baru..
            </Large_Text>
          </div>
        </div>
      </div>
    </div>
  );
}
