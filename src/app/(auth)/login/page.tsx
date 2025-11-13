"use client";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { LoginForm } from "@/components/layout/LoginForm";
import { SubtitleBlock } from "@/components/ui/SubtitleBlock";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { HTTP_STATUS } from "@/utils/constaints";

export default function Page() {
  const { isAuth, loginUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const onLogin = useCallback(async (formData: FormData) => {
    const username = formData.get('username');
    const password = formData.get('password');
    const res = await loginUser(username?.toString() || '', password?.toString() || '');
    if (res?.status && res.status == HTTP_STATUS.OK) {
      router.push('/bookings');
    }
    if (res?.status && res.status !== HTTP_STATUS.OK) {
      setError(res.message);
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      router.push('/bookings');
    }
  });

  return (
    <ContentBlock className="h-[80%] w-full">
      <SubtitleBlock>Вход</SubtitleBlock>
      <LoginForm onSubmit={onLogin} error={error} />
      <p className="my-[20px] text-center text-xl">Если у вас нет аккаунта, <Link href="/register" className="underline">зарегистрируйтесь</Link></p>
    </ContentBlock>
  );
}
