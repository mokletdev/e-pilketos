"use server";
import { revalidatePath } from "next/cache";
import { nextGetServerSession } from "../../../../lib/AuthOptions";
import {
  createVoteSession,
  UpdateVoteSession,
} from "../../../../utils/database/voteSession.query";

export const upsertVoteSession = async (id: string | null, data: FormData) => {
  try {
    const session = await nextGetServerSession();
    if (!session?.user?.role.includes("Admin"))
      return { error: true, message: "Unauthorized" };

    const name = data.get("name") as string;
    const start_time = new Date(data.get("start_time") as string);
    const end_time = new Date(data.get("end_time") as string);
    const isPublic = data.get("is_active") === "true";
    const max_vote = parseInt(data.get("max_vote") as string, 10);

    if (id == null) {
      await createVoteSession({ 
        name, 
        start_time, 
        end_time, 
        isPublic, 
        max_vote 
      });
    } else {
      await UpdateVoteSession(id, { 
        name, 
        start_time, 
        end_time, 
        isPublic, 
        max_vote 
      });
    }

    revalidatePath("/admin/votesesion");
    return { message: "Vote session saved successfully!", error: false };
  } catch (e) {
    console.error(e);
    const error = e as Error;
    return {
      message: "Failed to save vote session",
      error: true,
    };
  }
};
