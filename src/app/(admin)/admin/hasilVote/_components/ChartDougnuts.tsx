"use client";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getDataAPIMany } from "@/utils/DataFetching/getData";
import { color } from "./color";
interface HasilProps {
  color?: string;
  percentage: string;
  _count: { User_vote: number };
  name: string;
}

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartDougnuts({ id }: { id: string }) {
  const [candidates, setCandidates] = useState<HasilProps[]>([]);

  useEffect(() => {
    async function GetDataCandidates() {
      const datas = await getDataAPIMany(`/api/votesession/${id}`);
      const res: HasilProps[] = datas?.data.candidates || [];
      const mergedArray = res.map((candidate, index) => ({
        ...candidate,
        color: color[index]?.color,
      }));
      setCandidates(mergedArray);
    }
    GetDataCandidates();
  }, [id]);
  console.log(candidates);

  const candidates_name = candidates.filter((candidate) => candidate.name);
  const candidates_count = candidates.filter((candidate) => candidate._count);

  const data = {
    labels: candidates_name.map((x) => x.name),
    datasets: [
      {
        label: "Hasil Vote",
        data: candidates_count.map((x) => x._count.User_vote),
        backgroundColor: [
          "rgba(245, 66, 66)",
          "rgba(255, 198, 74)",
          "rgba(149, 255, 74)",
          "rgba(74, 255, 234)",
          "rgba(89, 74, 255)",
          "rgba(255, 74, 234)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut className="w-full" data={data} />;
}
