"use server";
import { createUser, deleteUser, findUser, updateUser } from "./user.query";
import { revalidatePath } from "next/cache";
import { Prisma, Role } from "@prisma/client";
import client from "@/lib/prisma";
import {
  createCandidate,
  deleteCandidate,
  getCandidates,
  updateCandidate,
} from "./candidates.query";
import { hash } from "bcrypt";
import { nextGetServerSession } from "@/lib/AuthOptions";
import {
  createVoteSession,
  getVoteSession,
  UpdateVoteSession,
} from "./voteSession.query";
import { generatePassword } from "../generatePassword";
import { EmailService } from "@/lib/emailService";
import { newUserAccount } from "../emailTemplate";

export const deleteUserById = async (id: string) => {
  try {
    const session = await nextGetServerSession();
    if (session?.user?.role != "ADMIN") {
      return { error: true, message: "Unauthorized" };
    }
    const delUserAccess = await client.vote_session_access.deleteMany({
      where: { user_Id: id },
    });
    const delVote = await client.user_vote.deleteMany({
      where: { user_Id: id },
    });
    const del = await deleteUser(id);
    if (!delUserAccess) throw new Error("Delete failed");
    if (!delVote) throw new Error("Delete failed");
    if (!del) throw new Error("Delete failed");
    else {
      revalidatePath("/admin/users");
      revalidatePath("/admin/dashboard");
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
    const kelas = data.get("kelas") as string;
    const password = data.get("password") as string;
    const role = data.get("role") as Role;

    const findEmail = await client.user.findFirst({
      where: { email },
      include: { User_Auth: { select: { last_login: true } } },
    });

    if (!findEmail && id == null) {
      const userPassword = password || generatePassword();
      const hashedPassword = await hash(userPassword, 10);

      const create = await createUser({
        email: email,
        name: name,
        kelas: kelas,
        role: role,
        User_Auth: {
          create: {
            password: hashedPassword,
          },
        },
      });
      if (!create) throw new Error("Create failed");

      const emailService = new EmailService();
      await emailService
        .sendEmail({
          to: email,
          subject: "PILKETOS Moklet: New user account",
          html: newUserAccount(email, userPassword, name),
        })
        .catch(console.log);
    } else if (id) {
      const findUserById = await client.user.findFirst({
        where: { id },
        include: { User_Auth: { select: { last_login: true } } },
      });
      if (findUserById) {
        const hashedPassword = await hash(password, 10);
        const update = await updateUser(
          {
            id: id ?? findUserById.id,
          },
          {
            email: email ?? findUserById.email,
            name: name ?? findUserById.name,
            kelas: kelas ?? findUserById.kelas,
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
    revalidatePath("/admin/dashboard");
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
      revalidatePath("/vote");
      revalidatePath("/vote/[id]");

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
    const kelas = data.get("kandidat_kelas") as string | null;
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
        kandidat_kelas: kelas,
        user: { connect: { id: user?.id } },
      });
      if (!create) throw new Error("Create Candidate failed");

      revalidatePath("/admin/candidates");
      revalidatePath("/admin/votesesion");
      revalidatePath("/vote");
      revalidatePath("/vote/[id]");
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
        kandidat_kelas: kelas ?? existingCandidate?.kandidat_kelas,
      });
      if (!update) throw new Error("Update Candidate failed");

      revalidatePath("/admin/candidates");
      revalidatePath("/vote");
      revalidatePath("/admin/votesesion");
      revalidatePath("/vote/[id]");
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
    const candidates_id = data.getAll("candidate_id") as string[];
    const candidates_number = data.getAll("candidate_number") as string[];

    const vote_session_candidate = candidates_id.map((can, index) => ({
      candidate_id: can,
      candidates_number: parseInt(candidates_number[index]),
    }));

    const spreadId = await getVoteSession(id as string);

    if (id == null) {
      await createVoteSession({
        id: id ?? "",
        title: title,
        openedAt: start_time,
        closeAt: end_time,
        isPublic,
        max_vote,
        vote_session_candidate,
        spreadsheetId: (spreadId?.spreadsheetId as string) || "",
      });
    } else {
      await UpdateVoteSession(id, {
        id: id ?? "",
        title,
        openedAt: start_time,
        closeAt: end_time,
        isPublic,
        max_vote,
        vote_session_candidate,
        spreadsheetId: (spreadId?.spreadsheetId as string) || "",
      });
    }

    revalidatePath("/admin/votesesion");
    revalidatePath("/admin/candidates");
    revalidatePath("/vote");
    revalidatePath("/vote/[id]");
    revalidatePath("/api/votesession-list");
    revalidatePath("/api/votesession/[id]");
    revalidatePath("/admin/hasilVote");
    revalidatePath("/admin/liveCount");
    revalidatePath("/admin/liveCount/[id]", "page");
    revalidatePath("/LiveCount2Kandidat/[id]", "page");
    revalidatePath("/admin/recap");
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

export const deleteVoteSessionById = async (id: string) => {
  try {
    await client.vote_session_candidate.deleteMany({
      where: { vote_session_id: id },
    });
    await client.vote_session_access.deleteMany({
      where: { vote_session_id: id },
    });
    await client.user_vote.deleteMany({
      where: { vote_session_id: id },
    });
    await client.vote_session.delete({
      where: { id: id },
    });

    revalidatePath("/admin/votesesion");
    revalidatePath("/admin/candidates");
    revalidatePath("/vote");
    revalidatePath("/vote/[id]");
    revalidatePath("/api/votesession-list");
    revalidatePath("/api/votesession/[id]");
    revalidatePath("/admin/hasilVote");
    revalidatePath("/admin/liveCount");
    revalidatePath("/admin/liveCount/[id]", "page");
    revalidatePath("/LiveCount2Kandidat/[id]", "page");
    revalidatePath("/admin/recap");
    return { error: false, message: "Vote session deleted successfully" };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An error occurred while deleting the vote session",
    };
  }
};
