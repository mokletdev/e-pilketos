import React from "react";
import ImageProfile from "./ImageProfile";
import FotoKandidat from "@/../public/images/FotoKandidat.png";
import Progressbar from "./Progressbar";
import { H3, H4, H5, Large_Text } from "@/app/components/general/Text";
import client from "@/lib/prisma";
import CountCandidatesInterval from "./CountCandidatesInterval";

export default async function CandidateCard() {
  const GetCandidates = await client.candidates.findMany({
    include: {
      User_vote: { select: { user_Id: true } },
      Vote_session_candidate: {
        select: { candidates_number: true },
      },
    },
  });
  const findCandidates1 = GetCandidates.find(
    (can) => can.Vote_session_candidate?.candidates_number === 1,
  );
  const findCandidates2 = GetCandidates.find(
    (can) => can.Vote_session_candidate?.candidates_number === 2,
  );
  const mergeDataCandidate = [findCandidates1, findCandidates2];

  const filteredData = mergeDataCandidate.filter((dat) => dat);

  const mapData = filteredData.map((item) => ({
    candidate: item?.name,
    totalVote: item?.User_vote,
  }));
  const one = mapData[0].totalVote;
  const a = new Array(one);

  let VoteCandidate1 = 1000; //not fix
  const VoteCandidate2 = 1000; //not fix
  const countPercent = VoteCandidate1 + VoteCandidate2;
  const fixCount = (VoteCandidate1 / countPercent) * 100;
  const totalVotes = Math.floor(fixCount);
  const duration = 20;
  const calculateVote = 100 - totalVotes;

  let can1Vote = Math.floor(fixCount);
  let can2Vote = Math.floor(calculateVote);

  return (
    <main className="flex flex-col gap-7">
      <div className="p-14 bg-white rounded-xl shadow-shadow-2">
        <div className="justify-between flex items-center">
          <ImageProfile src={FotoKandidat} />
          <div className="flex flex-col max-w-[800px] w-full mx-4 gap-8">
            <div className="grid grid-cols-3 justify-center gap-x-2">
              <div className="flex flex-col gap-30 justify-between">
                <div>
                  <H4>{findCandidates1?.name ? findCandidates1?.name : "-"}</H4>
                  <H5>
                    {findCandidates1?.kandidat_kelas
                      ? findCandidates1?.kandidat_kelas
                      : "-"}
                  </H5>
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
                  <H4>{findCandidates2?.name ? findCandidates2?.name : "-"}</H4>
                  <H5>
                    {findCandidates2?.kandidat_kelas
                      ? findCandidates2?.kandidat_kelas
                      : "-"}
                  </H5>
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
          <ImageProfile src={FotoKandidat} />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-shadow-2 justify-between flex items-center px-12 py-7">
        <div className="flex items-center gap-4">
          <div className="rounded-full size-4 bg-red-light-2"></div>
          <Large_Text variant="REGULAR">
            {findCandidates1?.name ? findCandidates1?.name : "-"}
          </Large_Text>
        </div>
        <div className="flex flex-row-reverse  items-center gap-4">
          <div className="rounded-full size-4 bg-secondary-color"></div>
          <Large_Text variant="REGULAR">
            {findCandidates2?.name ? findCandidates2?.name : "-"}
          </Large_Text>
        </div>
      </div>
    </main>
  );
}
