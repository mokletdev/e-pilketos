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
    ImgUrl:
      "https://res.cloudinary.com/dhjeoo1pm/image/upload/v1723467248/jlot15zjatamxxnxf7vf.png",
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
    name: "Fahrell Shandy Zhariif",
    ImgUrl: "",
    gen: "32nd",
    job: "Frontend",
  },
  {
    name: "Rakha Adrian Nur Tanaya",
    ImgUrl:
      "https://res.cloudinary.com/dhjeoo1pm/image/upload/v1723466735/vnewsiz0hjfiueajm8ko.png",
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
    ImgUrl:
      "https://res.cloudinary.com/dhjeoo1pm/image/upload/v1723466734/zao5itrhlbz63okxxh9r.jpg",
    gen: "32nd",
    job: "UI UX Design",
  },
];
