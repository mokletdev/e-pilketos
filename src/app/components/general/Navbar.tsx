"use client";

import React, { useState } from "react";
import SectionsGap from "./SectionsGap";
import Link from "next/link";
import LogoMPK from "@/../public/images/logoMPK.png";
import { Large_Text } from "./Text";
import Image from "next/image";
import { FormButton } from "./Button";

interface NavbarProps {
  title: string;
  href: string;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sectionActive, setSectionActive] = useState("home");

  const handleScroll = () => {
    const sections: NodeListOf<HTMLElement> =
      document.querySelectorAll("section[id]");

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 50;

      if (
        window.scrollY > sectionTop &&
        window.scrollY <= sectionTop + sectionHeight
      ) {
        setSectionActive(section.getAttribute("id")!);
      }
    });

    if (window.scrollY > 300) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const link: NavbarProps[] = [
    { title: "Beranda", href: "/#" },
    { title: "Panduan", href: "/#panduan" },
    { title: "Prosedur", href: "/#prosedur" },
    { title: "Galeri", href: "/#galeri" },
    { title: "Video", href: "/#video" },
    { title: "Vote", href: "/vote" },
    { title: "Pengembang", href: "/pengembang" },
  ];
  return (
    <>
      <main className={`relative w-full h-[60px] my-[24px] `}>
        <SectionsGap>
          <nav
            data-aos="fade-down"
            data-aos-delay="500"
            data-aos-duration="500"
            className={`fixed transition-all duration-300 bg-white ease-in-out right-4 left-4   ${
              isScrolled
                ? "top-8 w-[90%] xl:max-w-[1300px] lg:max-w-[1000px] md:max-w-[720px] sm:max-w-[620px] rounded-[64px]"
                : "top-5 max-w-full "
            }`}
          >
            <div className="flex items-center justify-between">
              <Link href="/">
                <Image src={LogoMPK} alt="LogoMPK" width={60} height={60} />
              </Link>
              <ul className="flex gap-[36px]">
                {link.map((item, index) => (
                  <li
                    key={index}
                    className="hover:text-primary-color ease-in-out duration-500"
                  >
                    <Link href={item.href}>
                      <Large_Text variant="REGULAR">{item.title}</Large_Text>
                    </Link>
                  </li>
                ))}
              </ul>
              <FormButton variant="PRIMARY">Login</FormButton>
            </div>
          </nav>
        </SectionsGap>
      </main>
    </>
  );
}
