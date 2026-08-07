import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "@/modules/auth/components/register-form";

vi.mock("@/modules/auth/hooks", () => ({
  useRegister: vi.fn(),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { useRegister } from "@/modules/auth/hooks";

const mockMutate = vi.fn();

const mockUseRegister = (overrides = {}) => {
  vi.mocked(useRegister).mockReturnValue({
    mutate: mockMutate,
    isPending: false,
    error: null,
    ...overrides,
  } as any);
};

describe("RegisterForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseRegister();
  });

  it("renders all form fields", () => {
    render(<RegisterForm />);

    expect(screen.getByPlaceholderText("Seu nome")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("exemplo@sicrm.com")).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText("••••••••")).toHaveLength(2);
  });

  it("renders submit button with default text", () => {
    render(<RegisterForm />);

    expect(
      screen.getByRole("button", { name: "Criar Conta →" }),
    ).toBeInTheDocument();
  });

  it("renders login link pointing to /login", () => {
    render(<RegisterForm />);

    const link = screen.getByRole("link", { name: "Entrar" });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/login");
  });

  it("shows validation errors when submitting empty form", async () => {
    render(<RegisterForm />);

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText("Nome muito curto")).toBeInTheDocument();
      expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument();
      expect(screen.getByText("Mínimo 6 caracteres")).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const emailInput = screen.getByPlaceholderText("exemplo@sicrm.com");
    await user.type(emailInput, "invalid-email");

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument();
    });
  });

  it("shows validation error when passwords do not match", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.type(screen.getByPlaceholderText("Seu nome"), "Diego");
    await user.type(
      screen.getByPlaceholderText("exemplo@sicrm.com"),
      "diego@email.com",
    );

    const passwords = screen.getAllByPlaceholderText("••••••••");

    await user.type(passwords[0], "123456");
    await user.type(passwords[1], "654321");

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText("Senhas não coincidem")).toBeInTheDocument();
    });
  });

  it("calls mutate with correct data on valid form submission", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.type(screen.getByPlaceholderText("Seu nome"), "Diego");
    await user.type(
      screen.getByPlaceholderText("exemplo@sicrm.com"),
      "diego@email.com",
    );

    const passwords = screen.getAllByPlaceholderText("••••••••");

    await user.type(passwords[0], "123456");
    await user.type(passwords[1], "123456");

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        name: "Diego",
        email: "diego@email.com",
        password: "123456",
      });
    });
  });

  it("does not call mutate when there are validation errors", async () => {
    render(<RegisterForm />);

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockMutate).not.toHaveBeenCalled();
    });
  });

  it('shows "Criando..." and disables button while loading', () => {
    mockUseRegister({ isPending: true });
    render(<RegisterForm />);

    const button = screen.getByRole("button", { name: "Criando..." });
    expect(button).toBeDisabled();
  });

  it("shows request error message", () => {
    mockUseRegister({ error: new Error("Request failed") });
    render(<RegisterForm />);

    expect(
      screen.getByText("Erro ao criar conta. Tente novamente."),
    ).toBeInTheDocument();
  });

  it("does not show request error when there is no error", () => {
    render(<RegisterForm />);

    expect(
      screen.queryByText("Erro ao criar conta. Tente novamente."),
    ).not.toBeInTheDocument();
  });
});