import { NextApiRequest } from "next";
import client from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const voteData = await client.vote_session.findUnique({
    where: { id: id as string },
    include: {
      vote_session_candidate: {
        select: {
          candidate: {
            select: {
              _count: {
                select: {
                  User_vote: {
                    where: { vote_session_id: id },
                  },
                },
              },
              img: true,
              kandidat_kelas: true,
              name: true,
              id: true,
              User_vote: {
                where: { vote_session_id: id },
                select: { user: { select: { role: true } } },
              },
              Vote_session_candidate: true,
            },
          },
        },
      },
    },
  });

  if (!voteData)
    return NextResponse.json(
      { status: 404, message: "Data not found" },
      { status: 404 },
    );

  const { vote_session_candidate, ...session } = voteData;

  const weightByRole: Record<Role, number> = {
    GURU: 0.6,
    OSIS: 0.8,
    MPK: 0.6,
    ADMIN: 0,
    SISWA: 0,
  };

  const totalVotes = vote_session_candidate.reduce(
  (acc, value) => acc + value.candidate._count.User_vote,
  0,
);

const totalWeightedVotes = vote_session_candidate.reduce((acc, value) => {
  const gukar = value.candidate.User_vote.filter((v) => v.user.role === "GURU").length;
  const mpk = value.candidate.User_vote.filter((v) => v.user.role === "MPK").length;
  const osis = value.candidate.User_vote.filter((v) => v.user.role === "OSIS").length;

  return (
    acc +
    gukar * weightByRole.GURU +
    mpk * weightByRole.MPK +
    osis * weightByRole.OSIS
  );
}, 0);

const candidates = vote_session_candidate.map(({ candidate }) => {
  const gukarCount = candidate.User_vote.filter((vote) => vote.user.role === "GURU").length ?? 0;
  const mpkCount = candidate.User_vote.filter((vote) => vote.user.role === "MPK").length ?? 0;
  const osisCount = candidate.User_vote.filter((vote) => vote.user.role === "OSIS").length ?? 0;

  const weightedByRole = {
    gukar: gukarCount * weightByRole.GURU,
    mpk: mpkCount * weightByRole.MPK,
    osis: osisCount * weightByRole.OSIS,
  };

  const weightedVotes = weightedByRole.gukar + weightedByRole.mpk + weightedByRole.osis;

  const percentage =
    totalVotes > 0 ? (candidate._count.User_vote / totalVotes) * 100 : 0;

  const weightedPercentage =
    totalWeightedVotes > 0 ? (weightedVotes / totalWeightedVotes) * 100 : 0;

  return {
    ...candidate,
    percentage: parseFloat(percentage.toFixed(2)),
    weightedPercentage: parseFloat(weightedPercentage.toFixed(2)),

    rawVotes: {
      gukar: gukarCount,
      mpk: mpkCount,
      osis: osisCount,
    },
    weightedVotesByRole: {
      gukar: parseFloat(weightedByRole.gukar.toFixed(2)),
      mpk: parseFloat(weightedByRole.mpk.toFixed(2)),
      osis: parseFloat(weightedByRole.osis.toFixed(2)),
    },
  };
});


  return NextResponse.json({ status: 200, data: { ...session, candidates } });
}

