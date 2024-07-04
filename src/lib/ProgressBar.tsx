"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ReactNode } from "react";

export default function ProgressBarProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {children}
      <ProgressBar height="3px" color="#ED1E28" shallowRouting options={{ showSpinner: false }} />
    </>
  );
}
