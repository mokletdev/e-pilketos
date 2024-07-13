"use client";
import React, { useState } from "react";
import SectionsGap from "../general/SectionsGap";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider, TrackDetails } from "keen-slider/react";

import gambar1 from "/public/gambar1.jpg";
import gambar2 from "/public/gambar2.jpg";
import gambar3 from "/public/gambar3.jpg";
import gambar4 from "/public/gambar4.jpg";
import gambar5 from "/public/gambar5.jpg";
import gambar6 from "/public/gambar6.jpg";

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

export default function Galeri() {
  const [details, setDetails] = useState<TrackDetails | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    detailsChanged(s) {
      setDetails(s.track.details);
    },
    initial: 2,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 2 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 2 },
      },
    },
    slides: { perView: 1, spacing: 2 },
  });

  function scaleStyle(idx: number) {
    if (!details) return {};
    const slide = details.slides[idx];
    const scale_size = 0.7;
    const scale = 1 - (scale_size - scale_size * slide.portion);
    return {
      transform: `scale(${scale})`,
      WebkitTransform: `scale(${scale})`,
    };
  }

  const images = [gambar1, gambar2, gambar3, gambar4, gambar5, gambar6];

  return (
    <>
      <main className="bg-white w-full h-full py-[92px]">
        <SectionsGap>
          <div className="text-center mx-[88px]">
            <h1 className="text-[48px] font-bold text-primary-text-color mb-[28px]">
              Galeri
            </h1>
            <p className="text-secondary-text-color mb-[52px]">
              Lihat para Mokleters sedang menggunakan hak suaranya untuk memilih
              siapa yang akan menjadi Ketua OSIS SMK Telkom berikutnya!
            </p>

            {/* Carousel */}
            <div className="navigation-wrapper">
              <div
                ref={sliderRef}
                className="keen-slider flex items-center zoom-out"
              >
                {images.map((src, idx) => (
                  <div key={idx} className="keen-slider__slide zoom-out__slide">
                    <div
                      style={scaleStyle(idx)}
                      className="max-w-[270px] max-h-[203px] rounded-[20px] shadow-md overflow-hidden"
                    >
                      <Image
                        src={src}
                        alt={`Slide ${idx + 1}`}
                        className="rounded-[20px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
              {loaded && instanceRef.current && (
                <>
                  <Arrow
                    left
                    onClick={(e: any) =>
                      e.stopPropagation() || instanceRef.current?.prev()
                    }
                    disabled={currentSlide === 0}
                  />
                  <Arrow
                    onClick={(e: any) =>
                      e.stopPropagation() || instanceRef.current?.next()
                    }
                    disabled={
                      currentSlide ===
                      instanceRef.current.track.details.slides.length - 1
                    }
                  />
                </>
              )}
            </div>
            {loaded && instanceRef.current && (
              <div className="dots">
                {[
                  ...Array(
                    instanceRef.current.track.details.slides.length,
                  ).keys(),
                ].map((idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        instanceRef.current?.moveToIdx(idx);
                      }}
                      className={
                        "dot" + (currentSlide === idx ? " active" : "")
                      }
                    ></button>
                  );
                })}
              </div>
            )}
          </div>
        </SectionsGap>
      </main>
    </>
  );
}
