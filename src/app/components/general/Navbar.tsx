"use client";

import React, { useState, useEffect } from "react";
import SectionsGap from "./SectionsGap";
import Link from "next/link";
import LogoMPK from "@/../public/images/LogoMPK.png";
import { Large_Text } from "./Text";
import Image from "next/image";
import { FormButton } from "./Button";
import { signIn } from "next-auth/react";

interface NavbarProps {
  title: string;
  href: string;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sectionActive, setSectionActive] = useState("home");
  const [isMounted, setIsMounted] = useState(false);
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    setModal(!modal);
  };

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

    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setIsMounted(true);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) {
    return null;
  }

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
      <main className={`relative w-full h-[60px] flex flex-col z-20`}>
        <SectionsGap>
          <nav
            data-aos="fade-down"
            data-aos-delay="500"
            data-aos-duration="500"
            className={`fixed transition-transform bg-white duration-500   ${
              isScrolled
                ? "top-8 w-[90%] 2xl:max-w-[1440px] xl:max-w-[1322px] lg:max-w-[1024px]  sm:max-w-[480px] rounded-[64px] shadow-shadow-2  items-center py-4 px-8 right-10 left-10 place-self-center "
                : " max-w-full top-0 py-4 px-8 w-full left-10 right-10 place-self-center"
            }`}
            style={{ transition: "all 0.8s ease-in-out" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-7">
                <div className="block xl:hidden 2xl:hidden">
                  <button onClick={handleClick} title="Hamburg">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="vuesax/linear/menu">
                        <g id="menu">
                          <path
                            id="Vector"
                            d="M3 7H21"
                            stroke="#111928"
                            stroke-width="1.2"
                            stroke-linecap="round"
                          />
                          <path
                            id="Vector_2"
                            d="M3 12H21"
                            stroke="#111928"
                            stroke-width="1.2"
                            stroke-linecap="round"
                          />
                          <path
                            id="Vector_3"
                            d="M3 17H21"
                            stroke="#111928"
                            stroke-width="1.2"
                            stroke-linecap="round"
                          />
                        </g>
                      </g>
                    </svg>
                  </button>
                </div>
                {modal && (
                  <div className="fixed left-0 bg-white p-6 rounded-[48px] top-28 -z-10 flex flex-col gap-[18px] shadow-shadow-2 xl:hidden ">
                    <ul className="flex flex-col gap-[18px]">
                      {link.map((item, index) => (
                        <li
                          key={index}
                          className="hover:bg-primary-color hover:text-white text-center rounded-full ease-in-out duration-500 block p-2"
                        >
                          <Link href={item.href}>
                            <Large_Text variant="REGULAR">
                              {item.title}
                            </Large_Text>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <FormButton
                      variant="PRIMARY"
                      className="block lg:hidden"
                      onClick={() => signIn()}
                    >
                      Login
                    </FormButton>
                  </div>
                )}
                <Link href="/">
                  <Image src={LogoMPK} alt="LogoMPK" width={60} height={60} />
                </Link>
              </div>
              <ul className="flex gap-[36px] ">
                {link.map((item, index) => (
                  <li
                    key={index}
                    className="hover:text-primary-color ease-in-out duration-500 hidden xl:block"
                  >
                    <Link href={item.href}>
                      <Large_Text variant="REGULAR">{item.title}</Large_Text>
                    </Link>
                  </li>
                ))}
              </ul>
              <FormButton
                variant="PRIMARY"
                className="hidden lg:block"
                onClick={() => signIn()}
              >
                Login
              </FormButton>
            </div>
          </nav>
        </SectionsGap>
      </main>
    </>
  );
}
