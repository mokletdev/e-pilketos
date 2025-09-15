import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/prisma";
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
              _count: { select: { User_vote: true } },
              img: true,
              kandidat_kelas: true,
              name: true,
              id: true,
              User_vote: {
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
    GURU: 0.3,
    OSIS: 0.4,
    MPK: 0.3,
    ADMIN: 0,
    SISWA: 0,
  };

  // hitung total vote normal
  const totalVotes = vote_session_candidate.reduce(
    (acc, value) => acc + value.candidate._count.User_vote,
    0,
  );

  // hitung weightedVotes per kandidat
  const candidateResults = vote_session_candidate.map(({ candidate }) => {
    // normal percentage
    const percentage =
      totalVotes > 0 ? (candidate._count.User_vote / totalVotes) * 100 : 0;

    // weighted calculation hanya berlaku kalau kandidat = 5
    let weightedVotes = 0;
    if (vote_session_candidate.length === 5) {
      // kelompokkan votes per role
      const roleCount: Record<string, number> = {};
      candidate.User_vote.forEach((vote) => {
        const role = vote.user.role;
        roleCount[role] = (roleCount[role] || 0) + 1;
      });

      // kalikan dengan bobot
      Object.entries(roleCount).forEach(([role, count]) => {
        weightedVotes += count * (weightByRole[role as Role] || 0);
      });
    }

    return {
      ...candidate,
      percentage,
      weightedVotes,
    };
  });

  // hitung weightedPercentage dari total weightedVotes
  const totalWeightedVotes = candidateResults.reduce(
    (acc, c) => acc + c.weightedVotes,
    0,
  );

  const candidates = candidateResults.map((c) => ({
    ...c,
    weightedPercentage:
      totalWeightedVotes > 0 ? (c.weightedVotes / totalWeightedVotes) * 100 : 0,
  }));

  return NextResponse.json({ status: 200, data: { ...session, candidates } });
}
