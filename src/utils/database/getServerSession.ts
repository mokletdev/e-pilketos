"use server";

import { getServerSession, Session } from "next-auth";
import {
  createUser,
  deleteUser,
  findUser,
  getAllUser,
  getUser,
  updateUser,
  userLastLoginPayload,
} from "./user.query";
import { revalidatePath } from "next/cache";
import { Role } from "@prisma/client";
import client from "@/lib/prisma";
import {
  createCandidate,
  deleteCandidate,
  getCandidates,
  updateCandidate,
} from "./candidates.query";
import { hash } from "bcrypt";
import { nextGetServerSession } from "@/lib/AuthOptions";

export const deleteUserById = async (id: string) => {
  try {
    const session = await nextGetServerSession();
    if (session?.user?.role != "ADMIN") {
      return { error: true, message: "Unauthorized" };
    }
    const del = await deleteUser(id);
    if (!del) throw new Error("Delete failed");
    else {
      revalidatePath("/admin/users");
      return { message: "Success to Delete!", error: false };
    }
  } catch (e) {
    console.error((e as Error).message);
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
    const role = data.get("role") as Role;

    const findEmail = await client.user.findFirst({
      where: { email },
      include: { User_Auth: { select: { last_login: true } } },
    });

    const hashedPassword = await hash(password, 10);

    if (!findEmail && id == null) {
      const create = await createUser({
        email: email,
        name: name,
        role: role,
        User_Auth: {
          create: {
            password: password ? hashedPassword : undefined,
          },
        },
      });
      if (!create) throw new Error("Create failed");
    } else if (id) {
      const findUserById = await client.user.findFirst({
        where: { id },
        include: { User_Auth: { select: { last_login: true } } },
      });
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
              update: { password: password ? hashedPassword : undefined },
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
    const session = await nextGetServerSession();
    if (session?.user?.role !== "ADMIN") {
      return { error: true, message: "Unauthorized" };
    } else {
      const del = await deleteCandidate(id);
      if (!del) throw new Error("Delete Candidates failed");
      revalidatePath("/admin/candidates");
      return { message: "Success to Delete Candidates!", error: false };
    }
  } catch (e) {
    console.error(e);
    return {
      message: "Failed to Delete Candidates",
      error: true,
    };
  }
};

export const updateCandidatesById = async (
  candidate_id: string,
  data: FormData,
) => {
  try {
    const name = data.get("candidatesName") as string;
    const img = data.get("img") as string;
    const kelas = data.get("kelas") as string;
    const visi = data.get("visi") as string;
    const misi = data.get("misi") as string;
    const pengalaman = JSON.parse(
      (data.get("pengalaman") as string) || "[]",
    ) as string[];
    const motto = data.get("motto") as string;
    const progja = data.get("progja") as string;
    const video_profile = data.get("video_profile") as string;

    // Check if candidate exists
    const findCandidatesById = await getCandidates(candidate_id);
    const user = await findUser({ id: candidate_id });

    // if (!user) {
    //   throw new Error("User not found");
    // }

    if (!findCandidatesById) {
      const create = await createCandidate({
        img,
        misi,
        motto,
        name,
        pengalaman: {
          create: pengalaman.map((desc) => ({ desc })),
        },
        progja,
        video_profile,
        visi,
        kelas,
        user: { connect: { id: user?.id } },
      });
      if (!create) throw new Error("Create Candidate failed");
      revalidatePath("/admin/candidates");
      return { message: "Success to Create Candidate!", error: false };
    } else {
      const pengalamanToDisconnect =
        findCandidatesById.pengalaman.filter(
          (existingPengalaman) => !pengalaman.includes(existingPengalaman.desc),
        ) || [];

      const update = await updateCandidate(candidate_id, {
        img: img ?? findCandidatesById.img,
        misi: misi ?? findCandidatesById.misi,
        motto: motto ?? findCandidatesById.motto,
        name: name ?? findCandidatesById.name,
        pengalaman: {
          connectOrCreate: pengalaman.map((desc) => ({
            where: {
              id: findCandidatesById.pengalaman.find((p) => p.desc === desc)
                ?.id,
            },
            create: {
              desc,
              candidatesId: candidate_id,
            },
          })),
          disconnect: pengalamanToDisconnect.map((pengalaman) => ({
            id: pengalaman.id,
          })),
        },
        progja: progja ?? findCandidatesById.progja,
        video_profile: video_profile ?? findCandidatesById.video_profile,
        visi: visi ?? findCandidatesById.visi,
        kelas: kelas ?? findCandidatesById.kelas,
      });
      if (!update) throw new Error("Update Candidate failed");
      revalidatePath("/admin/candidates");
      return { message: "Success to Update Candidate!", error: false };
    }
  } catch (error) {
    console.error((error as Error).message);
    return {
      message: "Failed to Update Candidate",
      error: true,
    };
  }
};
