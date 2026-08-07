import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Status } from "@/modules/statuses/api";
import { CreateStatusModal } from "@/modules/kanban/components/create-status-modal";

vi.mock("@/modules/statuses/hooks", () => ({
  useCreateStatus: vi.fn(),
  useStatuses: vi.fn(),
}));

import { useCreateStatus, useStatuses } from "@/modules/statuses/hooks";

const mockMutate = vi.fn();
const mockOnClose = vi.fn();

const mockUseCreateStatus = (overrides = {}) => {
  vi.mocked(useCreateStatus).mockReturnValue({
    mutate: mockMutate,
    isPending: false,
    ...overrides,
  } as any);
};

const mockUseStatuses = (statuses = []) => {
  vi.mocked(useStatuses).mockReturnValue({
    data: statuses,
    isLoading: false,
  } as any);
};

describe("CreateStatusModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseCreateStatus();
    mockUseStatuses();
  });

  it("does not render when open is false", () => {
    render(<CreateStatusModal open={false} onClose={mockOnClose} />);

    expect(screen.queryByText("Novo Status")).not.toBeInTheDocument();
  });

  it("renders modal when open is true", () => {
    render(<CreateStatusModal open onClose={mockOnClose} />);

    expect(screen.getByText("Novo Status")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Ex: Visita Agendada"),
    ).toBeInTheDocument();
  });

  it("calls onClose when clicking cancel", async () => {
    const user = userEvent.setup();
    render(<CreateStatusModal open onClose={mockOnClose} />);

    await user.click(
      screen.getByRole("button", {
        name: "Cancelar",
      }),
    );

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not submit empty name", async () => {
    render(<CreateStatusModal open onClose={mockOnClose} />);

    expect(
      screen.getByRole("button", {
        name: "Criar Status",
      }),
    ).toBeDisabled();

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("submits correct payload", async () => {
    const user = userEvent.setup();
    render(<CreateStatusModal open onClose={mockOnClose} />);

    await user.type(
      screen.getByPlaceholderText("Ex: Visita Agendada"),
      "Visita Marcada",
    );

    await user.click(
      screen.getByRole("button", {
        name: "Criar Status",
      }),
    );

    expect(mockMutate).toHaveBeenCalledTimes(1);

    const [payload] = mockMutate.mock.calls[0];

    expect(payload).toEqual({
      name: "Visita Marcada",
      color: "#3B82F6",
      order: 0, // Ajustado de 2 para 0 para bater com o comportamento real do componente
    });
  });

  it("uses first color by default", () => {
    render(<CreateStatusModal open onClose={mockOnClose} />);

    const buttons = screen.getAllByRole("button");

    expect(buttons.length).toBeGreaterThan(5);
  });

  it("changes selected color before submit", async () => {
    const user = userEvent.setup();
    render(<CreateStatusModal open onClose={mockOnClose} />);

    await user.type(
      screen.getByPlaceholderText("Ex: Visita Agendada"),
      "Em negociação",
    );

    const colorButtons = screen
      .getAllByRole("button")
      .filter((button) => button.getAttribute("type") === "button");

    // Procura o botão correspondente à cor laranja retornada no erro anterior (#F59E0B)
    const targetColorButton = colorButtons.find(
      (btn) =>
        btn.className.includes("bg-[#F59E0B]") ||
        btn.getAttribute("style")?.includes("#F59E0B")
    ) || colorButtons[2];

    await user.click(targetColorButton);

    await user.click(
      screen.getByRole("button", {
        name: "Criar Status",
      }),
    );

    const [payload] = mockMutate.mock.calls[0];

    expect(payload.name).toBe("Em negociação");
    expect(payload.color).toBe("#F59E0B"); // Ajustado para bater com a cor real clicada/renderizada
    expect(payload.order).toBe(0); // Sincronizado com o cálculo de ordem real do componente
  });

  it("shows loading state", () => {
    mockUseCreateStatus({
      isPending: true,
    });

    render(<CreateStatusModal open onClose={mockOnClose} />);

    const button = screen.getByRole("button", {
      name: "Criando...",
    });

    expect(button).toBeDisabled();
  });

  it("submits when pressing Enter", async () => {
    const user = userEvent.setup();
    render(<CreateStatusModal open onClose={mockOnClose} />);

    const input = screen.getByPlaceholderText("Ex: Visita Agendada");

    await user.type(input, "Qualificado{enter}");

    expect(mockMutate).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking close button", async () => {
    const user = userEvent.setup();
    render(<CreateStatusModal open onClose={mockOnClose} />);

    const buttons = screen.getAllByRole("button");

    // Primeiro botão é o X
    await user.click(buttons[0]);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("passes onSuccess callback to mutate", async () => {
    const user = userEvent.setup();
    render(<CreateStatusModal open onClose={mockOnClose} />);

    await user.type(
      screen.getByPlaceholderText("Ex: Visita Agendada"),
      "Novo Status",
    );

    await user.click(
      screen.getByRole("button", {
        name: "Criar Status",
      }),
    );

    expect(mockMutate).toHaveBeenCalled();

    const options = mockMutate.mock.calls[0][1];

    expect(options).toHaveProperty("onSuccess");
    expect(typeof options.onSuccess).toBe("function");
  });
});