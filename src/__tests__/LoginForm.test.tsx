"use client"
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import LoginForm from "@/components/layout/LoginForm";

describe("LoginForm component", () => {
    it("рендерится форма с инпутами и кнопкой", () => {
        render(<LoginForm onSubmit={jest.fn()} error={''} />);
        expect(screen.getByText("Логин")).toBeInTheDocument();
        expect(screen.getByText("Пароль")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Войти" })).toBeInTheDocument();
    });

    it("вызывает обработчик onSubmit, когда форма отправляется", async () => {
        const handleSubmit = jest.fn();
        render(<LoginForm onSubmit={handleSubmit} error={''} />);
        const form = screen.getByTestId("login-form");
        fireEvent.submit(form);

        await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
    });

    it("рендерится сообщение об ошибке, если было передано", () => {
        render(<LoginForm onSubmit={jest.fn()} error="Invalid credentials" />);
        expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
});
