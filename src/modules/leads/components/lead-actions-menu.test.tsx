import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { LeadActionsMenu } from "./lead-actions-menu";

const mutateDelete = vi.fn();

vi.mock("../hooks", () => ({
  useDeleteLead: () => ({
    mutate: mutateDelete,
    isPending: false,
  }),
}));

describe("LeadActionsMenu", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("opens menu when clicking button", () => {
    render(
      <LeadActionsMenu
        leadId="1"
        onView={vi.fn()}
        onEdit={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("Detalhes")).toBeInTheDocument();
    expect(screen.getByText("Editar")).toBeInTheDocument();
    expect(screen.getByText("Excluir")).toBeInTheDocument();
  });

  it("calls deleteLead when confirming delete", async () => {
    render(
      <LeadActionsMenu
        leadId="1"
        onView={vi.fn()}
        onEdit={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Excluir"));
    fireEvent.click(screen.getByText("Excluir"));

    await waitFor(() => {
      expect(mutateDelete).toHaveBeenCalled();
    });
  });
});