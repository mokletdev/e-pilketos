import React from "react";
import { H1, Large_Text } from "../../components/general/Text";
import CandidateCard from "../../(admin)/admin/liveCount/_components/CandidateCard";

export default function LiveCount2Kandidat() {
  return (
    <main className="h-[100vh] flex max-w-screen-2xl w-full mx-auto">
      <div className="my-auto w-full mx-auto flex flex-col gap-24">
        <div>
          <H1 className="text-center">Live Count</H1>
          <Large_Text
            className="text-center text-secondary-text-color"
            variant="REGULAR"
          >
            Tayangan Live Pemilihan Ketua OSIS SMK Telkom Malang
          </Large_Text>
        </div>
        <CandidateCard />
      </div>
    </main>
  );
}
