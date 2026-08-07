import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatInput } from "@/modules/chat/components/chat-input";

const mockOnSend = vi.fn();

describe("ChatInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the input", () => {
    render(<ChatInput onSend={mockOnSend} />);

    expect(
      screen.getByPlaceholderText(
        "Pergunte qualquer coisa sobre seus leads...",
      ),
    ).toBeInTheDocument();
  });

  it("renders send button", () => {
    render(<ChatInput onSend={mockOnSend} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("starts with disabled send button", () => {
    render(<ChatInput onSend={mockOnSend} />);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("enables send button when user types", async () => {
    render(<ChatInput onSend={mockOnSend} />);

    const input = screen.getByPlaceholderText(
      "Pergunte qualquer coisa sobre seus leads...",
    );

    await userEvent.type(input, "Olá");

    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("calls onSend when clicking send button", async () => {
    render(<ChatInput onSend={mockOnSend} />);

    const input = screen.getByPlaceholderText(
      "Pergunte qualquer coisa sobre seus leads...",
    );

    await userEvent.type(input, "Mensagem de teste");

    await userEvent.click(screen.getByRole("button"));

    expect(mockOnSend).toHaveBeenCalledWith("Mensagem de teste");
  });

  it("clears input after sending", async () => {
    render(<ChatInput onSend={mockOnSend} />);

    const input = screen.getByPlaceholderText(
      "Pergunte qualquer coisa sobre seus leads...",
    ) as HTMLInputElement;

    await userEvent.type(input, "Mensagem");

    await userEvent.click(screen.getByRole("button"));

    expect(input.value).toBe("");
  });

  it("sends message when pressing Enter", async () => {
    render(<ChatInput onSend={mockOnSend} />);

    const input = screen.getByPlaceholderText(
      "Pergunte qualquer coisa sobre seus leads...",
    );

    await userEvent.type(input, "Olá{enter}");

    expect(mockOnSend).toHaveBeenCalledWith("Olá");
  });

  it("does not send when pressing Shift + Enter", async () => {
    render(<ChatInput onSend={mockOnSend} />);

    const input = screen.getByPlaceholderText(
      "Pergunte qualquer coisa sobre seus leads...",
    );

    input.focus();

    await userEvent.keyboard("Mensagem");
    await userEvent.keyboard("{Shift>}{Enter}{/Shift}");

    expect(mockOnSend).not.toHaveBeenCalled();
  });

  it("does not send empty messages", async () => {
    render(<ChatInput onSend={mockOnSend} />);

    const input = screen.getByPlaceholderText(
      "Pergunte qualquer coisa sobre seus leads...",
    );

    await userEvent.type(input, "      ");

    expect(screen.getByRole("button")).toBeDisabled();

    expect(mockOnSend).not.toHaveBeenCalled();
  });

  it("trims whitespace before sending", async () => {
    render(<ChatInput onSend={mockOnSend} />);

    const input = screen.getByPlaceholderText(
      "Pergunte qualquer coisa sobre seus leads...",
    );

    await userEvent.type(input, "   Olá IA   ");

    await userEvent.click(screen.getByRole("button"));

    expect(mockOnSend).toHaveBeenCalledWith("Olá IA");
  });

  it("disables input and button when disabled prop is true", () => {
    render(<ChatInput onSend={mockOnSend} disabled />);

    expect(
      screen.getByPlaceholderText(
        "Pergunte qualquer coisa sobre seus leads...",
      ),
    ).toBeDisabled();

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not send message when disabled", async () => {
    render(<ChatInput onSend={mockOnSend} disabled />);

    const input = screen.getByPlaceholderText(
      "Pergunte qualquer coisa sobre seus leads...",
    );

    expect(input).toBeDisabled();

    expect(mockOnSend).not.toHaveBeenCalled();
  });

  it("renders helper text", () => {
    render(<ChatInput onSend={mockOnSend} />);

    expect(
      screen.getByText(/SI CRM IA pode cometer erros/i),
    ).toBeInTheDocument();
  });
});
