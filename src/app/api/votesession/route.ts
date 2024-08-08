import { getAllVoteSession } from "@/utils/database/voteSession.query";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const data = await getAllVoteSession();
  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
