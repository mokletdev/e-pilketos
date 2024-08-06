import React from "react";

interface ProgressbarProps {
  progress: number;
}

export default function Progressbar({ progress }: ProgressbarProps) {
  return (
    <div className="w-full rounded-xl h-5 bg-secondary-color">
      <div
        className={`h-full rounded-xl w-[${progress}%] bg-red-light duration-500`}
      ></div>
    </div>
  );
}
