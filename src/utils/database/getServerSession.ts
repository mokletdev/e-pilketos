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
      revalidatePath("/admin", "layout");
      revalidatePath("/admin/*", "page");
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
    revalidatePath("/admin", "layout");
    revalidatePath("/admin/*", "page");
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

      revalidatePath("/admin", "layout");
      revalidatePath("/admin/*", "page");
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

    // Handle image upload
    // let imgUrl = existingCandidate?.img || "";
    // const imageFile = data.get("imageFile") as File;

    // if (imageFile && imageFile.size > 0) {
    //   // Upload image to uploader API
    //   const uploadFormData = new FormData();
    //   uploadFormData.append("file", imageFile);

    //   const uploadResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/uploader`, {
    //     method: "POST",
    //     body: uploadFormData,
    //   });

    //   if (!uploadResponse.ok) {
    //     throw new Error("Failed to upload image");
    //   }

    //   const uploadResult = await uploadResponse.json();
    //   if (uploadResult.error) {
    //     throw new Error(uploadResult.message || "Upload failed");
    //   }

    //   imgUrl = uploadResult.url;
    // }

    // // For new candidates, ensure we have an image URL
    // if (!id && !imgUrl) {
    //   throw new Error("Image is required for new candidates");
    // }

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

      revalidatePath("/admin", "layout");
      revalidatePath("/admin/*", "page");
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

      revalidatePath("/admin", "layout");
      revalidatePath("/admin/*", "page");
      revalidatePath("/vote");
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

    // Get all candidate data using getAll() since they have the same name
    const candidates_id = data.getAll("candidate_id") as string[];
    const candidates_number = data.getAll("candidate_number") as string[];

    console.log("Candidates ID:", candidates_id);
    console.log("Candidates Numbers:", candidates_number);

    // Extract topik data from FormData
    const topikData: { [candidateIndex: number]: any[] } = {};

    // Parse all form data to extract topik information
    for (const [key, value] of data.entries()) {
      // Match patterns like "topik_0_0_situasi", "topik_0_0_pertanyaan", etc.
      const topikMatch = key.match(/^topik_(\d+)_(\d+)_(\w+)$/);
      if (topikMatch) {
        const candidateIndex = parseInt(topikMatch[1]);
        const topikIndex = parseInt(topikMatch[2]);
        const field = topikMatch[3];

        if (!topikData[candidateIndex]) {
          topikData[candidateIndex] = [];
        }
        if (!topikData[candidateIndex][topikIndex]) {
          topikData[candidateIndex][topikIndex] = { tanggapan: [] };
        }

        topikData[candidateIndex][topikIndex][field] = value as string;
      }

      // Match patterns like "tanggapan_0_0_0_pertanyaan", "tanggapan_0_0_0_tanggapan"
      const tanggapanMatch = key.match(/^tanggapan_(\d+)_(\d+)_(\d+)_(\w+)$/);
      if (tanggapanMatch) {
        const candidateIndex = parseInt(tanggapanMatch[1]);
        const topikIndex = parseInt(tanggapanMatch[2]);
        const tanggapanIndex = parseInt(tanggapanMatch[3]);
        const field = tanggapanMatch[4];

        if (!topikData[candidateIndex]) {
          topikData[candidateIndex] = [];
        }
        if (!topikData[candidateIndex][topikIndex]) {
          topikData[candidateIndex][topikIndex] = { tanggapan: [] };
        }
        if (!topikData[candidateIndex][topikIndex].tanggapan[tanggapanIndex]) {
          topikData[candidateIndex][topikIndex].tanggapan[tanggapanIndex] = {};
        }

        topikData[candidateIndex][topikIndex].tanggapan[tanggapanIndex][field] =
          value as string;
      }
    }

    // Validate that we have matching arrays
    if (candidates_id.length !== candidates_number.length) {
      return {
        error: true,
        message: "Mismatch between candidate IDs and numbers",
      };
    }

    // Filter out empty candidate IDs
    const validCandidates = candidates_id
      .map((id, index) => ({ id, number: candidates_number[index], index }))
      .filter((candidate) => candidate.id && candidate.id.trim() !== "");

    const vote_session_candidate = validCandidates.map((candidate) => {
      const candidateIndex = candidate.index;

      // Type annotation for topikArray
      let topikArray: Array<{
        situasi: string;
        pertanyaan: string;
        jawaban: string;
        tanggapan: Array<{
          pertanyaan: string;
          tanggapan: string;
        }>;
      }> = [];

      // Add topik data if exists for this candidate
      if (topikData[candidateIndex] && topikData[candidateIndex].length > 0) {
        topikArray = topikData[candidateIndex].filter(Boolean).map((topik) => ({
          situasi: topik.situasi || "",
          pertanyaan: topik.pertanyaan || "",
          jawaban: topik.jawaban || "",
          tanggapan: (topik.tanggapan || [])
            .filter(Boolean)
            .map((tanggapan: any) => ({
              pertanyaan: tanggapan.pertanyaan || "",
              tanggapan: tanggapan.tanggapan || "",
            })),
        }));
      }

      return {
        candidate_id: candidate.id,
        candidates_number: parseInt(candidate.number),
        topik: topikArray,
      };
    });

    console.log(
      "Vote session candidates:",
      JSON.stringify(vote_session_candidate, null, 2),
    );

    // Validate that we have at least one candidate
    if (vote_session_candidate.length === 0) {
      return { error: true, message: "At least one candidate is required" };
    }

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

    revalidatePath("/admin", "layout");
    revalidatePath("/admin/*", "page");
    revalidatePath("/api", "layout");
    revalidatePath("/api/*", "page");
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
    await client.$transaction(async (tx) => {
      // Get all vote_session_candidate IDs first
      const candidateIds = await tx.vote_session_candidate.findMany({
        where: { vote_session_id: id },
        select: { id: true },
      });

      if (candidateIds.length > 0) {
        const candidateIdList = candidateIds.map((c) => c.id);

        // Get all topik_vote IDs
        const topikIds = await tx.topik_vote.findMany({
          where: { vote_session_candidate_id: { in: candidateIdList } },
          select: { id: true },
        });

        if (topikIds.length > 0) {
          const topikIdList = topikIds.map((t) => t.id);

          // 1. Delete all tanggapan records first
          await tx.tanggapan.deleteMany({
            where: { topik_vote_id: { in: topikIdList } },
          });
        }

        // 2. Delete all topik_vote records
        await tx.topik_vote.deleteMany({
          where: { vote_session_candidate_id: { in: candidateIdList } },
        });

        // 3. Delete vote_session_candidate records
        await tx.vote_session_candidate.deleteMany({
          where: { vote_session_id: id },
        });
      }

      // 4. Delete other related records
      await tx.vote_session_access.deleteMany({
        where: { vote_session_id: id },
      });
      await tx.user_vote.deleteMany({
        where: { vote_session_id: id },
      });

      // 5. Finally delete the vote_session itself
      await tx.vote_session.delete({
        where: { id: id },
      });
    });

    revalidatePath("/admin", "layout");
    revalidatePath("/admin/*", "page");
    revalidatePath("/api", "layout");
    revalidatePath("/api/*", "page");
    return { error: false, message: "Vote session deleted successfully" };
  } catch (error) {
    console.error("deleteVoteSessionById Error:", error);
    return {
      error: true,
      message: "An error occurred while deleting the vote session",
    };
  }
};
