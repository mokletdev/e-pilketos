import { NextApiRequest } from "next";
import client from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

  const weightByRole = {
    GURU: 0.3,
    OSIS: 0.4,
    MPK: 0.3,
    ADMIN: 0,
    SISWA: 0,
  };

  const totalVotes = vote_session_candidate.reduce(
    (acc, value) => acc + value.candidate._count.User_vote,
    0,
  );

  const candidates = vote_session_candidate.map(({ candidate }) => {
    const weightedVotes = candidate.User_vote.reduce((acc, vote) => {
      const role = vote.user.role;
      return acc + weightByRole[role];
    }, 0);

    const percentage = (candidate._count.User_vote / totalVotes) * 100;
    const weightedPercentage = (weightedVotes / totalVotes) * 100;

    return {
      ...candidate,
      percentage: percentage,
      weightedPercentage: weightedPercentage,
    };
  });

  return NextResponse.json({ status: 200, data: { ...session, candidates } });
}
