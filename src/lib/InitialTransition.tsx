"use client";
import React, { ReactNode, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface AOSProops {
  children: ReactNode;
}

export default function InitialTransition({ children }: AOSProops) {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-out",
      once: true,
    });
  });
  return <React.Fragment>{children}</React.Fragment>;
}
