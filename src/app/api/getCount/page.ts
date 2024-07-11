import { User_vote } from "@prisma/client";
import { getAllCandidatesByVoteSession } from "../../../utils/database/candidates.query";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { id_session } = req.body;
  if (!id_session) {
    res.status(400).json({ message: "id_session is required" });
    return;
  }

  try {
    const candidates = await getAllCandidatesByVoteSession(id_session);
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
