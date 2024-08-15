import { NextApiRequest } from "next";
import client from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest,
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

  const totalVotes = vote_session_candidate.reduce(
    (acc, value) => acc + value.candidate._count.User_vote,
    0,
  );
  const candidates = vote_session_candidate.map(({ candidate }) => ({
    ...candidate,
    percentage: (candidate._count.User_vote / totalVotes) * 100,
  }));

  return NextResponse.json({ status: 200, data: { ...session, candidates } });
}
