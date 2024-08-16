"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import LogoMPK from "@/../public/logo-mpk.png";
import { Large_Text } from "./Text";
import DashboardIcon from "../Icons/DashboardIcon";
import KandidatIcon from "../Icons/KandidatIcon";
import LiveCountIcon from "../Icons/LiveCountIcon";
import HasilVote from "../Icons/HasilVote";
import LaporanExcelIcon from "../Icons/LaporanExcelIcon";
import { signOut } from "next-auth/react";
import { FaUsers } from "react-icons/fa";
import VoteSetup from "../Icons/VoteSetup";

interface SidebarProps {
  title: string;
  href: string;
  click?: () => void;
}

export default function Sidebar() {
  const [modal, setModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };
  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange,
      );
    };
  }, []);

  const handleClick = () => {
    setModal(!modal);
  };

  const link: SidebarProps[] = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      title: "Kandidat",
      href: "/admin/candidates",
    },
    {
      title: "Live Count",
      href: "/LiveCount2Kandidat",
    },
    {
      title: "Hasil Vote",
      href: "/admin/hasilVote",
    },
    {
      title: "Laporan Excel",
      href: "/admin",
    },
    {
      title: "Log Out",
      href: "",
      click: () => signOut({ callbackUrl: "/auth/login" }),
    },
  ];
  return (
    <div className="lg:block lg:w-80 relative">
      {!isFullscreen && (
        <aside
          id="sidebar"
          className={`fixed left-0 bg-white top-0 z-20 h-full flex-shrink-0 transition-all duration-300 lg:w-80 lg:opacity-100 hidden lg:flex`}
          aria-label="Sidebar"
        >
          <div className="relative flex min-h-0 flex-1 flex-col border-r px-4 border-gray-200 bg-white pt-0 justify-between">
            <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
              <div className="flex-1 space-y-12 max-h-[60px] w-full bg-white px-3w">
                <Link href={"/"} className="flex items-center justify-center">
                  <Image
                    src={LogoMPK}
                    alt="Logo moklet.org"
                    className="pointer-events-none size-[60px]"
                  />
                </Link>
                <ul className="space-y-4 pb-2">
                  <li>
                    <Link
                      href="/admin/dashboard"
                      className="group flex items-center rounded-[50px] px-5 py-3 text-base font-normal text-primary-400 hover:bg-secondary-color hover:text-white transition-all"
                    >
                      <DashboardIcon />
                      <Large_Text
                        variant="BOLD"
                        className="ml-3 whitespace-nowrap text-primary-400 font-semibold"
                      >
                        Dashboard
                      </Large_Text>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/candidates"
                      className="group flex items-center rounded-[50px] px-5 py-3 text-base font-normal text-primary-400 hover:bg-secondary-color hover:text-white transition-all"
                    >
                      <KandidatIcon />
                      <Large_Text
                        variant="BOLD"
                        className="ml-3 whitespace-nowrap text-primary-400 font-semibold"
                      >
                        Kandidat
                      </Large_Text>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/users"
                      className="group flex items-center rounded-[50px] px-5 py-3 text-base font-normal text-primary-400 hover:bg-secondary-color hover:text-white transition-all"
                    >
                      <FaUsers />
                      <Large_Text
                        variant="BOLD"
                        className="ml-3 whitespace-nowrap text-primary-400 font-semibold"
                      >
                        Users
                      </Large_Text>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/LiveCount2Kandidat"
                      className="group flex items-center rounded-[50px] px-5 py-3 text-base font-normal text-primary-400 hover:bg-secondary-color hover:text-white transition-all"
                    >
                      <LiveCountIcon />
                      <Large_Text
                        variant="BOLD"
                        className="ml-3 whitespace-nowrap text-primary-400 font-semibold"
                      >
                        Live Count
                      </Large_Text>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/votesesion"
                      className="group flex items-center rounded-[50px] px-5 py-3 text-base font-normal text-primary-400 hover:bg-secondary-color hover:text-white transition-all"
                    >
                      <VoteSetup />
                      <Large_Text
                        variant="BOLD"
                        className="ml-3 whitespace-nowrap text-primary-400 font-semibold"
                      >
                        Vote Setup
                      </Large_Text>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/hasilVote"
                      className="group flex items-center rounded-[50px] px-5 py-3 text-base font-normal text-primary-400 hover:bg-secondary-color hover:text-white transition-all"
                    >
                      <HasilVote />
                      <Large_Text
                        variant="BOLD"
                        className="ml-3 whitespace-nowrap text-primary-400 font-semibold"
                      >
                        Hasil Vote
                      </Large_Text>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin"
                      className="group flex items-center rounded-[50px] px-5 py-3 text-base font-normal text-primary-400 hover:bg-secondary-color hover:text-white transition-all"
                    >
                      <LaporanExcelIcon />
                      <Large_Text
                        variant="BOLD"
                        className="ml-3 whitespace-nowrap text-primary-400 font-semibold"
                      >
                        Laporan Excel
                      </Large_Text>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-center mb-8">
              <button
                onClick={() => signOut({ callbackUrl: "/auth/login" })}
                className="group flex items-center rounded-[50px] px-5 py-3 text-base font-normal text-primary-400 hover:bg-secondary-color hover:text-white transition-all gap-x-3 w-full"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                    className="fill-current hover:fill-secondary-color" // Apply hover effect to SVG path
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 12C7 12.5523 7.44772 13 8 13L16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11L8 11C7.44772 11 7 11.4477 7 12Z"
                    className="fill-current hover:fill-secondary-color" // Apply hover effect to SVG path
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.7071 7.29289C13.0976 7.68342 13.0976 8.31658 12.7071 8.70711L9.41421 12L12.7071 15.2929C13.0976 15.6834 13.0976 16.3166 12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289Z"
                    className="fill-current hover:fill-secondary-color" // Apply hover effect to SVG path
                  />
                </svg>
                <Large_Text variant="BOLD">Log Out</Large_Text>
              </button>
            </div>
          </div>
        </aside>
      )}
      <button
        title="Hamburger"
        onClick={handleClick}
        className="p-4 bg-white rounded-xl fixed z-50 top-0 shadow-shadow-2 m-4 focus:ring-0 outline-none lg:hidden"
      >
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
      {modal && (
        <div className="left-4 lg:hidden fixed z-50 top-24">
          <ul className="p-4 bg-white rounded-xl shadow-shadow-2 space-y-4">
            {link.map((item, index) => (
              <li
                key={index}
                className="hover:bg-primary-color hover:text-white text-center rounded-full ease-in-out duration-500 block p-2"
              >
                <button title={item.title} onClick={item.click}>
                  <Link href={item.href}>{item.title}</Link>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
