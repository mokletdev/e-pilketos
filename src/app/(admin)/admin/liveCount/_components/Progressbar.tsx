"use client";

import { Medium_Text } from "@/app/components/general/Text";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface ProgressbarProps {
  totalVotes: number;
  duration: number;
}

export default function Progressbar({
  totalVotes,
  duration,
}: ProgressbarProps) {
  const [currentProgress, setCurrentProgress] = useState(totalVotes);
  const [countdown, setCountdown] = useState(duration);
  const router = useRouter();

  useEffect(() => {
    const timeInterval = 1000;
    const updateInterval = duration * 1000;
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : duration));
    }, timeInterval);

    const progressInterval = setInterval(() => {
      router.refresh();
      setCurrentProgress(totalVotes);
      setCountdown(duration);
      toast.success("Data Terupdate!");
    }, updateInterval);

    return () => {
      clearInterval(progressInterval);
      clearInterval(countdownInterval);
    };
  }, [totalVotes, duration, router]);

  return (
    <div className="w-full rounded-xl h-5 bg-secondary-color">
      <div
        className="h-full rounded-xl bg-red-light-2"
        style={{
          width: `${currentProgress}%`,
          transition: "width 2s ease-in-out",
        }}
      ></div>
    </div>
  );
}
