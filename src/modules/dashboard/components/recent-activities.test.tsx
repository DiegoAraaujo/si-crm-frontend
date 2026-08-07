import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RecentActivities } from "@/modules/dashboard/components/recent-activities";

const activity = {
  id: "1",
  action: "Atualizou o lead",
  leadName: "Diego Lopes",
  createdAt: new Date("2026-01-01T10:30:00").toISOString(),
};

describe("RecentActivities", () => {
  it("renders title", () => {
    render(<RecentActivities activities={[]} />);

    expect(screen.getByText("Atividades Recentes")).toBeInTheDocument();
  });

  it("renders empty message when there are no activities", () => {
    render(<RecentActivities activities={[]} />);

    expect(screen.getByText("Nenhuma atividade recente.")).toBeInTheDocument();
  });

  it("renders activity information", () => {
    render(<RecentActivities activities={[activity]} />);

    expect(screen.getByText("Atualizou o lead")).toBeInTheDocument();
    expect(screen.getByText("Diego Lopes")).toBeInTheDocument();
  });

  it("renders formatted date", () => {
    render(<RecentActivities activities={[activity]} />);

    const formattedDate = new Date(activity.createdAt).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      },
    );

    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it("renders multiple activities", () => {
    render(
      <RecentActivities
        activities={[
          activity,
          {
            ...activity,
            id: "2",
            action: "Criou o lead",
            leadName: "Maria Silva",
          },
        ]}
      />,
    );

    expect(screen.getByText("Atualizou o lead")).toBeInTheDocument();
    expect(screen.getByText("Criou o lead")).toBeInTheDocument();
    expect(screen.getByText("Diego Lopes")).toBeInTheDocument();
    expect(screen.getByText("Maria Silva")).toBeInTheDocument();
  });

  it("renders one activity icon for each activity", () => {
    const { container } = render(
      <RecentActivities
        activities={[
          activity,
          {
            ...activity,
            id: "2",
          },
        ]}
      />,
    );

    const icons = container.querySelectorAll("svg");

    expect(icons.length).toBe(2);
  });
});
