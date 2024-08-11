"use client";

import React, { useState, useEffect } from "react";

interface ProgressbarProps {
  progress: number; // Progress value passed in
}

export default function Progressbar({ progress }: ProgressbarProps) {
  const [currentProgress, setCurrentProgress] = useState(progress);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev === progress) {
          clearInterval(interval);
          return prev;
        }
        return prev < progress ? prev + 1 : prev - 1;
      });
    }, 20); // Adjust the interval time to control speed

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="w-full rounded-xl h-5 bg-secondary-color">
      <div
        className="h-full rounded-xl bg-red-light"
        style={{ width: `${currentProgress}%` }}
      ></div>
    </div>
  );
}
