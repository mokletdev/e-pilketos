import React from "react";
import ProgessCard from "../../dashboard/_components/ProgessCard";
import { GetVoteSessionList } from "@/utils/database/voteSession.query";
import client from "@/lib/prisma";

export default async function DetailRecap({
  params,
}: {
  params: { id: string };
}) {
  const dataVoteSiswa = await client.user.findMany({
    where: {
      User_vote: { some: { vote_session_id: params.id } },
      OR: [{ role: "SISWA" }, { role: "MPK" }, { role: "OSIS" }],
    },
  });
  const dataVoteGuru = await client.user.findMany({
    where: {
      User_vote: { some: { vote_session_id: params.id } },
      role: "GURU",
    },
  });

  const dataGuru = await client.user.findMany({
    where: {
      role: "GURU",
    },
  });
  const dataSiswa = await client.user.findMany({
    where: {
      OR: [{ role: "SISWA" }, { role: "MPK" }, { role: "OSIS" }],
    },
  });

  const percentSiswa = Math.floor(
    (dataVoteSiswa.length / dataSiswa.length) * 100,
  );
  const percentGuru = Math.floor((dataVoteGuru.length / dataGuru.length) * 100);

  return (
    <>
      <div className="w-full bg-red-light-6 gap-x-[28px] flex flex-col xl:flex-row">
        <ProgessCard target="Siswa" percent={percentSiswa ? percentSiswa : 0}>
          Total Siswa : {dataSiswa.length}
          <br />
          Total Vote Siswa : {dataVoteSiswa.length}
        </ProgessCard>
        <ProgessCard target="Guru" percent={percentGuru ? percentGuru : 0}>
          Total Guru : {dataGuru.length}
          <br />
          Total Vote Guru : {dataVoteGuru.length}
        </ProgessCard>
      </div>
    </>
  );
}
