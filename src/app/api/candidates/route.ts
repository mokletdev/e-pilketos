import { NextResponse } from "next/server";
import { getAllCandidates } from "@/utils/database/candidates.query";
export async function GET(req: Request) {
  const dataCandidates = await getAllCandidates();
  return new NextResponse(JSON.stringify(dataCandidates), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
