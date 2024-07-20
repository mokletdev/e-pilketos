import React from "react";
import Image from "next/image";
import fotoKanan from "@/../public/images/LoginUserLeft.png";
import fotoKiri from "@/../public/images/LoginUserRight.png";
import fotoKecil from "@/../public/images/ImageAfteeVoteImage.png";

export default function Confirmation() {
  return (
    <>
      <main className="bg-red-light-6 w-full h-full">
        <div className="mx-[22px] lg:mx-[44px] 2xl:mx-[88px] lg:flex lg:justify-between">
          <Image src={fotoKiri} alt="gambar kiri" className="hidden lg:block" />
          <Image
            src={fotoKecil}
            alt="gambar kecil"
            className="lg:hidden block"
          />
          <div className="flex justify-center items-center">
            <div className="w-[436px] h-[346px] lg:w-[804px] lg:h-[290px] 2xl:w-[892px] mt-[42px] lg:mt-0 mb-[72px] lg:mb-0 2xl:h-[378px] bg-white rounded-2xl shadow-lg lg:absolute">
              <div className="p-[22px] lg:p-[44px] 2xl:p-[88px]">
                <h1 className="text-primary-color font-bold text-[40px] lg:text-[60px] text-center mb-[18px] 2xl:mb-[28px]">
                  Terima Kasih Telah Melakukan Voting
                </h1>
                <h5 className="text-center text-secondary-text-color font-semibold text-[18px] 2xl:text-[24px]">
                  Setelah selesai melakukan voting, akan dilakukan auto log out
                </h5>
              </div>
            </div>
          </div>
          <Image
            src={fotoKanan}
            alt="gambar kanan"
            className="lg:block hidden"
          />
        </div>
      </main>
    </>
  );
}
