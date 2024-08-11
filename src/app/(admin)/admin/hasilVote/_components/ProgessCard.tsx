import React from "react";
import Progress from "@/app/components/general/Progress";
import { H3, H4, Medium_Text } from "@/app/components/general/Text";

interface ProgessCardProps {
  children?: React.ReactNode;
  target: string;
  percent: number;
  className?: string;
}

export default function ProgessCard({
  target,
  children,
  percent,
  className,
}: ProgessCardProps) {
  return (
    <div className="w-full h-auto bg-white rounded-[10px] shadow-md mt-[28px]">
      <div
        className={`flex ${className} p-7 gap-8 justify-between items-center `}
      >
        <div className="flex flex-col text-center xl:text-start gap-4">
          <div>
            <H3>Total Vote</H3>
            <H4 className={className}>{target}</H4>
          </div>
          <Medium_Text variant="REGULAR" className="text-secondary-text-color">
            {children}
          </Medium_Text>
        </div>
        <Progress percent={percent} />
      </div>
    </div>
  );
}
