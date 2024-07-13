import React from "react";
import SectionsGap from "../general/SectionsGap";

export default function Galeri() {
  return (
    <>
      <main className="bg-white w-full h-full py-[92px]" id="galeri">
        <SectionsGap>
          <div className="mx-auto text-center">
            <h1 className="text-[48px] font-bold text-primary-text-color mb-[28px]">
              Galeri
            </h1>
            <p className="text-secondary-text-color mb-[52px]">
              Lihat para Mokleters sedang menggunakan hak suaranya untuk memilih
              siapa yang akan menjadi Ketua OSIS SMK Telkom berikutnya!
            </p>
          </div>
        </SectionsGap>
      </main>
    </>
  );
}
