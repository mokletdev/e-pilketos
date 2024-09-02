import React from "react";
import SectionsGap from "../general/SectionsGap";
import { LinkButton } from "../general/Button";

export default function Video() {
  return (
    <main
      className="bg-red-light-6 w-full h-full py-[72px] 2xl:py-[92px]"
      id="video"
    >
      <SectionsGap>
        <div className="flex 2xl:justify-between 2xl:flex-row flex-col items-center gap-x-[172px] gap-y-16 h-full mx-[22px]">
          <div className="xl:max-w-[400px] grid-rows-3 2xl:text-start text-center">
            <div className="mb-[28px]">
              <h1 className="text-[40px] 2xl:text-[48px] font-bold text-primary-text-color">
                Selain Foto Ada Juga Videonya
              </h1>
            </div>
            <div className="mb-[40px]">
              <p className="text-[14px] 2xl:text-[18px] text-secondary-text-color">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis placeat autem ab quasi vero, provident tempore ipsum,
                magnam officiis modi harum consectetur. Rem, vitae quos.
              </p>
            </div>
            <div>
              <LinkButton
                variant="PRIMARY"
                href="#"
                target="_blank"
                className="w-[200px] font-medium"
              >
                Lihat Lebih Lanjut
              </LinkButton>
            </div>
          </div>
          <div className="shadow-b-to-t">
            <iframe
              src="https://www.youtube.com/embed/9xofia597HI?si=wGP5Kb0411AMpg2n"
              title="YouTube video player"
              className="rounded-[15px] lg:w-[692px] lg:h-[375px] w-[346px] h-[187px] duration-500 ease-in-out"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </SectionsGap>
    </main>
  );
}
