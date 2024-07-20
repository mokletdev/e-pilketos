"use client";
// ! DO NOT EDIT THIS CODE
import SectionsGap from "@/app/components/general/SectionsGap";
import Image from "next/image";
import React, { useState } from "react";
import fotoKandidat from "@/../public/images/FotoKandidat.png";
import { H1, H5, Large_Text } from "@/app/components/general/Text";
import { FormButton } from "@/app/components/general/Button";
import { VoteModal } from "@/app/components/general/Modal";

export default function Vote() {
  const [modal, setModal] = useState(null);
  const [selected, setIsSelected] = useState(null);
  // TODO : Vote Page 5 Kandidat

  const selectedCandidates = (candidates: React.SetStateAction<any>) => {
    // setModal(false);
    setIsSelected((prev) => (prev === candidates ? null : candidates));
  };

  const openDetailModal = (candidates: any) => {
    setModal((prev) => (prev === candidates ? null : candidates));
  };

  const candidates = [
    {
      id: 1,
      no: "01",
      name: "Naufal Nabil Ramadhan",
      class: "XI RPL 10",
    },
    {
      id: 2,
      no: "02",
      name: "Fahrell Sandy Zhariif W",
      class: "XI RPL 11",
    },
  ];

  return (
    <>
      <SectionsGap>
        <section className="max-w-fit w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mt-20 mb-20">
          {candidates.map((candidate, i) => (
            <div key={i} id="modal" className="max-w-full bg-white rounded-2xl">
              {selected === candidate.id && (
                <div className="px-8 pt-8">ini nanti alert (Terpilih)</div>
              )}
              <div className="p-8 max-w-full flex gap-x-[28px] w-fit h-[274px]">
                <Image src={fotoKandidat} alt="Foto Kandidat" className="" />
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
                    {selected === candidate.id ? (
                      <FormButton
                        onClick={() => selectedCandidates(candidate.id)}
                        variant="SECONDARY"
                        className="w-full"
                      >
                        <Large_Text variant="BOLD">Batalkan Pilihan</Large_Text>
                      </FormButton>
                    ) : (
                      <FormButton
                        onClick={() => selectedCandidates(candidate.id)}
                        variant="PRIMARY"
                        className="w-full"
                      >
                        <Large_Text variant="BOLD">Pilih Kandidat</Large_Text>
                      </FormButton>
                    )}
                    <FormButton
                      onClick={() => openDetailModal(candidate.id)}
                      variant="BLACK"
                      className="w-full"
                    >
                      <Large_Text variant="BOLD">Lihat Detail</Large_Text>
                    </FormButton>
                  </div>
                </div>
              </div>
              <div className="w-full">
                {modal === candidate.id && (
                  <>
                    <VoteModal onClose={() => setModal(null)} />
                  </>
                )}
              </div>
            </div>
          ))}
        </section>
      </SectionsGap>
    </>
  );
}
