import React from "react";
import SectionsGap from "../general/SectionsGap";
import { LinkButton } from "../general/Button";

export default function Video() {
  return (
    <>
      <main className="bg-red-light-6 w-full h-full py-[92px]">
        <SectionsGap>
          <div className="flex justify-between items-center gap-x-[172px] h-[500px] mx-[88px]">
            <div className="max-w-[400px] grid-rows-3">
              <div className="mb-[28px]">
                <h1 className="text-[48px] font-bold text-primary-text-color">
                  Selain Foto Ada Juga Videonya
                </h1>
              </div>
              <div className="mb-[40px]">
                <p className="text-[18px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reiciendis placeat autem ab quasi vero, provident tempore
                  ipsum, magnam officiis modi harum consectetur. Rem, vitae
                  quos.
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

            <div>
              <iframe
                width="692"
                height="375"
                src="https://www.youtube.com/embed/9xofia597HI?si=wGP5Kb0411AMpg2n"
                title="YouTube video player"
                className="rounded-[15px]"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </SectionsGap>
      </main>
    </>
  );
}
