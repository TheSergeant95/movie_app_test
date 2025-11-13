"use client"
import React, { FC } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface LoginFormProps {
    onSubmit: (formData: FormData) => Promise<void>;
    error: string | null;
}

const LoginForm: FC<LoginFormProps> = ({ onSubmit, error }) => {
    return (
        <form data-testid='login-form' action={onSubmit} className="max-w-[234px] mx-auto flex flex-col">
            <Input data-testid='input-username' type="text" name="username" text="Логин" placeholder="Введите логин" />
            <Input data-testid='input-password' type="password" name="password" text="Пароль" placeholder="Введите пароль" />
            {error ? <p data-testid='error-message' className="text-[12px] text-red-900 leading-none">{error}</p> : <p className="h-[12px]"></p>}
            <Button data-testid='button-submit' type="submit" sizeClass="max-w-[90px] w-full p-[10px] mx-auto mt-5">Войти</Button>
        </form>
    )
}

export default LoginForm;