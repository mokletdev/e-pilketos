import { NextRequest, NextResponse } from "next/server";
import {
  getAllCandidates,
  getAllCandidatesByVoteSession,
} from "@/utils/database/candidates.query";
import { nextGetServerSession } from "@/lib/AuthOptions";

// !biar bisa deploy

export async function GET(req: Request) {
  const user = await nextGetServerSession();
  const { id_session } = await req.json();
  if (!id_session) {
    return new NextResponse(
      JSON.stringify({ message: "id_session is required" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      },
    );
  }

  try {
    const candidates = await getAllCandidatesByVoteSession(id_session);
    return new NextResponse(JSON.stringify(candidates), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      },
    );
  }
}
