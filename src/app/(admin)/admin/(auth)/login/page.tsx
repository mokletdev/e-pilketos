"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState("");
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      const response = await signIn("credentials", {
        callbackUrl: "/vote",
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (response?.error) {
        toast.error("Login Gagal");
        setError(response.error);
      }
      if (response?.ok) {
        toast.success("Login Berhasil");
        router.push("/vote");
      }
    } catch (error) {
      toast.error("Login Gagal");
      setError((error as Error).message);
    }
  };
  return <></>;
}
