import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useChat } from "@/modules/chat/hooks";
import { sendMessage } from "@/modules/chat/api";

vi.mock("@/modules/chat/api", () => ({
  sendMessage: vi.fn(),
}));

describe("useChat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("starts with the default assistant message", () => {
    const { result } = renderHook(() => useChat());

    expect(result.current.messages).toHaveLength(1);

    expect(result.current.messages[0]).toMatchObject({
      role: "assistant",
    });

    expect(result.current.messages[0].content).toContain("Olá! Sou o SI IA");

    expect(result.current.isLoading).toBe(false);
  });

  it("adds the user message immediately", async () => {
    vi.mocked(sendMessage).mockResolvedValue("Resposta da IA");

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.send("Olá");
    });

    expect(result.current.messages.some((m) => m.role === "user")).toBe(true);

    expect(
      result.current.messages.find((m) => m.role === "user")?.content,
    ).toBe("Olá");
  });

  it("calls sendMessage with the correct arguments", async () => {
    vi.mocked(sendMessage).mockResolvedValue("Resposta");

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.send("Teste");
    });

    expect(sendMessage).toHaveBeenCalledTimes(1);

    expect(vi.mocked(sendMessage).mock.calls[0][0]).toBe("Teste");
  });

  it("adds the assistant response after a successful request", async () => {
    vi.mocked(sendMessage).mockResolvedValue("Resposta da IA");

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.send("Olá");
    });

    await waitFor(() => {
      expect(
        result.current.messages.some(
          (m) => m.role === "assistant" && m.content === "Resposta da IA",
        ),
      ).toBe(true);
    });
  });

  it("sets loading while the request is in progress", async () => {
    let resolvePromise!: (value: string) => void;

    vi.mocked(sendMessage).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        }),
    );

    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.send("Mensagem");
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolvePromise("Resposta");
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("adds an error message when request fails", async () => {
    vi.mocked(sendMessage).mockRejectedValue(new Error("Erro"));

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.send("Mensagem");
    });

    await waitFor(() => {
      expect(
        result.current.messages.some(
          (m) =>
            m.role === "assistant" &&
            m.content === "Desculpe, ocorreu um erro. Tente novamente.",
        ),
      ).toBe(true);
    });
  });

  it("stops loading when request fails", async () => {
    vi.mocked(sendMessage).mockRejectedValue(new Error("Erro"));

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.send("Mensagem");
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("keeps all previous messages after multiple sends", async () => {
    vi.mocked(sendMessage).mockResolvedValue("Resposta");

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.send("Primeira");
    });

    await act(async () => {
      await result.current.send("Segunda");
    });

    expect(
      result.current.messages.filter((m) => m.role === "user").length,
    ).toBe(2);

    expect(result.current.messages.length).toBeGreaterThanOrEqual(5);
  });
});
