import { redirect } from "next/navigation";
import { nextGetServerSession } from "@/lib/AuthOptions";

export default async function Page() {
  const session = await nextGetServerSession();
  console.log(session);

  if (session?.user?.role == "ADMIN") {
    redirect("/admin/dashboard");
  } else {
    redirect("/auth/login");
  }

  return null;
}
