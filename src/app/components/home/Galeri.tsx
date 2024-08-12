"use client";
import React from "react";
import SectionsGap from "../general/SectionsGap";
import "keen-slider/keen-slider.min.css";
import GaleriCarousel from "./home-components/Carousel";

export default function Galeri() {
  return (
    <>
      <main className="bg-white w-full h-full" id="galeri">
        <SectionsGap>
          <div className="py-[72px] 2xl:py-[92px] 2xl:mx-[88px] mx-[22px]">
            <div className="text-center">
              <h1 className="font-bold mb-[28px] text-[40px] 2xl:text-[48px]">
                Galeri
              </h1>
              <p className="text-secondary-text-color text-[14px] 2xl:text-[18px] mb-[42px] 2xl:mb-[52px] ">
                Lihat para Mokleters sedang menggunakan hak suaranya untuk
                memilih siapa yang akan menjadi Ketua OSIS SMK Telkom
                berikutnya!
              </p>
            </div>

            {/* Slides */}
            <div>
              <GaleriCarousel />
            </div>
          </div>
        </SectionsGap>
      </main>
    </>
  );
}
