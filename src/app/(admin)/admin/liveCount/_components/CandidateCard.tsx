import React from "react";
import ImageProfile from "./ImageProfile";
import Progressbar from "./Progressbar";
import { H3, H4, H5, Large_Text } from "@/app/components/general/Text";
import CountCandidatesInterval from "./CountCandidatesInterval";
import { VoteSessionResponse } from "@/types/liveCount";

export default function CandidateCard({ data }: { data: VoteSessionResponse }) {
  const firstFilteredCandidates = data?.candidates?.find((x) =>
    x.Vote_session_candidate.find((cn) => cn.candidates_number === 1),
  );
  const secondFilteredCandidates = data?.candidates?.find((x) =>
    x.Vote_session_candidate.find((cn) => cn.candidates_number === 2),
  );

  let VoteCandidate1 = firstFilteredCandidates?._count.User_vote || 0;
  const VoteCandidate2 = secondFilteredCandidates?._count.User_vote || 0;
  const countPercent = VoteCandidate1 + VoteCandidate2;
  const fixCount = (VoteCandidate1 / countPercent) * 100;
  const totalVotes = Math.floor(fixCount);
  const duration = 5;
  const calculateVote = 100 - totalVotes;

  let can1Vote = Math.floor(fixCount);
  let can2Vote = Math.floor(calculateVote);

  return (
    <main className="flex flex-col gap-7">
      <div className="p-14 bg-white rounded-xl shadow-shadow-2">
        <div className="justify-between flex items-center">
          <ImageProfile
            src={
              firstFilteredCandidates?.img ||
              "https://res.cloudinary.com/dhjeoo1pm/image/upload/v1725282073/ntfe8e9jczuwhc3kzeug.jpg"
            }
          />
          <div className="flex flex-col max-w-[800px] w-full mx-4 gap-8">
            <div className="grid grid-cols-3 justify-center gap-x-2">
              <div className="flex flex-col gap-30 justify-between">
                <div>
                  <H4>{firstFilteredCandidates?.name}</H4>
                  <H5>{firstFilteredCandidates?.kandidat_kelas}</H5>
                </div>
                <H3 className="text-primary-color -mb-6 mt-5">
                  <CountCandidatesInterval
                    candidatesVote={can1Vote}
                    duration={duration}
                  />
                </H3>
              </div>
              <div className="h-full flex items-center justify-center">
                <H3 className="text-primary-color text-center my-auto">VS</H3>
              </div>
              <div className="flex flex-col gap-30 text-right justify-between">
                <div>
                  <H4>{secondFilteredCandidates?.name}</H4>
                  <H5>{secondFilteredCandidates?.kandidat_kelas}</H5>
                </div>
                <H3 className="text-primary-color -mb-6 mt-5">
                  {" "}
                  <CountCandidatesInterval
                    candidatesVote={can2Vote}
                    duration={duration}
                  />
                </H3>
              </div>
            </div>
            <div className="">
              <Progressbar totalVotes={totalVotes} duration={duration} />
            </div>
          </div>
          <ImageProfile
            src={
              secondFilteredCandidates?.img ||
              "https://res.cloudinary.com/dhjeoo1pm/image/upload/v1725282073/ntfe8e9jczuwhc3kzeug.jpg"
            }
          />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-shadow-2 justify-between flex items-center px-12 py-7">
        <div className="flex items-center gap-4">
          <div className="rounded-full size-4 bg-red-light-2"></div>
          <Large_Text variant="REGULAR">
            {firstFilteredCandidates?.name || "Tidak ada kandidat"}
          </Large_Text>
        </div>
        <div className="flex flex-row-reverse  items-center gap-4">
          <div className="rounded-full size-4 bg-secondary-color"></div>
          <Large_Text variant="REGULAR">
            {secondFilteredCandidates?.name || "Tidak ada kandidat"}
          </Large_Text>
        </div>
      </div>
    </main>
  );
}
