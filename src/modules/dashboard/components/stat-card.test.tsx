import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatCard } from "@/modules/dashboard/components/stat-card";

describe("StatCard", () => {
  it("renders label and value", () => {
    render(<StatCard label="Total de Leads" value={150} />);

    expect(screen.getByText("Total de Leads")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  it("renders string value", () => {
    render(<StatCard label="Status Mais Ativo" value="Em Atendimento" />);

    expect(screen.getByText("Status Mais Ativo")).toBeInTheDocument();
    expect(screen.getByText("Em Atendimento")).toBeInTheDocument();
  });

  it("renders badge when provided", () => {
    render(
      <StatCard
        label="Leads Novos"
        value={20}
        badge="Este mês"
        badgeVariant="blue"
      />,
    );

    expect(screen.getByText("Este mês")).toBeInTheDocument();
  });

  it("does not render badge when not provided", () => {
    render(<StatCard label="Total" value={10} />);

    expect(screen.queryByText("Este mês")).not.toBeInTheDocument();
  });

  it("renders all badge variants", () => {
    const variants = ["green", "blue", "red", "gray"] as const;

    variants.forEach((variant) => {
      const { unmount } = render(
        <StatCard
          label="Teste"
          value={1}
          badge="Badge"
          badgeVariant={variant}
        />,
      );

      expect(screen.getByText("Badge")).toBeInTheDocument();

      unmount();
    });
  });

  it("uses gray as default badge variant", () => {
    render(<StatCard label="Teste" value={1} badge="Padrão" />);

    expect(screen.getByText("Padrão")).toBeInTheDocument();
  });
});
