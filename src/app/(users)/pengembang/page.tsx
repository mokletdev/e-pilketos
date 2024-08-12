import SectionsGap from "@/app/components/general/SectionsGap";
import { H1, H4, Large_Text } from "@/app/components/general/Text";
import Image from "next/image";
import React from "react";
import { Contributor } from "./data";

export default function Pengembang() {
  return (
    <>
      <section className="w-full h-full min-h-screen">
        <SectionsGap>
          <div className="mt-20">
            <H1 className="text-center">Tim Kami</H1>
            <Large_Text variant="REGULAR" className="text-center">
              beberapa siswa yang ikut berkontribusi atau mengembangkan website
              Pilketos 2024{" "}
            </Large_Text>
            <div className="my-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {Contributor.map((student, index) => (
                <div
                  key={index}
                  className="w-full h-auto p-10 bg-white rounded-[16px] shadow-shadow-2"
                >
                  <Image
                    src={student.ImgUrl}
                    alt={student.name}
                    className="mx-auto w-[168px] h-[212px]"
                  />
                  <H4 className="text-center mt-6">{student.name}</H4>
                  <p className="text-[24px] font-normal text-secondary-text-color text-center">
                    {student.job} - {student.gen} Gen.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionsGap>
      </section>
    </>
  );
}
