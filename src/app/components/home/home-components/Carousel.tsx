"use client";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import imagePlaceHolder from "@/../public/images/imagePlaceholder.jpeg";
import Image from "next/image";
import Arrow from "../../general/Arrow";
import "keen-slider/keen-slider.min.css";

interface GaleriProps {
  Image: any;
  alt: string;
}

export default function GaleriCarousel() {
  const galeriCard: GaleriProps[] = [
    {
      Image: imagePlaceHolder,
      alt: "",
    },
    {
      Image: imagePlaceHolder,
      alt: "",
    },
    {
      Image: imagePlaceHolder,
      alt: "",
    },
    {
      Image: imagePlaceHolder,
      alt: "",
    },
    {
      Image: imagePlaceHolder,
      alt: "",
    },
    {
      Image: imagePlaceHolder,
      alt: "",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(true);
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: "free",
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 1, spacing: 5 },
      },
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 30 },
      },
      "(min-width: 1280px)": {
        slides: { perView: 5, spacing: 40 },
      },
    },
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  useEffect(() => {
    const timer = setInterval(() => {
      slider.current?.next();
    }, 3000);
    return () => clearInterval(timer);
  }, [slider]);
  return (
    <main className="">
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-delay="500"
        className="mt-[100px] navigation-wrapper relative"
      >
        <div
          ref={sliderRef}
          className="keen-slider teams-wrapper max-w-full max-h-full"
        >
          {galeriCard.map((item, index) => (
            <div
              key={index}
              className={`keen-slider__slide number-slide${
                index + 1
              } hover:scale-110 `}
            >
              <Image
                src={item.Image}
                alt={item.alt}
                className={`rounded-2xl`}
              />
            </div>
          ))}
          {loaded && slider.current && (
            <>
              <Arrow
                left
                onClick={(e: any) =>
                  e.stopPropagation() || slider.current?.prev()
                }
                disabled={currentSlide === 0}
              />

              <Arrow
                onClick={(e: any) =>
                  e.stopPropagation() || slider.current?.next()
                }
                disabled={
                  currentSlide ===
                  slider.current.track.details.slides.length - 1
                }
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
