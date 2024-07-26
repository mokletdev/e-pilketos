"use client";
import { FormButton } from "@/app/components/general/Button";
import SectionsGap from "@/app/components/general/SectionsGap";
import { H2, Large_Text } from "@/app/components/general/Text";
import GoogleLogo from "@/app/components/Icons/GoogleLogo";
import { signIn } from "next-auth/react";
import React from "react";
import imgLeft from "@/../public/images/LoginUserLeft.png";
import imgRight from "@/../public/images/LoginUserRight.png";
import Image from "next/image";
import HeaderSect from "@/../public/images/headersection.png";

export default function UserLogin() {
  return (
    <>
      <main className="px-4 lg:px-20">
        <Image
          src={imgLeft}
          alt="Image Carousel"
          className="h-full w-auto md:absolute top-0 left-0 hidden md:block"
        />
        <Image
          src={HeaderSect}
          alt="HeaderSection"
          className="-mt-72 md:hidden lg:-mt-0 mx-auto"
        />
        <div className="w-full h-full my-14 lg:my-28 z-20 relative">
          <div className="bg-white max-w-[624px] w-full py-[72px] md:py-[92px] px-[24px] md:px-[88px] flex-col items-center mx-auto shadow-shadow-2 rounded-xl">
            <H2 className="text-center text-primary-text-color">
              Yuk Login untuk Memulai Vote
            </H2>
            <Large_Text
              variant="REGULAR"
              className="text-secondary-text-color text-center mt-2 mb-8"
            >
              Jangan lupa login menggunakan akun google yang diberikan oleh
              sekolah ya teman-teman..
            </Large_Text>
            <FormButton
              variant="PRIMARY"
              onClick={() =>
                signIn("google", { callbackUrl: "/vote", redirect: false })
              }
              className="flex items-center gap-x-4 w-full justify-center group"
            >
              <GoogleLogo />
              <Large_Text variant="BOLD">Login dengan Google</Large_Text>
            </FormButton>
          </div>
        </div>
        <Image
          src={imgRight}
          alt="Image Carousel"
          className="h-full w-auto md:absolute top-0 right-0  hidden md:block"
        />
      </main>
    </>
  );
}
