"use server";
import { createUser, deleteUser, findUser, updateUser } from "./user.query";
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
import { createVoteSession, UpdateVoteSession } from "./voteSession.query";
import { title } from "process";

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

export const updateCandidatesById = async (id: string, data: FormData) => {
  try {
    const name = data.get("candidatesName") as string;
    const img = data.get("img") as string;
    const kelas = data.get("kelas") as string | null;
    const visi = data.get("visi") as string;
    const misi = data.get("misi") as string;
    const pengalaman = JSON.parse(data.get("pengalaman") as string) as {
      desc: string;
    }[];
    const motto = data.get("motto") as string;
    const progja = data.get("progja") as string;
    const video_profile = data.get("video_profile") as string | null;

    const existingCandidate = await getCandidates(id);

    const session = await nextGetServerSession();
    const userId = session?.user?.id;
    const user = await findUser({ id: userId?.toString() });

    if (!id) {
      const create = await createCandidate({
        img,
        misi,
        motto,
        name,
        pengalaman: {
          create: pengalaman,
        },
        progja,
        video_profile,
        visi,
        kelas,
        user: { connect: { id: user?.id } },
      });
      if (!create) throw new Error("Create Candidate failed");

      revalidatePath("/admin/candidates");
      return {
        message: "Success to Create Candidate!",
        error: false,
        data: create,
      };
    } else {
      const pengalamanToDisconnect = existingCandidate?.pengalaman;

      const pengalamanToConnectOrCreate = pengalaman.map((p) => ({
        desc: p.desc,
      }));
      // .map((p) => {
      //   const existingPengalaman = existingCandidate?.pengalaman;
      //   return {
      //     where: { id: existingPengalaman ? existingPengalaman : "" },
      //     create: { desc: p.desc, candidatesId: id },
      //   };
      // })
      // .filter((item) => item.where.id !== "");

      const update = await updateCandidate(id, {
        img: img ?? existingCandidate?.img,
        misi: misi ?? existingCandidate?.misi,
        motto: motto ?? existingCandidate?.motto,
        name: name ?? existingCandidate?.name,
        pengalaman: {
          create: pengalamanToConnectOrCreate,
          disconnect: pengalamanToDisconnect?.map((p) => ({ id: p.id })),
        },
        progja: progja ?? existingCandidate?.progja,
        video_profile: video_profile ?? existingCandidate?.video_profile,
        visi: visi ?? existingCandidate?.visi,
        kelas: kelas ?? existingCandidate?.kelas,
      });
      if (!update) throw new Error("Update Candidate failed");

      revalidatePath("/admin/candidates");
      return { message: "Success to Update Candidate!", error: false };
    }
  } catch (error) {
    console.error("Error updating candidate:", (error as Error).message);
    return {
      message: "Failed to Update Candidate",
      error: true,
    };
  }
};

export const upsertVoteSession = async (id: string | null, data: FormData) => {
  try {
    const session = await nextGetServerSession();
    if (!session?.user?.role.includes("ADMIN"))
      return { error: true, message: "Unauthorized" };

    const title = data.get("title") as string;
    const start_time = new Date(data.get("start_time") as string);
    const end_time = new Date(data.get("end_time") as string);
    const isPublic = data.get("is_active") === "true";
    const max_vote = parseInt(data.get("max_vote") as string, 10);
    const candidates_number = data.get("candidates_number");

    const findVoteSessionCandidatesId =
      await client.vote_session_candidate.findFirst();

    if (id == null) {
      await createVoteSession({
        id: id ?? "",
        title: title,
        openedAt: start_time,
        closeAt: end_time,
        isPublic,
        max_vote,
        Vote_session_candidate: { candidate_id},
      });
    } else {
      await UpdateVoteSession(id, {
        id: id ?? "",
        title,
        openedAt: start_time,
        closeAt: end_time,
        isPublic,
        max_vote,
        Vote_session_candidate: {
          candidate_id,
        },
      });
    }

    revalidatePath("/admin/votesesion");
    return { message: "Vote session saved successfully!", error: false };
  } catch (e) {
    console.error(e);
    const error = (e as Error).message;
    console.log(error);

    return {
      message: "Failed to save vote session",
      error: true,
    };
  }
};
