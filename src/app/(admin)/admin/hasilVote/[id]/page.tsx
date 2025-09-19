"use client";
import React, { useEffect, useState } from "react";
import { H5 } from "@/app/components/general/Text";
import ChartDougnuts from "../_components/ChartDougnuts";
import { getDataAPIMany } from "@/utils/DataFetching/getData";
import { color } from "../_components/color";
import { HasilProps } from "../_components/DataTypes";

export default function DetailHasilVote({
  params,
}: {
  params: { id: string };
}) {
  const [candidates, setCandidates] = useState<HasilProps[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    async function GetDataCandidates() {
      try {
        const datas = await getDataAPIMany(`/api/votesession/${params.id}`);
        console.log("API Response:", datas);

        const res: HasilProps[] = datas.data.candidates || [];

        // tambah warna untuk chart
        const mergedArray = res.map((candidate, index) => ({
          ...candidate,
          color: color[index]?.color,
        }));
        setCandidates(mergedArray);

        // proses data table
        const processedTableData = res.map((candidate) => {
          const gukarCount = candidate.rawVotes?.gukar || 0;
          const mpkCount = candidate.rawVotes?.mpk || 0;
          const osisCount = candidate.rawVotes?.osis || 0;
          const gukarPercent = candidate.weightedVotesByRole?.gukar || 0;
          const mpkPercent = candidate.weightedVotesByRole?.mpk || 0;
          const osisPercent = candidate.weightedVotesByRole?.osis || 0;

          return {
            name: candidate.name,
            gukar: gukarCount,
            mpk: mpkCount,
            osis: osisCount,
            percentGukar: gukarPercent,
            percentMPK: mpkPercent,
            percentOSIS: osisPercent,
            totalVotes: gukarCount + mpkCount + osisCount, // tambah total votes mentah
            weightedPercentage: parseFloat(
              candidate.weightedPercentage.toFixed(2),
            ),
            rank: 0,
          };
        });

        // sort berdasarkan total votes mentah (bukan weighted percentage)
        processedTableData.sort((a, b) => b.totalVotes - a.totalVotes);

        // assign rank berdasarkan total votes
        processedTableData.forEach((item, index) => {
          item.rank = index + 1;
        });

        setTableData(processedTableData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    GetDataCandidates();
  }, [params.id]);

  // hitung totals untuk raw votes
  const totals = tableData.reduce(
    (acc, row) => ({
      gukar: acc.gukar + row.gukar,
      mpk: acc.mpk + row.mpk,
      osis: acc.osis + row.osis,
      totalVotes: acc.totalVotes + row.totalVotes,
    }),
    { gukar: 0, mpk: 0, osis: 0, totalVotes: 0 },
  );

  // hitung totals untuk weighted percentages
  const weightedTotals = tableData.reduce(
    (acc, row) => ({
      percentGukar: acc.percentGukar + row.percentGukar,
      percentMPK: acc.percentMPK + row.percentMPK,
      percentOSIS: acc.percentOSIS + row.percentOSIS,
      totalWeightedPercentage:
        acc.totalWeightedPercentage + row.weightedPercentage,
    }),
    {
      percentGukar: 0,
      percentMPK: 0,
      percentOSIS: 0,
      totalWeightedPercentage: 0,
    },
  );

  return (
    <section>
      <div className="max-w-full my-10">
        <H5 className="text-center">Hasil Voting 5 Kandidat</H5>

        <section className="max-w-4xl mx-auto">
          <ChartDougnuts id={params.id} />

          {/* Results Table */}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Nama
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Gukar
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    MPK
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    OSIS
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    60% Gukar
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    60% MPK
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    80% OSIS
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Total Votes
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Jumlah (%)
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Peringkat
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-green-100" : "bg-white"}
                  >
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      {row.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {row.gukar}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {row.mpk}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {row.osis}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {row.percentGukar.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {row.percentMPK.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {row.percentOSIS.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center bg-blue-100 font-semibold">
                      {row.totalVotes}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center bg-yellow-100 font-semibold">
                      {row.weightedPercentage}%
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                      {row.rank}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-yellow-200 font-semibold">
                  <td className="border border-gray-300 px-4 py-2">Total</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {totals.gukar}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {totals.mpk}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {totals.osis}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center bg-red-200">
                    {weightedTotals.percentGukar.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center bg-red-200">
                    {weightedTotals.percentMPK.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center bg-red-200">
                    {weightedTotals.percentOSIS.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center bg-blue-200 font-bold">
                    {totals.totalVotes}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center bg-red-200">
                    {weightedTotals.totalWeightedPercentage.toFixed(2)}%
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </div>
    </section>
  );
}
