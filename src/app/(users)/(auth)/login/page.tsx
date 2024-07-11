"use client";
import { FormButton } from "@/app/components/general/Button";
import { signIn } from "next-auth/react";
import React from "react";

export default function userLogin() {
  return (
    <>
      <FormButton
        variant="PRIMARY"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Signin
      </FormButton>
    </>
  );
}
