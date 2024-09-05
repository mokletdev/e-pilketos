import React from "react";

interface ProgressProps {
  percent: number;
}

export default function Progress({ percent }: ProgressProps) {
  const percentage = 100 - percent;

  return (
    <div className="relative size-40 z-10">
      <svg
        className="size-full -rotate-90"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-gray-2"
          strokeWidth="4"
        ></circle>
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-primary-color duration-500"
          strokeWidth="4"
          strokeDasharray="100"
          strokeDashoffset={percentage}
          strokeLinecap="round"
        ></circle>
      </svg>

      <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <span className="text-center text-2xl font-bold text-primary-color">
          {percent}
        </span>
      </div>
    </div>
  );
}
