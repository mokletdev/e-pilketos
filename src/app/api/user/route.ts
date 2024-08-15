import { NextResponse } from "next/server";
import {
  createUser,
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

// export async function POST(req: Request) {
//   const { email, name, kelas, password } = await req.json();
//   const createUsers = await createUser({
//     email,
//     name,
//     kelas,
//     User_Auth: { create: { password } },
//   });
//   if (!createUsers) {
//     return NextResponse.json({ message: "Failed To Create" }, { status: 400 });
//   } else {
//     return NextResponse.json({ message: "Success to Create" }, { status: 200 });
//   }
// }
