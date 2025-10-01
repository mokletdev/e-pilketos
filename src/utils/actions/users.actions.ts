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
    oneOf: ["ADMIN", "GURU", "SISWA", "OSIS", "MPK"],
  },
  Password: {
    prop: "password",
    type: String,
    required: false, // Make password optional
  },
};

interface UsersExcelSchema {
  email: string;
  name: string;
  role?: "ADMIN" | "GURU" | "SISWA" | "OSIS" | "MPK";
  password?: string;
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

        // Use password from Excel if provided, otherwise generate one
        const userPassword =
          password && password.trim() !== "" ? password : generatePassword();
        const hashedPassword = await hash(userPassword, 10);

        // Validate role from Excel or determine based on email pattern
        let userRole = role;
        if (
          !userRole ||
          !["ADMIN", "GURU", "SISWA", "OSIS", "MPK"].includes(userRole)
        ) {
          userRole = email.includes("student.") ? "SISWA" : "GURU";
        }

        try {
          const existingUser = await findUser({ email });

          if (existingUser) {
            const update = await updateUser(
              { email },
              {
                name,
                role: userRole,
                User_Auth: {
                  update: {
                    where: { user_Id: existingUser.id },
                    data: { password: hashedPassword },
                  },
                },
              },
            );
            if (!update) failedToCreate.push(email);
          } else {
            const create = await createUser({
              email,
              name,
              role: userRole,
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

    revalidatePath("/admin", "layout");
    revalidatePath("/admin/*", "page");
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

    revalidatePath("/admin", "layout");
    revalidatePath("/admin/*", "page");
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
