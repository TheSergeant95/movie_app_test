import RegisterForm from "@/components/layout/RegisterForm";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

describe("RegisterForm component", () => {
  it("рендерится форма с инпутами и кнопкой", () => {
    const handleSubmit = jest.fn();
    render(<RegisterForm onSubmit={handleSubmit} />);
    expect(screen.getByText("Регистрация")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Введите логин")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Введите пароль")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Повторно введите пароль")).toBeInTheDocument();
  });

  it("вызывает обработчик onSubmit, когда форма отправляется", async () => {
    const handleSubmit = jest.fn();
    render(<RegisterForm onSubmit={handleSubmit} />);
    const usernameInput = screen.getByTestId("input-username") as HTMLInputElement;
    const passwordInput = screen.getByTestId("input-password") as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId("input-confirm") as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: "Username1" } });
    fireEvent.change(passwordInput, { target: { value: "Password1" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "Password1" } });
    const form = screen.getByTestId("register-form");
    fireEvent.submit(form);

    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
  });

  it("рендерится сообщение об ошибке", () => {
    const handleSubmit = jest.fn();
    render(<RegisterForm onSubmit={handleSubmit} error="Invalid username" />);
    expect(screen.getByText("Invalid username")).toBeInTheDocument();
  });

  it("рендерится сообщение об ошибке при вводе некорректных данных в логин", async () => {
    const handleSubmit = jest.fn();
    render(<RegisterForm onSubmit={handleSubmit} />);
    const usernameInput = screen.getByTestId("input-username") as HTMLInputElement;
    const passwordInput = screen.getByTestId("input-password") as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId("input-confirm") as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: "a" } });
    fireEvent.change(passwordInput, { target: { value: "Password1" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "Password1" } });

    const form = screen.getByTestId("register-form");
    fireEvent.submit(form);

    await waitFor(() => expect(screen.getByText("Минимум 8 символов")).toBeInTheDocument());
  });

  it("рендерится сообщение об ошибке при вводе некорректных данных в пароль: мало символов", async () => {
    const handleSubmit = jest.fn();
    render(<RegisterForm onSubmit={handleSubmit} />);
    const usernameInput = screen.getByTestId("input-username") as HTMLInputElement;
    const passwordInput = screen.getByTestId("input-password") as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: "Username1" } });
    fireEvent.change(passwordInput, { target: { value: "a" } });

    const form = screen.getByTestId("register-form");
    fireEvent.submit(form);

    await waitFor(() => expect(screen.getByText("Минимум 8 символов")).toBeInTheDocument());
  });

  it("рендерится сообщение об ошибке при вводе некорректных данных в пароль: нет заглавных букв", async () => {
    const handleSubmit = jest.fn();
    render(<RegisterForm onSubmit={handleSubmit} />);
    const passwordInput = screen.getByTestId("input-password") as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: "password" } });

    const form = screen.getByTestId("register-form");
    fireEvent.submit(form);

    await waitFor(() => expect(screen.getByText("Должна быть как минимум 1 заглавная буква")).toBeInTheDocument());
  });

  it("рендерится сообщение об ошибке при вводе некорректных данных в логин: нет цифр", async () => {
    const handleSubmit = jest.fn();
    render(<RegisterForm onSubmit={handleSubmit} />);
    const passwordInput = screen.getByTestId("input-password") as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: "Password" } });

    const form = screen.getByTestId("register-form");
    fireEvent.submit(form);

    await waitFor(() => expect(screen.getByText("Должна быть как минимум 1 цифра")).toBeInTheDocument());
  });

  it("рендерится сообщение об ошибке при вводе некорректных данных в подтверждение пароля", async () => {
    const handleSubmit = jest.fn();
    render(<RegisterForm onSubmit={handleSubmit} />);
    const usernameInput = screen.getByTestId("input-username") as HTMLInputElement;
    const passwordInput = screen.getByTestId("input-password") as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId("input-confirm") as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: "Username1" } });
    fireEvent.change(passwordInput, { target: { value: "Password1" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "Password" } });

    const form = screen.getByTestId("register-form");
    fireEvent.submit(form);

    await waitFor(() => expect(screen.getByText("Пароли не совпадают")).toBeInTheDocument());
  })
});
