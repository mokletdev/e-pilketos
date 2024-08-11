// import { User_vote } from "@prisma/client";
// import { UserbyVoteSession } from "../../../utils/database/user.query";
// import { NextApiRequest, NextApiResponse } from "next";

import { nextGetServerSession } from "@/lib/AuthOptions";
import { getAllCandidates } from "@/utils/database/candidates.query";
import { NextRequest, NextResponse } from "next/server";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   if (req.method !== "GET") {
//     res.status(405).json({ message: "Method Not Allowed" });
//     return;
//   }

//   const { id_session } = req.body;
//   if (!id_session) {
//     res.status(400).json({ message: "id_session is required" });
//     return;
//   }

//   try {
//     const candidates = await UserbyVoteSession(id_session);
//     res.status(200).json(candidates);
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

// !biar bisa deploy

export async function GET(req: NextRequest) {
  const candidates = await getAllCandidates();
  return new NextResponse(JSON.stringify(candidates), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
