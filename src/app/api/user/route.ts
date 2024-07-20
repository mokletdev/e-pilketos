import { NextResponse } from "next/server";
import { getAllUser } from "../../..//utils/database/user.query";
export async function GET(req: Request) {
  const dataUser = await getAllUser();
  return new NextResponse(JSON.stringify(dataUser), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
