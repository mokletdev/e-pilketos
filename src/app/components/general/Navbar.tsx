"use client";

import React, { useState, useEffect } from "react";
import SectionsGap from "./SectionsGap";
import Link from "next/link";
import LogoMPK from "@/../public/images/LogoMPK.png";
import { Large_Text, Small_Text } from "./Text";
import Image from "next/image";
import { FormButton } from "./Button";
import { signIn, signOut, useSession } from "next-auth/react";

interface NavbarProps {
  title: string;
  href: string;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sectionActive, setSectionActive] = useState("home");
  const [isMounted, setIsMounted] = useState(false);
  const [modal, setModal] = useState(false);
  const { data: session, status } = useSession();
  const [detailUser, setDetailUser] = useState<boolean>(false);

  const handleClick = () => {
    setModal(!modal);
  };

  const handleDetailClick = () => {
    setDetailUser(!detailUser);
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
      <main className={`relative w-full h-auto lg:h-[60px] flex flex-col z-40`}>
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
              <div className="flex items-center gap-x-7">
                <div className="block xl:hidden 2xl:hidden">
                  <button onClick={handleClick} title="Hamburger">
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
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                          <path
                            id="Vector_2"
                            d="M3 12H21"
                            stroke="#111928"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                          <path
                            id="Vector_3"
                            d="M3 17H21"
                            stroke="#111928"
                            strokeWidth="1.2"
                            strokeLinecap="round"
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
                    {status === "authenticated" ? (
                      <FormButton
                        variant="PRIMARY"
                        onClick={() => signOut({ callbackUrl: "/login" })}
                      >
                        Logout
                      </FormButton>
                    ) : (
                      <>
                        {status !== "loading" ? (
                          <FormButton
                            variant="PRIMARY"
                            className="block"
                            onClick={() => signIn()}
                          >
                            Login
                          </FormButton>
                        ) : (
                          <div className="flex justify-center items-center gap-x-3">
                            <div role="status">
                              <svg
                                aria-hidden="true"
                                className="w-8 h-8 text-dark-7 animate-spin fill-primary-color"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <Large_Text
                              variant="MEDIUM"
                              className="text-primary-color"
                            >
                              Loading...
                            </Large_Text>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
                <Link href="/">
                  <Image
                    src={LogoMPK}
                    alt="LogoMPK"
                    className="lg:size-[60px] size-[40px]"
                  />
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
              {status === "authenticated" ? (
                <>
                  <div
                    onClick={handleDetailClick}
                    className="cursor-pointer border rounded-full hidden xl:block"
                  >
                    <div className="flex items-center gap-x-3">
                      {/* <Small_Text variant="REGULAR">
                      {session.user?.name}
                    </Small_Text> */}
                      <svg
                        className="w-6 h-6 text-black m-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 9-7 7-7-7"
                        />
                      </svg>

                      <div className="rounded-full overflow-hidden m-1">
                        <Image
                          src={session.user?.user_pic as string}
                          alt="User Profile"
                          width={50}
                          height={50}
                          className=""
                        />
                      </div>
                    </div>
                  </div>
                  {detailUser && (
                    <div className="fixed right-0 hidden bg-white p-4 rounded-[48px] top-24 xl:flex flex-col gap-[18px] shadow-shadow-2">
                      <ul>
                        <li>
                          <FormButton
                            variant="PRIMARY"
                            onClick={() => signOut({ callbackUrl: "/login" })}
                          >
                            Logout
                          </FormButton>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {status !== "loading" ? (
                    <FormButton
                      variant="PRIMARY"
                      className="hidden lg:block"
                      onClick={() => signIn()}
                    >
                      Login
                    </FormButton>
                  ) : (
                    <div className="flex justify-center items-center gap-x-3">
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-dark-7 animate-spin fill-primary-color"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                      <Large_Text
                        variant="MEDIUM"
                        className="text-primary-color"
                      >
                        Loading...
                      </Large_Text>
                    </div>
                  )}
                </>
              )}
            </div>
          </nav>
        </SectionsGap>
      </main>
    </>
  );
}
