import React from "react";

import CandidateCard from "./_components/CandidateCard";
import { H1, Large_Text } from "@/app/components/general/Text";

export default function HasilVote() {
  return (
    <main className="h-[100vh] flex">
      <div className="my-auto w-full mx-auto flex flex-col gap-24">
        <div>
          <H1 className="text-center">Live Count</H1>
          <Large_Text
            className="text-center text-secondary-text-color"
            variant="REGULAR"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </Large_Text>
        </div>
        <CandidateCard />
      </div>
    </main>
  );
}
