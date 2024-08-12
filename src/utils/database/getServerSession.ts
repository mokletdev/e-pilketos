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
import { generatePassword } from "../generatePassword";
import { EmailService } from "@/lib/emailService";
import { newUserAccount } from "../emailTemplate";
import CandidateCard from "@/app/(admin)/admin/liveCount/_components/CandidateCard";
import CandidatesTable from "@/app/(admin)/admin/candidates/_components/Table";

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

    if (!findEmail && id == null) {
      const userPassword = password || generatePassword();
      const hashedPassword = await hash(userPassword, 10);

      const create = await createUser({
        email: email,
        name: name,
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
    const candidates_id = data.getAll("candidate_id") as string[];
    const candidates_number = parseInt(
      data.get("candidate_number") as string,
      10,
    );

    const vote_session_candidatesd = candidates_id.map((can) => ({
      candidate_id: can,
      candidates_number: candidates_number,
    }));

    if (id == null) {
      await createVoteSession({
        id: id ?? "",
        title: title,
        openedAt: start_time,
        closeAt: end_time,
        isPublic,
        max_vote,
        vote_session_candidate: vote_session_candidatesd.map((X) => ({
          candidate_id: X.candidate_id,
          candidates_number: X.candidates_number,
        })),
      });
    } else {
      const findVoteSession = await client.vote_session.findUnique({
        where: { id: id },
        include: { vote_session_candidate: true },
      });
      const oldVoteSession = await client.vote_session_candidate.findMany({
        where: { vote_session_id: id },
      });
      console.log(findVoteSession);
      await UpdateVoteSession(id, {
        id: id ?? "",
        title,
        openedAt: start_time,
        closeAt: end_time,
        isPublic,
        max_vote,
        vote_session_candidate: vote_session_candidatesd.map((X) => ({
          candidate_id: X.candidate_id,
          candidates_number: X.candidates_number,
        })),
      });
      if (findVoteSession) {
        // const update = await client.vote_session.update({
        //   where: { id },
        //   data: {
        //     title: title ?? findVoteSession.title,
        //     openedAt: start_time ?? findVoteSession.openedAt,
        //     closeAt: end_time ?? findVoteSession.closeAt,
        //     isPublic: isPublic ?? findVoteSession.isPublic,
        //     max_vote: max_vote ?? findVoteSession.max_vote,
        //     vote_session_candidate: {
        //       disconnect: oldVoteSession.map((voteSession) => ({
        //         id: voteSession.id,
        //       })),
        //       create: {
        //         candidate_id: ,
        //         candidates_number: vote_session_candidatesd.map(
        //           (x) => x.candidates_number,
        //         ),
        //       },
        //     },
        //   },
        // });
      }
      console.log(candidates_id);
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

export const deleteVoteSessionById = async (id: string) => {
  try {
    const del = await client.vote_session.delete({ where: { id: id } });
    if (!del) return { error: true, message: "Failed to Delete Vote Session" };
    else return { error: false, message: "Vote session deleted successfully" };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An error occurred while deleting the vote session",
    };
  }
};
