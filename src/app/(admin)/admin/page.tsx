"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.role == "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/auth/login");
    }
  }, [session, router]);

  return null;
}
