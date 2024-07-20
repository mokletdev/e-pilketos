"use client";
import { FormButton } from "@/app/components/general/Button";
import { TextField } from "@/app/components/general/Input";
import { H2, Large_Text, Small_Text } from "@/app/components/general/Text";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import imgLeft from "@/../public/images/LoginUserLeft.png";
import imgRight from "@/../public/images/LoginUserRight.png";
import Image from "next/image";
import HeaderSect from "@/../public/images/headersection.png";

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
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Login Gagal");
      setError((error as Error).message);
    }
  };
  return (
    <main className="px-4 lg:px-20">
      <Image
        src={imgLeft}
        alt="Image Carousel"
        className="h-full w-auto md:absolute top-0 left-0 hidden md:block"
      />
      <Image
        src={HeaderSect}
        alt="HeaderSection"
        className="-mt-72 md:hidden lg:-mt-0 mx-auto"
      />
      <div className="w-full h-full my-14 z-20 relative">
        <form onSubmit={handleSubmit}>
          <div className="bg-white max-w-[624px] w-full py-[72px] md:py-[92px] px-[24px] md:px-[88px] flex-col items-center mx-auto shadow-shadow-2">
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
              required
            />
            <TextField
              placeholder="Masukkan Password Anda"
              type="password"
              name="email"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              required
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
      </div>
      <Image
        src={imgRight}
        alt="Image Carousel"
        className="h-full w-auto md:absolute top-0 right-0  hidden md:block"
      />
    </main>
  );
}
