import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DistributionChart } from "@/modules/dashboard/components/distribution-chart";

describe("DistributionChart", () => {
  it("renders title", () => {
    render(<DistributionChart title="Leads por Status" data={[]} total={0} />);

    expect(screen.getByText("Leads por Status")).toBeInTheDocument();
  });

  it("shows empty message when there is no data", () => {
    render(<DistributionChart title="Leads por Status" data={[]} total={0} />);

    expect(screen.getByText("Nenhum dado disponível.")).toBeInTheDocument();
  });

  it("renders every distribution item", () => {
    render(
      <DistributionChart
        title="Distribuição"
        total={20}
        data={[
          {
            name: "COMPRA",
            count: 10,
          },
          {
            name: "ALUGUEL",
            count: 5,
          },
        ]}
      />,
    );

    expect(screen.getByText("Compra")).toBeInTheDocument();
    expect(screen.getByText("Aluguel")).toBeInTheDocument();

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders original name when label does not exist", () => {
    render(
      <DistributionChart
        title="Teste"
        total={10}
        data={[
          {
            name: "CUSTOM_STATUS",
            count: 7,
          },
        ]}
      />,
    );

    expect(screen.getByText("CUSTOM_STATUS")).toBeInTheDocument();
  });

  it("uses custom color when provided", () => {
    const { container } = render(
      <DistributionChart
        title="Teste"
        total={10}
        data={[
          {
            name: "COMPRA",
            count: 5,
            color: "#ff0000",
          },
        ]}
      />,
    );

    const bar = container.querySelector('[style*="background-color"]');

    expect(bar).toHaveStyle({
      backgroundColor: "#ff0000",
    });
  });

  it("calculates percentage width correctly", () => {
    const { container } = render(
      <DistributionChart
        title="Teste"
        total={100}
        data={[
          {
            name: "COMPRA",
            count: 25,
          },
        ]}
      />,
    );

    const bar = container.querySelector('[style*="width"]');

    expect(bar).toHaveStyle({
      width: "25%",
    });
  });

  it("limits percentage to 100%", () => {
    const { container } = render(
      <DistributionChart
        title="Teste"
        total={10}
        data={[
          {
            name: "COMPRA",
            count: 50,
          },
        ]}
      />,
    );

    const bar = container.querySelector('[style*="width"]');

    expect(bar).toHaveStyle({
      width: "100%",
    });
  });

  it("does not divide by zero", () => {
    const { container } = render(
      <DistributionChart
        title="Teste"
        total={0}
        data={[
          {
            name: "COMPRA",
            count: 8,
          },
        ]}
      />,
    );

    const bar = container.querySelector('[style*="width"]');

    expect(bar).toHaveStyle({
      width: "100%",
    });
  });

  it("renders multiple progress bars", () => {
    const { container } = render(
      <DistributionChart
        title="Teste"
        total={100}
        data={[
          {
            name: "COMPRA",
            count: 20,
          },
          {
            name: "ALUGUEL",
            count: 30,
          },
          {
            name: "CASA",
            count: 50,
          },
        ]}
      />,
    );

    const bars = container.querySelectorAll('[style*="width"]');

    expect(bars.length).toBe(3);
  });
});
