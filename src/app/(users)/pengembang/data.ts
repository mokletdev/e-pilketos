import { StaticImageData } from "next/image";

export interface dataProps {
  name: string;
  ImgUrl: string | StaticImageData;
  job: string;
  gen: string;
}

export const Contributor: dataProps[] = [
  {
    name: "Naufal Nabil Ramadhan",
    ImgUrl: "",
    gen: "32nd",
    job: "FullStack",
  },
  {
    name: "Muhammad Zuhair Zuhdi",
    ImgUrl: "",
    gen: "32nd",
    job: "Backend",
  },
  {
    name: "Fahrell Shandy Zhariff Widiatmoko",
    ImgUrl: "",
    gen: "32nd",
    job: "Frontend",
  },
  {
    name: "Rakha Adrian Nur Tanaya",
    ImgUrl: "",
    gen: "32nd",
    job: "Frontend",
  },
  {
    name: "Moh Abdul Aziz",
    ImgUrl: "",
    gen: "32nd",
    job: "UI UX Design",
  },
  {
    name: "Juang Bagus Arya Mukti",
    ImgUrl: "",
    gen: "32nd",
    job: "UI UX Design",
  },
];
