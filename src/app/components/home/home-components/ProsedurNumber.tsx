import { Large_Text, Medium_Text } from "../../general/Text";

interface ProsedurNumberProps {
  index: string;
  title: string;
  body?: string;
  variants?: "Outline" | "Block";
}

export default function ProsedurNumber({
  index,
  title,
  body,
  variants,
}: ProsedurNumberProps) {
  const Outline = variants === "Outline";
  const Block = variants === "Block";
  if (Outline) {
    return (
      <div className="flex items-center gap-7">
        <div className="size-[50px] rounded-[30px] outline outline-1 outline-primary-color text-primary-color flex items-center justify-center">
          <Large_Text variant="MEDIUM" className="text-center">
            {index}
          </Large_Text>
        </div>
        <div className="items-center text-primary-text-color">
          <Large_Text variant="MEDIUM">{title}</Large_Text>
        </div>
      </div>
    );
  } else if (Block) {
    return (
      <div className="flex items-center gap-7">
        <div className="size-[50px] rounded-[30px] bg-primary-color text-white flex items-center justify-center">
          <Large_Text variant="MEDIUM" className="text-center">
            {index}
          </Large_Text>
        </div>
        <div className="items-center text-primary-text-color">
          <Large_Text variant="MEDIUM">{title}</Large_Text>
          <Medium_Text variant="REGULAR" className="text-secondary-text-color">
            {body}
          </Medium_Text>
        </div>
      </div>
    );
  }
}
