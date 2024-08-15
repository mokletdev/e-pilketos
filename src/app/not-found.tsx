import React from "react";
import { H1, Large_Text } from "@/app/components/general/Text";
import Image from "next/image";
import NotFoundImage from "@/../public/images/NotFoundIcon.png";
import { Metadata } from "next";
import { NextPage } from "next";

export const metadata: Metadata = {
  title: "404",
};

const NotFound: NextPage = () => {
  return (
    <>
      <div className="bg-red-light-6 w-full h-full max-h-screen">
        <div className="flex items-center justify-center pt-[280px] pb-[173px]">
          <div className="bg-white w-[1050px] h-[492px] rounded-[15px] text-center flex items-center shadow-md">
            <div className="place-items-center absolute -top-4 left-1/2 -translate-x-1/2 pt-[120px]">
              <Image
                src={NotFoundImage}
                alt="gambar not found"
                className="w-[410px] h-[314px]"
              />
            </div>
            <div>
              <H1>Oops.. Halaman Yang Kamu Kunjungi Tidak Ada</H1>
              <Large_Text
                variant="REGULAR"
                className="text-secondary-text-color mt-[18px]"
              >
                Halaman yang kamu cari tidak ditemukan atau sudah dihapus
              </Large_Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
