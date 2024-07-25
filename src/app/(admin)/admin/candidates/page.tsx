"use client";
import { FormButton } from "@/app/components/general/Button";
import { H1, H5, Large_Text, Medium_Text } from "@/app/components/general/Text";
import Image from "next/image";
import React, { useState } from "react";
import fotoKandidat from "@/../public/images/FotoKandidat.png";
import PlusIcon from "@/app/components/Icons/PlusIcon";

export default function Candidates() {
  const [modal, setModal] = useState(false);
  const candidates: any = [
    // {
    //   id: 1,
    //   no: "01",
    //   name: "Naufal Nabil Ramadhan",
    //   class: "XI RPL 10",
    // },
    // {
    //   id: 2,
    //   no: "02",
    //   name: "Fahrell Sandy Zhariif W",
    //   class: "XI RPL 11",
    // },
    // {
    //   id: 3,
    //   no: "03",
    //   name: "Muhammad Zuhair Zuhdi",
    //   class: "XI RPL 20",
    // },
  ];
  return (
    <div className="max-w-full">
      <div className="flex w-full justify-end">
        <FormButton
          variant="PRIMARY"
          className="flex gap-x-3 items-center -mt-12"
        >
          <PlusIcon />
          <Medium_Text variant="BOLD">Tambah Kandidat</Medium_Text>
        </FormButton>
      </div>
      <section
        className={`max-w-full w-full grid grid-cols-1 xl:grid-cols-2 gap-6 mt-20 mb-20 `}
      >
        {candidates.map((candidate: any, i: any) => (
          <div key={i} className={`relative`}>
            <div id="modal" className="max-w-full bg-white rounded-2xl z-20">
              <div className="p-8 lg:flex gap-x-[28px] w-fit h-auto">
                <Image
                  src={fotoKandidat}
                  alt="Foto Kandidat"
                  className="mx-auto object-cover"
                />
                <div>
                  <div className="flex gap-x-3 mb-4">
                    <H1 className="text-primary-color">{candidate.no}</H1>
                    <div>
                      <H5 className="">{candidate.name}</H5>
                      <Large_Text variant="SEMIBOLD">
                        {candidate.class}
                      </Large_Text>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <FormButton variant="PRIMARY" className="w-full">
                      <Large_Text variant="BOLD">Edit Kandidat</Large_Text>
                    </FormButton>
                    <FormButton variant="BLACK" className="w-full">
                      <Large_Text variant="BOLD">Hapus Kandidat</Large_Text>
                    </FormButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
