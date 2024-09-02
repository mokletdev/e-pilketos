"use server";

import { SheetsService } from "@/lib/google/sheetService";
import { getColumnLabel, shuffle } from "../atomics";
import client from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { DriveService } from "@/lib/google/driveService";
import GoogleClient from "@/lib/google/googleClient";
import { getVoteSessionById } from "../database/voteSession.query";
import { nextGetServerSession } from "@/lib/AuthOptions";

export const syncSpreadsheet = async (id: string) => {
  const sheetService = new SheetsService();

  const voteSession = await fetchVoteSessionWithVotes(id);
  if (!voteSession) return { success: false, message: "Not Found" };

  const { spreadsheetId, User_vote } = voteSession;
  if (!spreadsheetId) return { success: false, message: "Not Found" };

  const [userSheet, voteSheet] = prepareSheetData(User_vote);
  shuffle(userSheet);

  await syncDataToSheet(sheetService, spreadsheetId, "Vote Data", voteSheet);
  await syncDataToSheet(sheetService, spreadsheetId, "User Data", userSheet);

  return { success: true, message: "Success Sync Data" };
};

const fetchVoteSessionWithVotes = async (id: string) => {
  return client.vote_session.findUnique({
    where: { id },
    include: {
      User_vote: {
        select: {
          candidate: { select: { name: true } },
          user: {
            select: { kelas: true, role: true, name: true, email: true },
          },
          id: true,
          user_Id: true,
          timestamp: true,
        },
      },
    },
  });
};

const prepareSheetData = (
  User_vote: Prisma.User_voteGetPayload<{
    select: {
      candidate: { select: { name: true } };
      user: {
        select: { kelas: true; role: true; name: true; email: true };
      };
      id: true;
      user_Id: true;
      timestamp: true;
    };
  }>[],
) => {
  const userSheet: any[][] = [];
  const voteSheet: any[][] = [];

  let index = 1;
  for (const vote of User_vote) {
    const { user } = vote;
    const angkatanUser = getAngkatanFromEmail(user.email);

    const findUserOtherVote = User_vote.filter(
      (data) => data.user_Id === vote.user_Id,
    );

    const userInSheet = userSheet.findIndex((data) => data[5] === vote.user_Id);
    if (userInSheet !== -1) continue;

    userSheet.push([
      index,
      user.name,
      angkatanUser,
      user.kelas,
      user.role,
      vote.user_Id,
    ]);

    voteSheet.push([
      index,
      vote.timestamp.toLocaleString(),
      vote.id,
      user.role,
      angkatanUser,
      ...findUserOtherVote.map((i) => i.candidate.name),
    ]);

    index++;
  }

  return [userSheet, voteSheet];
};

const getAngkatanFromEmail = (email: string) => {
  return email.includes("student") ? email.split("_")[2].slice(0, 2) : "Guru";
};

const syncDataToSheet = async (
  sheetService: SheetsService,
  spreadsheetId: string,
  sheetName: string,
  data: any[],
) => {
  if (data.length === 0) return;

  const range = `${sheetName}!A2:${getColumnLabel(data[0].length)}`;
  await sheetService.clearSheet(spreadsheetId, range);
  await sheetService.updateSheet(spreadsheetId, range, data);
};

export const createSheet = async (id: string) => {
  try {
    const session = await nextGetServerSession();

    if (session?.user?.role !== "ADMIN") {
      return {
        success: false,
        message: "Akses tidak sah. Coba muat ulang halaman",
      };
    }

    const voteSession = await getVoteSessionById(id);

    if (!voteSession) {
      return {
        success: false,
        message: "Akses tidak sah. Coba muat ulang halaman",
      };
    }

    if (voteSession.spreadsheetId) {
      return {
        success: false,
        message: "Spreadsheet sudah ada. Coba muat ulang halaman",
      };
    }

    const googleClient = new GoogleClient();
    const driveService = new DriveService(googleClient);
    const sheetService = new SheetsService(googleClient);

    const spreadsheet = await driveService.createFile(
      `${voteSession.title} - PILKETOS`,
      "application/vnd.google-apps.spreadsheet",
      [process.env.GOOGLE_DRIVE_FOLDER_ID],
    );

    if (!spreadsheet.id) {
      throw new Error("Spreadsheet creation failed");
    }

    const spreadsheetId = spreadsheet.id;

    await Promise.all([
      sheetService.createPage(spreadsheetId, "Vote Data"),
      sheetService.createPage(spreadsheetId, "User Data"),
    ]);

    const [sheetVoteId, sheetUserId] = await Promise.all([
      sheetService.getSheetIdByName(spreadsheetId, "Vote Data"),
      sheetService.getSheetIdByName(spreadsheetId, "User Data"),
    ]);

    await sheetService.appendToSheet(
      spreadsheetId,
      `Vote Data!A1:${getColumnLabel(5 + voteSession.max_vote)}`,
      [
        [
          "No",
          "Timestamp",
          "Vote ID",
          "Role",
          "Angkatan",
          ...Array.from(
            { length: voteSession.max_vote },
            (_, i) => `Pilihan ${i + 1}`,
          ),
        ],
      ],
    );

    await sheetService.createSheetHeader(spreadsheetId, sheetVoteId || 0);

    await sheetService.appendToSheet(spreadsheetId, `User Data!A1:E1`, [
      ["No", "Name", "Angkatan", "Class Group", "Role", "User ID"],
    ]);

    await sheetService.createSheetHeader(spreadsheetId, sheetUserId || 0);

    await client.vote_session.update({
      where: { id: voteSession.id },
      data: { spreadsheetId: spreadsheet.id },
    });

    await syncSpreadsheet(voteSession.id);
    revalidatePath("/admin/votesesion");
    return {
      success: true,
      message: "Berhasil membuat spreadsheet",
      data: spreadsheet,
    };
  } catch (error) {
    console.error("Error in createSheet:", error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};
