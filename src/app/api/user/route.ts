import { NextResponse } from "next/server";
import {
  getAllUser,
  getAllUserAuth,
} from "../../..//utils/database/user.query";
export async function GET(req: Request) {
  const dataUser = await getAllUser();
  const dataUserAuth = await getAllUserAuth();
  return new NextResponse(JSON.stringify({ dataUser, dataUserAuth }), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
