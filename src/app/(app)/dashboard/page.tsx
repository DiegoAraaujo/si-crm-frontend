"use client";

import { useDashboard } from "@/modules/dashboard/hooks";
import { StatCard } from "@/modules/dashboard/components/stat-card";
import { RecentLeads } from "@/modules/dashboard/components/recent-leads";
import { RecentActivities } from "@/modules/dashboard/components/recent-activities";
import { DistributionChart } from "@/modules/dashboard/components/distribution-chart";

const DashboardPage = () => {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-text-base">Dashboard</h1>
        <p className="text-text-muted text-sm mt-1">
          Visão geral do desempenho de vendas e leads.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total de Leads" value={data?.stats.totalLeads ?? 0} />
        <StatCard
          label="Leads Novos"
          value={data?.stats.newLeads ?? 0}
          badge="Este mês"
          badgeVariant="blue"
        />
        <StatCard
          label="Status Mais Ativo"
          value={data?.stats.topStatus ?? "—"}
        />
        <StatCard
          label="Distribuições"
          value={data?.boardDistribution.length ?? 0}
          badge="Status"
          badgeVariant="gray"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DistributionChart
          title="Leads por Status"
          data={data?.boardDistribution ?? []}
          total={data?.stats.totalLeads ?? 0}
        />
        <DistributionChart
          title="Tipo de Interesse"
          data={data?.typeDistribution ?? []}
          total={data?.stats.totalLeads ?? 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DistributionChart
          title="Origem dos Leads"
          data={data?.originDistribution ?? []}
          total={data?.stats.totalLeads ?? 0}
        />
        <DistributionChart
          title="Tipos de Imóvel"
          data={data?.propertyTypeDistribution ?? []}
          total={data?.stats.totalLeads ?? 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentLeads leads={data?.recentLeads ?? []} />
        <RecentActivities activities={data?.recentActivities ?? []} />
      </div>
    </div>
  );
};

export default DashboardPage;
