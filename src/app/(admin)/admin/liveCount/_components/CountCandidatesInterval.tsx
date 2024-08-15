"use client";
import { useRouter } from "next-nprogress-bar";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CountCandidatesInterval({
  candidatesVote,
  duration,
}: {
  candidatesVote: number;
  duration: number;
}) {
  const [countdown, setCountdown] = useState(duration);
  const [candidates, setCandidate] = useState(candidatesVote);

  const router = useRouter();

  useEffect(() => {
    const timeInterval = 1000;
    const updateInterval = duration * 1000;

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : duration));
    }, timeInterval);

    const progressInterval = setInterval(() => {
      router.refresh();
      setCountdown(duration);
      animateValue(candidates, candidatesVote, updateInterval / 10);
    }, updateInterval);

    return () => {
      clearInterval(progressInterval);
      clearInterval(countdownInterval);
    };
  }, [candidates, candidatesVote, duration, router]);
  function animateValue(start: number, end: number, duration: number) {
    const startTimestamp = performance.now();
    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);
      setCandidate(currentValue);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  return <div>{candidates}%</div>;
}
