import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatMessage } from "@/modules/chat/components/chat-message";

describe("ChatMessage", () => {
  const createdAt = new Date("2026-01-01T10:30:00");

  it("renders user message", () => {
    render(
      <ChatMessage
        message={{
          id: "1",
          role: "user",
          content: "Olá IA",
          createdAt,
        }}
        userName="Diego"
      />,
    );

    expect(screen.getByText("Olá IA")).toBeInTheDocument();
    expect(screen.getByText("Diego")).toBeInTheDocument();
  });

  it("does not render user name when it is not provided", () => {
    render(
      <ChatMessage
        message={{
          id: "1",
          role: "user",
          content: "Olá IA",
          createdAt,
        }}
      />,
    );

    expect(screen.queryByText("Diego")).not.toBeInTheDocument();
  });

  it("renders assistant label", () => {
    render(
      <ChatMessage
        message={{
          id: "2",
          role: "assistant",
          content: "Olá, como posso ajudar?",
          createdAt,
        }}
      />,
    );

    expect(screen.getByText("IA Chat")).toBeInTheDocument();
  });

  it("renders assistant message", () => {
    render(
      <ChatMessage
        message={{
          id: "2",
          role: "assistant",
          content: "Posso ajudar com seus leads.",
          createdAt,
        }}
      />,
    );

    expect(
      screen.getByText("Posso ajudar com seus leads."),
    ).toBeInTheDocument();
  });

  it("renders markdown bold correctly", () => {
    render(
      <ChatMessage
        message={{
          id: "2",
          role: "assistant",
          content: "**Importante**",
          createdAt,
        }}
      />,
    );

    expect(screen.getByText("Importante").tagName).toBe("STRONG");
  });

  it("renders markdown list", () => {
    render(
      <ChatMessage
        message={{
          id: "2",
          role: "assistant",
          content: "- Lead A\n- Lead B",
          createdAt,
        }}
      />,
    );

    expect(screen.getByText("Lead A")).toBeInTheDocument();
    expect(screen.getByText("Lead B")).toBeInTheDocument();
  });

  it("renders markdown inline code", () => {
    render(
      <ChatMessage
        message={{
          id: "2",
          role: "assistant",
          content: "Use `CRM` para gerenciar.",
          createdAt,
        }}
      />,
    );

    expect(screen.getByText("CRM").tagName).toBe("CODE");
  });

  it("renders formatted time", () => {
    render(
      <ChatMessage
        message={{
          id: "2",
          role: "assistant",
          content: "Mensagem",
          createdAt,
        }}
      />,
    );

    expect(
      screen.getByText(
        createdAt.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      ),
    ).toBeInTheDocument();
  });

  it("renders multiline markdown paragraphs", () => {
    render(
      <ChatMessage
        message={{
          id: "2",
          role: "assistant",
          content: "Primeiro parágrafo.\n\nSegundo parágrafo.",
          createdAt,
        }}
      />,
    );

    expect(screen.getByText("Primeiro parágrafo.")).toBeInTheDocument();
    expect(screen.getByText("Segundo parágrafo.")).toBeInTheDocument();
  });

  it("renders user message without markdown parsing", () => {
    render(
      <ChatMessage
        message={{
          id: "3",
          role: "user",
          content: "**Olá**",
          createdAt,
        }}
        userName="Diego"
      />,
    );

    expect(screen.getByText("**Olá**")).toBeInTheDocument();
    expect(screen.queryByRole("strong")).not.toBeInTheDocument();
  });
});
