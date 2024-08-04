import React from "react";
import Image from "next/image";
import Denied from "@/../public/images/DeniedIcon.png";
import { H1, Large_Text } from "@/app/components/general/Text";

export default function AccessDenied() {
  return (
    <>
      <div className="bg-red-light-6 w-full h-full">
        <div className="flex items-center justify-center pt-[280px] pb-[173px]">
          <div className="bg-white w-[1050px] h-[492px] rounded-[15px] flex items-center text-center shadow-md">
            <div className="place-items-center absolute -top-4 left-1/2 -translate-x-1/2 pt-[120px]">
              <Image
                src={Denied}
                alt="gambar not found"
                className="w-[328px] h-[314px] "
              />
            </div>
            <div className="w-full">
              <H1>Maaf Ya.. Akses Ditolak</H1>
              <Large_Text
                variant="REGULAR"
                className="text-secondary-text-color mt-[18px]"
              >
                Anda sebagai user tidak memiliki akses membuka ke halaman
                tersebut
              </Large_Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
