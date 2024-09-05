import client from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await client.vote_session.findMany({
    select: { id: true, title: true, max_vote: true },
  });
  return NextResponse.json({ status: 200, data: data });
}
