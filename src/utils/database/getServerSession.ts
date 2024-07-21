"use server";

import { getServerSession } from "next-auth";
import { createUser, deleteUser, getUser, updateUser } from "./user.query";
import { revalidatePath } from "next/cache";
import { role } from "@prisma/client";
import client from "@/lib/prisma";
import {
  createCandidate,
  deleteCandidate,
  getCandidates,
  updateCandidate,
} from "./candidates.query";

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

export const deleteCandidatesById = async (id: string) => {
  try {
    const session = await getServerSession();
    if (session?.user?.role != "ADMIN") {
      return { error: true, message: "Unauthorized" };
    }
    const del = await deleteCandidate(id);
    if (!del) throw new Error("Delete Candidates failed");
    revalidatePath("/admin/candidates");
    return { message: "Success to Delete Candidates!", error: false };
  } catch (e) {
    console.error(e);
    return {
      message: "Failed to Delete Candidates",
      error: true,
    };
  }
};

export const updateCandidatesById = async (
  id: string | null,
  data: FormData,
) => {
  try {
    const candidate_id = data.get("id") as string;
    const name = data.get("name") as string;
    const img = data.get("img") as string;
    const kelas = data.get("kelas") as string;
    const visi = data.get("visi") as string;
    const misi = data.get("misi") as string;
    const pengalaman = data.get("pengalaman") as string;
    const motto = data.get("motto") as string;
    const progja = data.get("progja") as string;
    const video_profile = data.get("video_profile") as string;

    const findId = await getCandidates(candidate_id);
    if (findId && id == null) {
      const create = await createCandidate({
        img,
        misi,
        motto,
        name,
        pengalaman,
        progja,
        video_profile,
        visi,
        kelas,
        user: { connect: { id: candidate_id } },
      });
      if (!create) throw new Error("Create Candidate failed");
    } else if (id) {
      const findCandidatesById = await getCandidates(id);
      const update = await updateCandidate(id, {
        id: id ?? findCandidatesById?.id,
        img: img ?? findCandidatesById?.img,
        misi: misi ?? findCandidatesById?.misi,
        motto: motto ?? findCandidatesById?.motto,
        name: name ?? findCandidatesById?.name,
        pengalaman: pengalaman ?? findCandidatesById?.pengalaman,
        progja: progja ?? findCandidatesById?.progja,
        video_profile: video_profile ?? findCandidatesById?.video_profile,
        visi: visi ?? findCandidatesById?.visi,
        kelas: kelas ?? findCandidatesById?.kelas,
      });
      if (!update) throw new Error("Update Candidate failed");
    }
  } catch (error) {
    console.error((error as Error).message);
    return {
      message: "Failed to Update User",
      error: true,
    };
  }
};
