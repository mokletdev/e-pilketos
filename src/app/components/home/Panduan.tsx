import React from "react";
import { H2, H6, Large_Text, Medium_Text } from "../general/Text";
import SectionsGap from "../general/SectionsGap";
import {
  PanduanCardR,
  PanduanCardProps,
  PanduanCardL,
} from "./home-components/PanduanCard";
import Icon1 from "@/../public/images/Icon1.png";
import Icon2 from "@/../public/images/Icon2.png";
import Icon3 from "@/../public/images/Icon3.png";
import Icon4 from "@/../public/images/Icon4.png";
import Icon5 from "@/../public/images/Icon5.png";
import Icon6 from "@/../public/images/Icon6.png";

export default function Panduan() {
  const panduanR: PanduanCardProps[] = [
    {
      image: Icon1,
      head: "Username dan Password",
      body: "Pastikan Anda memasukkan username dan password dengan benar. Periksa kembali karakter, termasuk huruf besar dan kecil.",
    },
    {
      image: Icon3,
      head: "Hak Suara",
      body: "Apabila terdapat kendala, silakan menghubungi penjaga bilik untuk mendapatkan bantuan yang diperlukan.",
    },
    {
      image: Icon5,
      head: "Kesulitan dan Kendala",
      body: "Pastikan suara Anda terhadap kandidat sudah tepat, karena setiap hak suara hanya diberikan sekali kesempatan.",
    },
  ];
  const panduanL: PanduanCardProps[] = [
    {
      image: Icon2,
      head: "Koneksi",
      body: "Pastikan Anda memasukkan username dan password dengan benar. Periksa kembali karakter, termasuk huruf besar dan kecil.",
    },
    {
      image: Icon4,
      head: "Kenali Kandidat",
      body: "Apabila terdapat kendala, silakan menghubungi penjaga bilik untuk mendapatkan bantuan yang diperlukan.",
    },
    {
      image: Icon6,
      head: "Tidak Dapat Mengulang",
      body: "Pastikan suara Anda terhadap kandidat sudah tepat, karena setiap hak suara hanya diberikan sekali kesempatan.",
    },
  ];

  return (
    <>
      <main className="bg-white w-full h-full flex my-24">
        <SectionsGap>
          <div className="flex flex-col mx-auto my-auto gap-[50px]">
            <div className="text-center flex-col flex gap-[28px]">
              <H2>Panduan</H2>
              <Large_Text
                variant="REGULAR"
                className="text-secondary-text-color"
              >
                Sebelum melakukan vote ada beberapa hal yang harus diperhatikan
                nih..
              </Large_Text>
            </div>
            <div className="flex gap-[200px]">
              <div className="grid grid-cols-1 gap-[50px]">
                {panduanR.map((item, index) => (
                  <PanduanCardR
                    key={index}
                    image={item.image}
                    head={item.head}
                    body={item.body}
                  />
                ))}
              </div>
              <div className="grid grid-cols-1 gap-[50px]">
                {panduanL.map((item, index) => (
                  <PanduanCardL
                    key={index}
                    image={item.image}
                    head={item.head}
                    body={item.body}
                  />
                ))}
              </div>
            </div>
          </div>
        </SectionsGap>
      </main>
    </>
  );
}
