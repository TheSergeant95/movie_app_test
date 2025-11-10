"use client";
import React, { useEffect, useState } from "react";
import RegisterForm from "../../../components/layout/RegisterForm";
import ContentBlock from "@/components/layout/ContentBlock";
import Link from "next/link";
import SubtitleBlock from "@/components/SubtitleBlock";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { UserCredentialsType } from "@/types";

export default function Page() {
  const { isAuth, registerUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const onRegister = async (data: UserCredentialsType) => {
    const res = await registerUser(data.username, data.password);
    if (res?.status && res.status == 200) {
      router.push("/bookings");
    }
    if (res?.status && res.status !== 200) {
      setError(res.message);
    }
  };

  useEffect(() => {
    if (isAuth) {
      router.push('/bookings');
    }
  });

  return (
    <ContentBlock className="h-[80%] w-full">
      <SubtitleBlock>Регистрация</SubtitleBlock>
      <RegisterForm onSubmit={onRegister} error={error} />
      <p className="my-[20px] text-center text-xl">Если Вы уже зарегистрированы, <Link href="/login" className="underline">войдите</Link></p>
    </ContentBlock>
  );
}
