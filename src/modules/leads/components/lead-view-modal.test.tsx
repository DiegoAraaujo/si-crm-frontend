import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LeadViewModal } from "./lead-view-modal";

vi.mock("@/modules/statuses/hooks", () => ({
  useStatuses: () => ({
    data: [{ id: "1", name: "Novo", color: "#000" }],
  }),
}));

describe("LeadViewModal", () => {
  it("renders lead name", () => {
    render(
      <LeadViewModal
        open={true}
        onClose={() => {}}
        lead={
          {
            id: "12345678",
            name: "João Teste",
            email: "joao@email.com",
            phone: "11999999999",
            type: "COMPRA",
            propertyType: "CASA",
            origin: "SITE",
            statusId: "1",
            createdAt: new Date().toISOString(),
          } as any
        }
      />,
    );

    // ✅ MAIS ESPECÍFICO (resolve o erro)
    expect(screen.getByRole("heading", { name: "João Teste" })).toBeDefined();
  });
});
