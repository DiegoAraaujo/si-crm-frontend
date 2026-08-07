import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { LeadFormModal } from "./lead-form-modal";

const mutateCreate = vi.fn();
const mutateUpdate = vi.fn();

vi.mock("../hooks", () => ({
  useCreateLead: () => ({
    mutate: mutateCreate,
    isPending: false,
  }),
  useUpdateLead: () => ({
    mutate: mutateUpdate,
    isPending: false,
  }),
}));

describe("LeadFormModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders modal when open", () => {
    render(<LeadFormModal open={true} onClose={vi.fn()} />);

    expect(screen.getByText("Novo Lead")).toBeInTheDocument();
  });

  it("calls createLead on submit", async () => {
    render(<LeadFormModal open={true} onClose={vi.fn()} />);

    fireEvent.change(screen.getByPlaceholderText("Ricardo Silva"), {
      target: { value: "João Teste" },
    });

    fireEvent.change(screen.getByPlaceholderText("+55 (11) 99999-9999"), {
      target: { value: "11999999999" },
    });

    fireEvent.change(screen.getByPlaceholderText("exemplo@email.com"), {
      target: { value: "joao@email.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("São Paulo"), {
      target: { value: "SP" },
    });

    fireEvent.change(screen.getByPlaceholderText("Vila Mariana"), {
      target: { value: "Centro" },
    });

    fireEvent.change(screen.getByPlaceholderText("500000"), {
      target: { value: "500000" },
    });

    fireEvent.change(screen.getByPlaceholderText("850000"), {
      target: { value: "900000" },
    });

    fireEvent.change(
      screen.getByPlaceholderText(
        "Informações adicionais sobre o lead...",
      ),
      {
        target: { value: "teste" },
      },
    );

    fireEvent.change(
      document.querySelector('select[name="type"]')!,
      { target: { value: "COMPRA" } },
    );

    fireEvent.change(
      document.querySelector('select[name="propertyType"]')!,
      { target: { value: "CASA" } },
    );

    fireEvent.change(
      document.querySelector('select[name="origin"]')!,
      { target: { value: "SITE" } },
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /salvar alterações/i,
      }),
    );

    await waitFor(() => {
      expect(mutateCreate).toHaveBeenCalled();
    });
  });
});