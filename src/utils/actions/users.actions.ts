"use server";

import readXlsxFile from "read-excel-file/node";
import { nextGetServerSession } from "@/lib/AuthOptions";
import {
  createUser,
  deleteUsers,
  findUser,
  updateUser,
} from "../database/user.query";
import { hash } from "bcrypt";
import { generatePassword } from "../generatePassword";
import { EmailService } from "@/lib/emailService";
import { newUserAccount } from "../emailTemplate";
import { revalidatePath } from "next/cache";

const usersExcelSchema = {
  Email: {
    prop: "email",
    type: String,
    required: true,
  },
  Name: {
    prop: "name",
    type: String,
    required: true,
  },
  Role: {
    prop: "role",
    type: String,
    oneOf: ["SISWA", "GURU", "ADMIN"],
  },
  Password: {
    prop: "password",
    type: String,
    oneOf: ["SISWA", "GURU", "ADMIN"],
  },
};

interface UsersExcelSchema {
  email: string;
  name: string;
  role: "SISWA" | "GURU" | "ADMIN";
  password: string;
}

export async function bulkAddUsers(data: FormData) {
  try {
    const session = await nextGetServerSession();
    if (session?.user?.role !== "ADMIN") {
      return { error: true, message: "Unauthorized" };
    }

    const file = data.get("file") as File;
    if (!file) {
      return { error: true, message: "File is required" };
    }

    if (
      file.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return { error: true, message: `File type ${file.type} is not allowed` };
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const { rows: excelRows, errors } = await readXlsxFile(fileBuffer, {
      schema: usersExcelSchema,
    });

    if (errors.length !== 0) {
      console.error("Excel parsing errors:", errors);
      return {
        error: true,
        message: "Error while parsing Excel, please check again",
        errors,
      };
    }

    const failedToCreate: string[] = [];
    const emailService = new EmailService();

    await Promise.all(
      (excelRows as UsersExcelSchema[]).map(async (row) => {
        const { email, name, role, password } = row;

        const userPassword = password || generatePassword();
        const hashedPassword = await hash(userPassword, 10);

        try {
          const existingUser = await findUser({ email });

          if (existingUser) {
            const update = await updateUser(
              { email },
              {
                name,
                role: role || email.includes("student.") ? "SISWA" : "GURU",
                User_Auth: {
                  connectOrCreate: {
                    create: { password: hashedPassword },
                    where: { user_Id: existingUser.id },
                  },
                },
              },
            );
            if (!update) failedToCreate.push(email);
          } else {
            const create = await createUser({
              email,
              name,
              role: role || email.includes("student.") ? "SISWA" : "GURU",
              User_Auth: { create: { password: hashedPassword } },
            });

            if (!create) failedToCreate.push(email);
          }

          await emailService.sendEmail({
            to: email,
            subject: "PILKETOS Moklet: New user account",
            html: newUserAccount(email, userPassword, name),
          });
        } catch (err) {
          console.error(`Failed to process user ${email}:`, err);
          failedToCreate.push(email);
        }
      }),
    );

    revalidatePath("/admin/users");
    revalidatePath("/admin/recap/[id]", "page");
    return {
      error: false,
      message: `Successfully created ${
        excelRows.length - failedToCreate.length
      } accounts. Failed to create ${failedToCreate.length} accounts`,
      errors: { failedToCreate },
    };
  } catch (err) {
    console.error("Bulk add users failed:", err);
    return { error: true, message: "Internal Server Error" };
  }
}

export async function bulkDeleteUsers(idUsers: string[]) {
  try {
    const session = await nextGetServerSession();
    if (session?.user?.role !== "ADMIN") {
      return { error: true, message: "Unauthorized" };
    }

    const query = idUsers.map((id) => ({ id }));

    await deleteUsers({ OR: query });

    revalidatePath("/admin/users");
    revalidatePath("/admin/recap/[id]", "page");
    return {
      error: false,
      message: `Successfully deleted ${idUsers.length} accounts`,
    };
  } catch (err) {
    console.error("Bulk add users failed:", err);
    return { error: true, message: "Internal Server Error" };
  }
}
