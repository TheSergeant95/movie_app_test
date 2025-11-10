import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/Button";

describe("Button component", () => {
    it("рендерится с корректным текстом", () => {
        render(<Button>Сохранить</Button>);
        expect(screen.getByRole("button", { name: "Сохранить" })).toBeInTheDocument();
    });

    it("при клике вызывает обработчик onClick", () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        const button = screen.getByRole("button", { name: "Click me" });

        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("рендерится неактивная кнопка", () => {
        render(<Button disabled>Disabled</Button>);
        const button = screen.getByRole("button", { name: "Disabled" });
        expect(button).toBeDisabled();
    });

    it("Применяется кастомный класс", () => {
        render(<Button className="bg-red-500">Test</Button>);
        const button = screen.getByRole("button", { name: "Test" });
        expect(button).toHaveClass("bg-red-500");
    });
});
