"use client";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Arrow from "../../general/Arrow";
import "keen-slider/keen-slider.min.css";
import img1 from "@/../public/images/dokum/DSC02089.webp";
import img2 from "@/../public/images/dokum/IMG_3160.webp";
import img3 from "@/../public/images/dokum/DSC02239.webp";
import img4 from "@/../public/images/dokum/IMG_3259.webp";
import img5 from "@/../public/images/dokum/IMG_3267.webp";

interface GaleriProps {
  Image: any;
  alt: string;
}

export default function GaleriCarousel() {
  const galeriCard: GaleriProps[] = [
    {
      Image: img1,
      alt: "",
    },
    {
      Image: img2,
      alt: "",
    },
    {
      Image: img3,
      alt: "",
    },
    {
      Image: img4,
      alt: "",
    },
    {
      Image: img5,
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
    <div
      data-aos="fade-up"
      data-aos-duration="500"
      data-aos-delay="500"
      className="mt-[100px] relative"
    >
      <div
        ref={sliderRef}
        className="keen-slider teams-wrapper max-w-full max-h-full group"
      >
        {galeriCard.map((item, index) => (
          <div
            key={index}
            className={`keen-slider__slide number-slide${
              index + 1
            } group-hover:scale-110`}
          >
            <Image
              src={item.Image}
              alt={item.alt}
              className={`rounded-2xl`}
              width={800}
              height={600}
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
                currentSlide === slider.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
    </div>
  );
}
