import { render, screen, fireEvent } from "@testing-library/react";
import Input from "@/components/Input";

describe("Input component", () => {
  it("рендерится инпут с плейсхолдером", () => {
    render(<Input placeholder="Введите логин" />);
    expect(screen.getByPlaceholderText("Введите логин")).toBeInTheDocument();
  });

  it("вызывает обработчик onChange", () => {
    const handleChange = jest.fn();
    render(<Input placeholder="Логин" onChange={handleChange} />);
    const input = screen.getByPlaceholderText("Логин");

    fireEvent.change(input, { target: { value: "newuser" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("рендерит заблокированный инпут", () => {
    render(<Input placeholder="disabled" disabled />);
    const input = screen.getByPlaceholderText("disabled");
    expect(input).toBeDisabled();
  });

  it("использует aria-label для инпута, если был передан в качестве пропса", () => {
    render(<Input aria-label="username" />);
    expect(screen.getByLabelText("username")).toBeInTheDocument();
  });
});
