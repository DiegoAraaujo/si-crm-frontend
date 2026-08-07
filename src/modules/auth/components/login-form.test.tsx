import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "@/modules/auth/components/login-form";

vi.mock("@/modules/auth/hooks", () => ({
  useLogin: vi.fn(),
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

import { useLogin } from "@/modules/auth/hooks";

const mockMutate = vi.fn();

const mockUseLogin = (overrides = {}) => {
  vi.mocked(useLogin).mockReturnValue({
    mutate: mockMutate,
    isPending: false,
    error: null,
    ...overrides,
  } as any);
};

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLogin();
  });

  it("renders email and password fields", () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText("agent@sicrm.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
  });

  it("renders submit button with default text", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("button", { name: "Entrar no Painel" }),
    ).toBeInTheDocument();
  });

  it("renders sign up link pointing to /register", () => {
    render(<LoginForm />);

    const link = screen.getByRole("link", { name: "Criar Conta" });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/register");
  });

  it("shows validation errors when submitting empty form", async () => {
    render(<LoginForm />);

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument();
      expect(screen.getByText("Mínimo 6 caracteres")).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("agent@sicrm.com");
    await user.type(emailInput, "not-an-email");

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument();
    });
  });

  it("calls mutate with correct data on valid form submission", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(
      screen.getByPlaceholderText("agent@sicrm.com"),
      "diego@email.com",
    );
    await user.type(screen.getByPlaceholderText("••••••••"), "123456");

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        email: "diego@email.com",
        password: "123456",
      });
    });
  });

  it("does not call mutate when there are validation errors", async () => {
    render(<LoginForm />);

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockMutate).not.toHaveBeenCalled();
    });
  });

  it('shows "Entrando..." and disables button while loading', () => {
    mockUseLogin({ isPending: true });
    render(<LoginForm />);

    const button = screen.getByRole("button", { name: "Entrando..." });
    expect(button).toBeDisabled();
  });

  it("shows invalid credentials error when request fails", () => {
    mockUseLogin({ error: new Error("Unauthorized") });
    render(<LoginForm />);

    expect(screen.getByText("E-mail ou senha inválidos.")).toBeInTheDocument();
  });

  it("does not show error message when there is no error", () => {
    render(<LoginForm />);

    expect(
      screen.queryByText("E-mail ou senha inválidos."),
    ).not.toBeInTheDocument();
  });
});