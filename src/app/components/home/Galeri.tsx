"use client";
import React, { useState } from "react";
import SectionsGap from "../general/SectionsGap";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider, TrackDetails } from "keen-slider/react";

import gambar1 from "/public/gambar1.jpg";
import gambar2 from "/public/gambar2.jpg";
import gambar3 from "/public/gambar3.jpg";
import gambar4 from "/public/gambar4.jpg";
import gambar5 from "/public/gambar5.jpg";
import gambar6 from "/public/gambar6.jpg";

export default function Galeri() {
  return (
    <>
      <main className="bg-white w-full h-full py-[92px]" id="galeri">
        <SectionsGap>
          <div className="py-[72px] 2xl:py-[92px] mx-[22px]">
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

            <div></div>
          </div>
        </SectionsGap>
      </main>
    </>
  );
}
