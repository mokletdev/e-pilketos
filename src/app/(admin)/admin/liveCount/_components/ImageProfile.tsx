import React from "react";
import Image from "next/image";

interface ImageProfileProps {
  src: any;
}

export default function ImageProfile({ src }: ImageProfileProps) {
  return (
    <Image
      src={src}
      alt="profile"
      width={170}
      height={210}
      className="rounded-[10px]"
    />
  );
}
