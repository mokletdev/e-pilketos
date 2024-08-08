"use client";
import { FormButton } from "@/app/components/general/Button";
import { H2, Large_Text, Small_Text } from "@/app/components/general/Text";
import { signIn, useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import imgLeft from "@/../public/images/LoginUserLeft.png";
import imgRight from "@/../public/images/LoginUserRight.png";
import Image from "next/image";
import HeaderSect from "@/../public/images/headersection.png";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TextField } from "@/app/components/general/Input";

export default function UserLogin() {
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

      if (!response?.ok) {
        toast.error("Login Gagal");
        setError("Gagal Login");
      }
      if (response?.status === 401) {
        console.log(response);
        toast.error("Login Gagal");
        setError("Akun Tidak Terdaftar");
      }

      if (response?.ok) {
        toast.success("Login Berhasil");
        router.push("/vote");
      } else {
        toast.error("Login Gagal");
        setError("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login Gagal");
      setError((error as Error).message);
    }
  };
  return (
    <main className="px-4 lg:px-20">
      <Image
        src={imgLeft}
        alt="Image Carousel"
        className="min-h-full w-auto md:absolute top-0 left-0 hidden md:block"
      />
      <Image
        src={HeaderSect}
        alt="HeaderSection"
        className="-mt-72 md:hidden lg:-mt-0 mx-auto"
      />
      <div className="w-full h-full my-14 lg:my-28 z-20 relative">
        <div className="bg-white max-w-[624px] w-full py-[72px] md:py-[92px] px-[24px] md:px-[88px] flex-col items-center mx-auto shadow-shadow-2 rounded-xl">
          <H2 className="text-center text-primary-text-color">
            Yuk Login untuk Memulai Vote
          </H2>
          <Large_Text
            variant="REGULAR"
            className="text-secondary-text-color text-center mt-2 mb-8"
          >
            Login menggunakan akun yang telah diberikan ya..
          </Large_Text>

          <div className="w-full h-full my-14 z-20 relative">
            <form onSubmit={handleSubmit}>
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
                name="password"
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
            </form>
          </div>
        </div>
      </div>
      <Image
        src={imgRight}
        alt="Image Carousel"
        className="h-full w-auto md:absolute top-0 right-0  hidden md:block"
      />
    </main>
  );
}
