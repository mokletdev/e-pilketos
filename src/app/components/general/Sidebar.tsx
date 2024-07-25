"use client";
import React from "react";

import LogoMPK from "@/../public/images/LogoMPK.png";
import Image from "next/image";
import Link from "next/link";
import { Large_Text, Medium_Text } from "./Text";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  return (
    <div className="block w-80">
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
                    href="/admin"
                    className="group flex items-center rounded-[50px] px-5 py-3 text-base font-normal text-primary-400 hover:bg-secondary-color hover:text-white transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.8186 4.6664C12.7439 3.77787 11.2561 3.77787 10.1815 4.6664L4.79539 9.11964C4.30425 9.52572 4 10.1673 4 10.8663V17.8109C4 19.0784 4.95214 20 6 20H8V16.7478C8 14.4927 9.73415 12.5587 12 12.5587C14.2659 12.5587 16 14.4927 16 16.7478V20H18C19.0479 20 20 19.0784 20 17.8109V10.8663C20 10.1673 19.6958 9.52572 19.2046 9.11965L13.8186 4.6664ZM15.093 3.12502L20.479 7.57827C21.4494 8.38059 22 9.59705 22 10.8663V17.8109C22 20.066 20.2659 22 18 22H16C14.8954 22 14 21.1046 14 20V16.7478C14 15.4803 13.0479 14.5587 12 14.5587C10.9521 14.5587 10 15.4803 10 16.7478V20C10 21.1046 9.10457 22 8 22H6C3.73415 22 2 20.066 2 17.8109V10.8663C2 9.59705 2.55059 8.38059 3.52097 7.57827L8.90703 3.12502C10.7213 1.62499 13.2787 1.62499 15.093 3.12502Z"
                        className="fill-current hover:fill-white"
                      />
                    </svg>
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
                    href="/admin"
                    className="group flex items-center rounded-[50px] px-5 py-3 text-base font-normal text-primary-400 hover:bg-secondary-color hover:text-white transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z"
                        className="fill-current hover:fill-white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.9999 20C9.07106 20 7.33454 19.1139 6.3353 17.9708C6.03082 17.6225 5.95147 17.3163 5.96068 17.0651C5.97049 16.7971 6.08635 16.487 6.34713 16.1692C6.8828 15.5164 7.90124 15 8.99992 15H14.9999C16.0986 15 17.117 15.5164 17.6527 16.1692C17.9135 16.487 18.0293 16.7971 18.0392 17.0651C18.0484 17.3163 17.969 17.6225 17.6645 17.9708C16.6653 19.1139 14.9288 20 11.9999 20ZM4.8295 19.2871C6.30206 20.9716 8.65319 22 11.9999 22C15.3466 22 17.6978 20.9716 19.1703 19.2871C19.7746 18.5958 20.0675 17.8036 20.0378 16.9919C20.0087 16.1971 19.6744 15.48 19.1988 14.9004C18.2617 13.7585 16.6627 13 14.9999 13H8.99992C7.33717 13 5.73815 13.7585 4.80107 14.9004C4.32547 15.48 3.99113 16.1971 3.96202 16.9919C3.93229 17.8036 4.22527 18.5958 4.8295 19.2871Z"
                        className="fill-current hover:fill-white"
                      />
                    </svg>

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
                    href="/admin"
                    className="group flex items-center rounded-[50px] px-5 py-3 text-base font-normal text-primary-400 hover:bg-secondary-color hover:text-white transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 6.07186C8.97057 6.22045 7.98279 6.59727 7.11101 7.17978C5.95987 7.94895 5.06266 9.0422 4.53285 10.3213C4.00303 11.6004 3.86441 13.0078 4.13451 14.3657C4.4046 15.7236 5.07129 16.9708 6.05026 17.9498C7.02922 18.9288 8.2765 19.5955 9.63437 19.8656C10.9922 20.1357 12.3997 19.997 13.6788 19.4672C14.9579 18.9374 16.0511 18.0402 16.8203 16.8891C17.4028 16.0173 17.7796 15.0295 17.9282 14.0001H12C10.8954 14.0001 10 13.1046 10 12.0001V6.07186ZM9.8779 4.07029C11.1074 3.91578 12 4.93448 12 6.00007V12.0001H18C19.0656 12.0001 20.0843 12.8926 19.9298 14.1222C19.7561 15.5046 19.263 16.8332 18.4832 18.0002C17.4943 19.4802 16.0887 20.6338 14.4442 21.315C12.7996 21.9962 10.99 22.1744 9.24419 21.8271C7.49836 21.4799 5.89472 20.6227 4.63604 19.364C3.37737 18.1054 2.5202 16.5017 2.17294 14.7559C1.82567 13.01 2.0039 11.2005 2.68509 9.55592C3.36628 7.91138 4.51983 6.50577 5.99987 5.51684C7.16686 4.73708 8.49549 4.244 9.8779 4.07029Z"
                        className="fill-current hover:fill-white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13 4.00008C13 2.9412 13.8925 1.90229 15.139 2.08157C15.7978 2.17634 16.4438 2.35318 17.0615 2.60904C18.0321 3.01108 18.914 3.60036 19.6569 4.34323C20.3997 5.08609 20.989 5.96801 21.391 6.93861C21.6469 7.55632 21.8237 8.20226 21.9185 8.8611C22.0978 10.1076 21.0589 11.0001 20 11.0001L14.1 11.0001C13.4925 11.0001 13 10.5076 13 9.90008V4.00008ZM19.9161 9.00008C19.8411 8.55645 19.7163 8.12162 19.5433 7.70398C19.2417 6.97603 18.7998 6.31459 18.2426 5.75744C17.6855 5.20029 17.0241 4.75833 16.2961 4.4568C15.8785 4.28381 15.4436 4.15899 15 4.084V9.00008L19.9161 9.00008Z"
                        className="fill-current hover:fill-white"
                      />
                    </svg>

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
                    href="/admin"
                    className="group flex items-center rounded-[50px] px-5 py-3 text-base font-normal text-primary-400 hover:bg-secondary-color hover:text-white transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7Z"
                        className="fill-current hover:fill-white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 10C8.55228 10 9 10.4477 9 11L9 16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16L7 11C7 10.4477 7.44772 10 8 10Z"
                        className="fill-current hover:fill-white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 12C16.5523 12 17 12.4477 17 13V16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16L15 13C15 12.4477 15.4477 12 16 12Z"
                        className="fill-current hover:fill-white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 7C12.5523 7 13 7.44772 13 8L13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16L11 8C11 7.44772 11.4477 7 12 7Z"
                        className="fill-current hover:fill-white"
                      />
                    </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 17C8 16.4477 8.44772 16 9 16H15C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18H9C8.44772 18 8 17.5523 8 17Z"
                        className="fill-current hover:fill-white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 13C8 12.4477 8.44772 12 9 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H9C8.44772 14 8 13.5523 8 13Z"
                        className="fill-current hover:fill-white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 9C8 8.44772 8.44772 8 9 8H10C10.5523 8 11 8.44772 11 9C11 9.55228 10.5523 10 10 10H9C8.44772 10 8 9.55228 8 9Z"
                        className="fill-current hover:fill-white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 4C6.89543 4 6 4.89543 6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V8.82843C18 8.56321 17.8946 8.30886 17.7071 8.12132L13.8787 4.29289C13.6911 4.10536 13.4368 4 13.1716 4H8ZM4 6C4 3.79086 5.79086 2 8 2H13.1716C13.9672 2 14.7303 2.31607 15.2929 2.87868L19.1213 6.70711C19.6839 7.26972 20 8.03278 20 8.82843V18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18V6Z"
                        className="fill-current hover:fill-white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14 3V5C14 6.65685 15.3431 8 17 8H19V10H17C14.2386 10 12 7.76142 12 5V3H14Z"
                        className="fill-current hover:fill-white"
                      />
                    </svg>
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
              className="flex gap-3 text-dark-1 hover:text-secondary-color duration-[0.25s]" // Apply hover effect to both text and button
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                  className="fill-current hover:fill-secondary-color" // Apply hover effect to SVG path
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7 12C7 12.5523 7.44772 13 8 13L16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11L8 11C7.44772 11 7 11.4477 7 12Z"
                  className="fill-current hover:fill-secondary-color" // Apply hover effect to SVG path
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.7071 7.29289C13.0976 7.68342 13.0976 8.31658 12.7071 8.70711L9.41421 12L12.7071 15.2929C13.0976 15.6834 13.0976 16.3166 12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289Z"
                  className="fill-current hover:fill-secondary-color" // Apply hover effect to SVG path
                />
              </svg>
              <Large_Text variant="BOLD">Log Out</Large_Text>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
