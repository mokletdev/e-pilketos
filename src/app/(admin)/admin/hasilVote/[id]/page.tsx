"use client";
import React, { useEffect, useState } from "react";
import { Large_Text, H1, H5, H6 } from "@/app/components/general/Text";
import ChartDougnuts from "../_components/ChartDougnuts";
import { getDataAPIMany } from "@/utils/DataFetching/getData";
import clsx from "clsx";
import { color } from "../_components/color";
import { HasilProps } from "../_components/DataTypes";

export default function DetailHasilVote({
  params,
}: {
  params: { id: string };
}) {
  const [candidates, setCandidates] = useState<HasilProps[]>([]);

  useEffect(() => {
    async function GetDataCandidates() {
      const datas = await getDataAPIMany(`/api/votesession/${params.id}`);
      const res: HasilProps[] = datas.data.candidates || [];
      const mergedArray = res.map((candidate, index) => ({
        ...candidate,
        color: color[index]?.color,
      }));
      setCandidates(mergedArray);
    }
    GetDataCandidates();
  }, [params.id]);

  return (
    <>
      <section>
        <div className="max-w-full my-10 ">
          <H5 className="text-center">Hasil Voting 5 Kandidat</H5>

          <section className="max-w-4xl mx-auto">
            <ChartDougnuts id={params.id} />
            <div>
              {candidates.map((x, i) => (
                <div
                  key={i}
                  className="flex items-center gap-x-4 gap-y-2 mt-10"
                >
                  <div className={clsx("w-6 h-6 rounded-full", x.color)}></div>
                  <Large_Text variant="MEDIUM">
                    {x.name} : {Math.floor(x.percentage)}%{" "}
                  </Large_Text>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
