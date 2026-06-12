"use client";

import { useDashboard } from "@/modules/dashboard/hooks";
import { StatCard } from "@/modules/dashboard/components/stat-card";
import { RecentLeads } from "@/modules/dashboard/components/recent-leads";
import { RecentActivities } from "@/modules/dashboard/components/recent-activities";
import { FunnelChart } from "@/modules/dashboard/components/funnel-chart";

const DashboardPage = () => {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const funnelItems = data
    ? [
        {
          label: "Captados",
          value: data.funnel.new,
          max: data.funnel.new,
          color: "#1e3a7b",
        },
        {
          label: `Qualificados (82%)`,
          value: data.funnel.qualified,
          max: data.funnel.new,
          color: "#1e3a7b",
        },
        {
          label: `Negociação (33%)`,
          value: data.funnel.proposal,
          max: data.funnel.new,
          color: "#1e3a7b",
        },
        {
          label: `Fechados (12%)`,
          value: data.funnel.closed,
          max: data.funnel.new,
          color: "#10b981",
        },
      ]
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-text-base">Dashboard</h1>
        <p className="text-text-muted text-sm mt-1">
          Visão geral do desempenho de vendas e leads.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total de Leads"
          value={data?.stats.totalLeads ?? 0}
          badge="↗ 12%"
          badgeVariant="green"
        />
        <StatCard
          label="Leads Novos"
          value={data?.stats.newLeads ?? 0}
          badge="Este mês"
          badgeVariant="blue"
        />
        <StatCard
          label="Em Negociação"
          value={data?.stats.inNegotiation ?? 0}
        />
        <StatCard
          label="Leads Fechados"
          value={data?.stats.closedLeads ?? 0}
          badge="+5 vs UP"
          badgeVariant="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-sidebar border border-border rounded-xl p-5 flex flex-col gap-4">
          <h2 className="font-bold text-text-base">Funil de Conversão</h2>
          <FunnelChart data={funnelItems} />
        </div>

        <div className="bg-sidebar border border-border rounded-xl p-5 flex flex-col gap-4">
          <h2 className="font-bold text-text-base">Leads por Quadro</h2>
          <div className="flex flex-col gap-3">
            {data?.boardDistribution.map((board) => (
              <div key={board.name} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">{board.name}</span>
                  <span className="font-semibold text-text-base">
                    {board.count}
                  </span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${Math.min((board.count / (data.stats.totalLeads || 1)) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentLeads leads={data?.recentLeads ?? []} />
        <RecentActivities activities={data?.recentActivities ?? []} />
      </div>
    </div>
  );
};

export default DashboardPage;
