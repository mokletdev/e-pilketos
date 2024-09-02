"use client";
import React from "react";
import SectionsGap from "../general/SectionsGap";
import Image from "next/image";
import { H1, Large_Text } from "../general/Text";
import { FormButton } from "../general/Button";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <main className="bg-red-light-6 w-full flex">
      <SectionsGap>
        <div className="flex xl:flex-row flex-col-reverse items-center overflow-hidden xl:max-h-[800px] gap-[40px] py-32">
          <div className="max-w-[648px] xl:items-start items-center flex-col flex gap-[28px] text-center xl:text-start">
            <h1 className="text-[48px] md:text-[60px] font-bold leading-[58px] md:leading-[72px]">
              Pemilihan Ketua OSIS SMK Telkom Malang 2024
            </h1>
            <Large_Text
              variant="REGULAR"
              className="text-secondary-text-color max-w-[490px] text-center xl:text-left"
            >
              Pemilihan ini sangat berdampak besar untuk masa depan SMK Telkom
              Malang. Ayo gunakan hak suara kalian!
            </Large_Text>
            <div className="flex justify-center 2xl:justify-normal">
              <FormButton
                onClick={() => router.push("/vote")}
                variant="PRIMARY"
                className="max-w-[210px]"
              >
                Yuk Vote Sekarang !
              </FormButton>
            </div>
          </div>
          <div className="w-full gap-2 relative xl:flex hidden">
            <div className="flex flex-col gap-5">
              <div className="w-[260px] h-[330px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/dokum/DSC02226.webp"
                  alt="img"
                  width={200}
                  height={300}
                  className="w-auto object-cover"
                ></Image>
              </div>
              <div className="w-[260px] h-[330px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/dokum/DSC02279.webp"
                  alt="img"
                  width={200}
                  height={300}
                  className="h-full w-auto object-cover"
                ></Image>
              </div>
              <div className="w-[260px] h-[330px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/dokum/IMG_3259.webp"
                  alt="img"
                  width={200}
                  height={300}
                  className="w-auto h-full object-cover"
                ></Image>
              </div>
            </div>
            <div className="flex flex-col gap-5 absolute right-12 top-[12rem]">
              <div className="w-[260px] h-[330px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/dokum/IMG_3189.webp"
                  alt="img"
                  width={200}
                  height={300}
                  className="w-auto h-full object-cover"
                ></Image>
              </div>
              <div className="w-[260px] h-[330px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/dokum/DSC02311.webp"
                  alt="img"
                  width={200}
                  height={300}
                  className="w-auto h-full object-cover"
                ></Image>
              </div>
            </div>
          </div>
        </div>
      </SectionsGap>
    </main>
  );
}
