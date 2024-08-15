import { NextApiRequest } from "next";
import client from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { id: string } },
) {
  const data = await client.vote_session.findMany({
    select: { id: true, title: true },
  });
  return NextResponse.json({ status: 200, data: data });
}