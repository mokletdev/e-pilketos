import React from "react";
import { H1, H5 } from "@/app/components/general/Text";
import SectionsGap from "@/app/components/general/SectionsGap";

export default function Confirmation() {
  return (
    <>
      <main className="bg-red-light-6 w-full h-full min-h-screen pt-16 lg:pt-0">
        <SectionsGap>
          <div className="mx-[22px] lg:mx-[44px] 2xl:mx-[88px]">
            <div className="flex justify-center items-center">
              <div className="w-[436px] h-auto lg:w-[804px]  2xl:w-[892px] mt-[42px] lg:mt-40 mb-[72px] lg:mb-0 2xl:h-[378px] bg-white rounded-2xl shadow-lg">
                <div className="p-[22px] lg:p-[44px] 2xl:p-[88px]">
                  <H1 className="text-primary-color font-bold text-center mb-[18px] 2xl:mb-[28px]">
                    Terima Kasih Telah Melakukan Voting
                  </H1>
                </div>
              </div>
            </div>
          </div>
        </SectionsGap>
      </main>
    </>
  );
}
