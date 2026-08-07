import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RecentLeads } from "@/modules/dashboard/components/recent-leads";

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

const lead = {
  id: "1",
  name: "Diego Lopes",
  propertyType: "Apartamento",
  city: "Fortaleza",
  statusName: "Novo",
  statusColor: "#22c55e",
  createdAt: new Date().toISOString(),
};

describe("RecentLeads", () => {
  it("renders title", () => {
    render(<RecentLeads leads={[]} />);

    expect(screen.getByText("Leads Recentes")).toBeInTheDocument();
  });

  it("renders empty message when there are no leads", () => {
    render(<RecentLeads leads={[]} />);

    expect(screen.getByText("Nenhum lead recente.")).toBeInTheDocument();
  });

  it("renders link to leads page", () => {
    render(<RecentLeads leads={[]} />);

    const link = screen.getByRole("link", {
      name: "Ver Todos",
    });

    expect(link).toHaveAttribute("href", "/leads");
  });

  it("renders lead information", () => {
    render(<RecentLeads leads={[lead]} />);

    expect(screen.getByText("Diego Lopes")).toBeInTheDocument();
    expect(screen.getByText("Apartamento • Fortaleza")).toBeInTheDocument();
    expect(screen.getByText("Novo")).toBeInTheDocument();
  });

  it("renders property type without city", () => {
    render(
      <RecentLeads
        leads={[
          {
            ...lead,
            city: null,
            propertyType: "Casa",
            name: "Maria Silva",
            statusName: "Contato",
            statusColor: "#3b82f6",
          },
        ]}
      />,
    );

    expect(screen.getByText("Casa")).toBeInTheDocument();
    expect(screen.queryByText(/Casa •/)).not.toBeInTheDocument();
  });

  it("renders initials correctly", () => {
    render(<RecentLeads leads={[lead]} />);

    expect(screen.getByText("DL")).toBeInTheDocument();
  });

  it("renders multiple leads", () => {
    render(
      <RecentLeads
        leads={[
          lead,
          {
            ...lead,
            id: "2",
            name: "Maria Silva",
            propertyType: "Casa",
            city: "Recife",
            statusName: "Contato",
            statusColor: "#3b82f6",
          },
        ]}
      />,
    );

    expect(screen.getByText("Diego Lopes")).toBeInTheDocument();
    expect(screen.getByText("Maria Silva")).toBeInTheDocument();
  });

  it("applies status color", () => {
    render(<RecentLeads leads={[lead]} />);

    const status = screen.getByText("Novo");

    expect(status).toHaveStyle({
      color: "#22c55e",
    });
  });
});
