import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { KanbanCard } from "@/modules/kanban/components/kanban-card";

const onDragStart = vi.fn();

const lead = {
  id: "1",
  name: "Diego Lopes",
  propertyType: "Apartamento",
  neighborhood: "Aldeota",
  createdAt: "2026-01-01T10:30:00.000Z",
};

describe("KanbanCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders lead name", () => {
    render(<KanbanCard lead={lead as any} onDragStart={onDragStart} />);

    expect(screen.getByText("Diego Lopes")).toBeInTheDocument();
  });

  it("renders property type and neighborhood", () => {
    render(<KanbanCard lead={lead as any} onDragStart={onDragStart} />);

    expect(screen.getByText("Apartamento, Aldeota")).toBeInTheDocument();
  });

  it("renders property type without neighborhood", () => {
    render(
      <KanbanCard
        lead={
          {
            ...lead,
            neighborhood: null,
          } as any
        }
        onDragStart={onDragStart}
      />,
    );

    expect(screen.getByText("Apartamento")).toBeInTheDocument();
    expect(screen.queryByText(/Apartamento,/)).not.toBeInTheDocument();
  });

  it("renders formatted date", () => {
    render(<KanbanCard lead={lead as any} onDragStart={onDragStart} />);

    const formatted = new Date(lead.createdAt).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });

    expect(screen.getByText(formatted)).toBeInTheDocument();
  });

  it("calls onDragStart", () => {
    render(<KanbanCard lead={lead as any} onDragStart={onDragStart} />);

    const card = screen.getByText("Diego Lopes").closest("[draggable]");

    fireEvent.dragStart(card!);

    expect(onDragStart).toHaveBeenCalledTimes(1);
    expect(onDragStart.mock.calls[0][1]).toBe("1");
  });

  it("is draggable", () => {
    render(<KanbanCard lead={lead as any} onDragStart={onDragStart} />);

    const card = screen.getByText("Diego Lopes").closest("[draggable]");

    expect(card).toHaveAttribute("draggable", "true");
  });

  it("does not render property information when property type is missing", () => {
    render(
      <KanbanCard
        lead={
          {
            ...lead,
            propertyType: null,
            neighborhood: null,
          } as any
        }
        onDragStart={onDragStart}
      />,
    );

    expect(screen.queryByText("Apartamento")).not.toBeInTheDocument();
  });

  it("renders message icon", () => {
    const { container } = render(
      <KanbanCard lead={lead as any} onDragStart={onDragStart} />,
    );

    const icons = container.querySelectorAll("svg");

    expect(icons.length).toBeGreaterThanOrEqual(2);
  });
});
