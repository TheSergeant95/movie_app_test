"use client"
import React, { FC } from "react";
import { FieldError, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { UserCredentialsType } from "@/types";

interface RegisterFormProps {
  onSubmit: (data: UserCredentialsType) => Promise<void>;
  error?: string;
}

const registerSchema = z.object({
  username: z.string().min(8, "Минимум 8 символов"),
  password: z.string()
    .min(8, "Минимум 8 символов")
    .regex(/[A-Z]/, "Должна быть как минимум 1 заглавная буква")
    .regex(/\d/, "Должна быть как минимум 1 цифра"),
  confirm: z.string()
}).refine(data => data.password === data.confirm, {
  path: ["confirm"],
  message: "Пароли не совпадают"
});

type RegisterData = z.infer<typeof registerSchema>;

const RegisterErrorField: FC<{ error?: FieldError }> = ({ error }) => (
  <div className="mb-2">
    {error && <p className="text-[12px] text-red-900 leading-none mb-2">{error.message}</p>}
  </div>
);

const RegisterForm: FC<RegisterFormProps> = ({ onSubmit, error }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({ resolver: zodResolver(registerSchema) });

  return (
    <form data-testid='register-form' onSubmit={handleSubmit(onSubmit)} className="max-w-[234px] mx-auto flex flex-col">
      <Input data-testid='input-username' type="text" text="Логин" placeholder="Введите логин" {...register("username")} />
      <RegisterErrorField error={errors.username} />
      <Input data-testid='input-password' type="password" text="Пароль" placeholder="Введите пароль" {...register("password")} />
      <RegisterErrorField error={errors.password} />
      <Input data-testid='input-confirm' type="password" text="Подтвердите пароль" placeholder="Повторно введите пароль" {...register("confirm")} />
      <RegisterErrorField error={errors.confirm} />
      <Button data-testid='button-submit' sizeClass="max-w-[90px] w-full p-[10px] mx-auto mt-5">Регистрация</Button>
      {error && <p className="text-[12px] text-red-900 leading-none my-2">{error}</p>}
    </form>
  );
};

export default RegisterForm;