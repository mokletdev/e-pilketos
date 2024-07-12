"use client";
import { FormButton } from "@/app/components/general/Button";
import { TextField } from "@/app/components/general/Input";
import { H2, Large_Text, Small_Text } from "@/app/components/general/Text";
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
        callbackUrl: "/admin",
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (!response?.ok && response?.status === 401) {
        toast.error("Login Gagal");
        setError("Akun Tidak Terdaftar Sebagai Admin E-Pilketos");
      }
      if (!response?.ok) {
        toast.error("Login Gagal");
        setError("Gagal Login");
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
  return (
    <>
      <main className="w-full h-screen">
        <form onSubmit={handleSubmit}>
          <div className="bg-white max-w-[624px] w-full py-[92px] px-[88px] flex-col items-center mx-auto shadow-shadow-2">
            <H2 className="text-center text-primary-text-color">
              Yuk Login Untuk Pantau Kegiatan Pilketos 2024
            </H2>
            <Large_Text
              variant="REGULAR"
              className="text-secondary-text-color text-center mt-2 mb-8"
            >
              Jangan lupa login menggunakan akun yang telah diberikan oleh
              developer ya..
            </Large_Text>
            <TextField
              placeholder="Masukkan Email Anda"
              type="email"
              name="email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              placeholder="Masukkan Password Anda"
              type="password"
              name="email"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
            />
            <FormButton
              type="submit"
              variant="PRIMARY"
              className="flex items-center gap-x-4 w-full justify-center group"
            >
              <Large_Text variant="BOLD">Login</Large_Text>
            </FormButton>
            {error && (
              <Small_Text variant="MEDIUM" className="text-red-500 mt-4">
                {error}
              </Small_Text>
            )}
          </div>
        </form>
      </main>
    </>
  );
}
