import Image from "next/image";
import { H6, Medium_Text } from "../../general/Text";

export interface PanduanCardProps {
  image: any;
  head: string;
  body: string;
}

export function PanduanCardR({ image, head, body }: PanduanCardProps) {
  return (
    <main className="w-full max-w-full xl:max-w-[450px] p-7 h-auto bg-gray-1  shadow-shadow-2 flex items-start gap-[28px] rounded-2xl">
      <Image
        src={image}
        alt={head}
        className="rounded-[10px] block"
        width={60}
        height={60}
      />
      <div className="flex flex-col gap-[18px]">
        <H6>{head}</H6>
        <Medium_Text variant="REGULAR" className="text-secondary-text-color">
          {body}
        </Medium_Text>
      </div>
    </main>
  );
}
export function PanduanCardL({ image, head, body }: PanduanCardProps) {
  return (
    <main className="w-full max-w-full xl:max-w-[450px] h-auto bg-gray-1 p-7 shadow-shadow-2 flex items-start gap-[28px] rounded-2xl text-left flex-row">
      <Image
        src={image}
        alt={head}
        className="rounded-[10px]"
        width={60}
        height={60}
      />
      <div className="flex flex-col gap-[18px]">
        <H6>{head}</H6>
        <Medium_Text variant="REGULAR" className="text-secondary-text-color">
          {body}
        </Medium_Text>
      </div>
    </main>
  );
}
