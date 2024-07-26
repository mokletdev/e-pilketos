import React from "react";
import SectionsGap from "./SectionsGap";
import Image from "next/image";
import logoMPK from "@/../public/images/LogoMPK.png";
import logoOsis from "@/../public/logo-osis.png";
import logoTS from "@/../public/logo-ts.png";
import Link from "next/link";

interface FooterProops {
  title: string;
  href: string;
  logo?: string;
}

export default function Footer() {
  return (
    <>
      <main className="bg-white w-full h-full z-30 relative">
        <SectionsGap>
          <footer>
            <div className="mx-[22px]">
              <div className="flex justify-center items-center gap-x-[52px] py-[52px]">
                <div>
                  <Image src={logoMPK} alt="Logo MPK" className="w-[63px]" />
                </div>
                <div>
                  <Image src={logoOsis} alt="Logo OSIS" className="w-[63px]" />
                </div>
                <div>
                  <Image src={logoTS} alt="Logo TS" className="w-[63px]" />
                </div>
              </div>

              {/* Links */}
              <div className="flex 2xl:gap-x-20 gap-x-6 mx-[auto] 2xl:mx-[65px] justify-between">
                {/* Media Sosial */}
                <div>
                  <p className="font-semibold mb-[28px]">Media Sosial</p>
                  <div className="grid grid-rows-3 gap-y-[12px]">
                    <div className="flex gap-x-[11px] group">
                      <div className="flex items-center">
                        <Link
                          href="https://www.instagram.com/smktelkommalang/"
                          target="_blank"
                          className="w-[32px] h-[32px] rounded-full flex justify-center items-center border group-hover:bg-primary-color group-hover:border-primary-color duration-200 group-hover:text-white"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            width={17}
                            className="fill-current"
                          >
                            <g>
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path
                                d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
                                fillRule="nonzero"
                              />
                            </g>
                          </svg>
                        </Link>
                      </div>
                      <Link
                        href="https://www.instagram.com/smktelkommalang/"
                        className="font-medium text-[16px] text-secondary-text-color group-hover:text-primary-color items-center flex group-hover:underline duration-200"
                        target="_blank"
                      >
                        Instagram
                      </Link>
                    </div>
                    <div className="flex gap-x-[11px] group">
                      <div className="flex items-center">
                        <Link
                          href="https://www.instagram.com/smktelkommalang/"
                          target="_blank"
                          className="w-[32px] h-[32px] rounded-full flex justify-center items-center border group-hover:bg-primary-color group-hover:border-primary-color duration-200 group-hover:text-white"
                        >
                          <svg
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            width={14}
                            className="fill-current"
                          >
                            <title>YouTube</title>
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                        </Link>
                      </div>
                      <Link
                        href="https://www.instagram.com/smktelkommalang/"
                        className="font-medium text-[16px] text-secondary-text-color group-hover:text-primary-color items-center flex group-hover:underline duration-200"
                        target="_blank"
                      >
                        Youtube
                      </Link>
                    </div>
                    <div className="flex gap-x-[11px] group">
                      <div className="flex items-center">
                        <Link
                          href="https://www.instagram.com/smktelkommalang/"
                          target="_blank"
                          className="w-[32px] h-[32px] rounded-full flex justify-center items-center border group-hover:bg-primary-color group-hover:border-primary-color duration-200 group-hover:text-white"
                        >
                          <svg
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            width={14}
                            className="fill-current"
                          >
                            <title>TikTok</title>
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                          </svg>
                        </Link>
                      </div>
                      <Link
                        href="https://www.instagram.com/smktelkommalang/"
                        className="font-medium text-[16px] text-secondary-text-color group-hover:text-primary-color items-center flex group-hover:underline duration-200"
                        target="_blank"
                      >
                        Tiktok
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Organisasi */}
                <div>
                  <p className="font-semibold mb-[28px]">Organisasi</p>

                  <div className="grid grid-rows-4 gap-y-[12px]">
                    <Link
                      href="https://www.moklet.org/organisasi/2023-2024/OSIS"
                      className="font-medium text-[16px] text-secondary-text-color hover:text-primary-color hover:underline duration-200"
                      target="_blank"
                    >
                      OSIS
                    </Link>
                    <Link
                      href="https://www.moklet.org/organisasi/2023-2024/MPK"
                      className="font-medium text-[16px] text-secondary-text-color hover:text-primary-color hover:underline duration-200"
                      target="_blank"
                    >
                      MPK
                    </Link>
                    <Link
                      href="https://www.moklet.org/organisasi/2023-2024/METIC"
                      className="font-medium text-[16px] text-secondary-text-color hover:text-primary-color hover:underline duration-200"
                      target="_blank"
                    >
                      Metic
                    </Link>
                    <Link
                      href="https://mokletdev.vercel.app/"
                      className="font-medium text-[16px] text-secondary-text-color hover:text-primary-color hover:underline duration-200"
                      target="_blank"
                    >
                      Moklet Dev
                    </Link>
                  </div>
                </div>

                {/* Didukung Oleh */}
                <div>
                  <p className="font-semibold mb-[28px]">Didukung Oleh</p>
                  <div className="grid grid-rows-2 gap-y-[12px]">
                    <Link
                      href="https://www.moklet.org/organisasi/2023-2024/METIC"
                      className="font-medium text-[16px] text-secondary-text-color hover:text-primary-color hover:underline duration-200"
                      target="_blank"
                    >
                      Metic
                    </Link>
                    <Link
                      href="https://mokletdev.vercel.app/"
                      className="font-medium text-[16px] text-secondary-text-color hover:text-primary-color hover:underline duration-200"
                      target="_blank"
                    >
                      Moklet Dev
                    </Link>
                  </div>
                </div>
              </div>

              {/* Border */}
              <div className="py-[52px] mx-[22px]">
                <div className="w-full border-[1.5px] rounded-full"></div>
              </div>

              {/* Copy Right */}
              <div className="flex justify-center items-center pb-[28px]">
                <p className="text-secondary-text-color text-[16px]">
                  &copy; Pilketos 2024
                </p>
              </div>
            </div>
          </footer>
        </SectionsGap>
      </main>
    </>
  );
}
