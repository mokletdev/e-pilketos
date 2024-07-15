"use server";

import { getServerSession } from "next-auth";
import { createUser, deleteUser, getUser, updateUser } from "./user.query";
import { revalidatePath } from "next/cache";
import { role } from "@prisma/client";
import client from "@/lib/prisma";

export const deleteUserById = async (id: string) => {
  try {
    const session = await getServerSession();
    if (session?.user?.role != "ADMIN") {
      return { error: true, message: "Unauthorized" };
    }
    const del = await deleteUser(id);
    if (!del) throw new Error("Delete failed");

    revalidatePath("/admin/users");
    return { message: "Success to Delete!", error: false };
  } catch (e) {
    console.error(e);
    return {
      message: "Failed to Delete",
      error: true,
    };
  }
};

export const updateUserById = async (id: string | null, data: FormData) => {
  try {
    const email = data.get("email") as string;
    const name = data.get("name") as string;
    const password = data.get("password") as string;
    const role = data.get("role") as role;

    const findEmail = await client.user.findUnique({ where: { email } });

    if (!findEmail && id == null) {
      const create = await createUser({
        email,
        name,
        role,
        User_Auth: {
          create: {
            password: password,
            last_login: new Date(),
          },
        },
      });
      if (!create) throw new Error("Create failed");
    } else if (id) {
      const findUserById = await getUser(id);
      if (findUserById) {
        const update = await updateUser(
          {
            id: id ?? findUserById.id,
          },
          {
            email: email ?? findUserById.email,
            name: name ?? findUserById.name,
            role: role ?? findUserById.role,
            User_Auth: {
              create: {
                password: password,
                last_login: new Date(),
              },
            },
          },
        );
        if (!update) throw new Error("Update failed");
      } else throw new Error("User not found");
    }
    revalidatePath("/admin/users");
    return { message: "Success to update Users", error: false };
  } catch (error) {
    console.error((error as Error).message);
    return {
      message: "Failed to Update User",
      error: true,
    };
  }
};
