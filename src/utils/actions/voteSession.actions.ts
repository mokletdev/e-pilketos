"use server";

import { nextGetServerSession } from "@/lib/AuthOptions";
import client from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const submitAcess = async (formData: FormData) => {
  const session = await nextGetServerSession();

  if (session?.user?.role !== "ADMIN")
    return {
      success: false,
      message: "Akses tidak sah. Coba muat ulang halaman",
    };

  const users = formData.getAll("users") as string[];
  const voteSessionId = formData.get("voteSessionId") as string;

  await Promise.all(
    users.map((user) => {
      return client.vote_session_access.create({
        data: { user_Id: user, vote_session_id: voteSessionId },
      });
    }),
  );
  revalidatePath("/vote/");
  revalidatePath("/vote/[id]");
  revalidatePath("/admin/votesesion");
  revalidatePath("/admin/votesesion/[id]");
  return { success: true, message: "Sukses" };
};

export const deleteAcess = async (id: string) => {
  const session = await nextGetServerSession();

  if (session?.user?.role !== "ADMIN")
    return {
      success: false,
      message: "Akses tidak sah. Coba muat ulang halaman",
    };

  await client.vote_session_access.delete({
    where: { id },
  });

  revalidatePath("/vote/");
  revalidatePath("/vote/[id]");
  revalidatePath("/admin/votesesion");
  revalidatePath("/admin/votesesion/[id]");
  return { success: true, message: "Sukses" };
};
