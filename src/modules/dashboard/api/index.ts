import api from "@/lib/axios";

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  inNegotiation: number;
  closedLeads: number;
}

export interface RecentLead {
  id: string;
  name: string;
  property: string;
  value: string;
  status: string;
}

export interface RecentActivity {
  id: string;
  description: string;
  time: string;
  agent: string;
  type: "call" | "email" | "system";
}

export interface FunnelData {
  new: number;
  qualified: number;
  proposal: number;
  closed: number;
}

export interface BoardData {
  name: string;
  count: number;
}

export interface DashboardData {
  stats: DashboardStats;
  funnel: FunnelData;
  recentLeads: RecentLead[];
  recentActivities: RecentActivity[];
  boardDistribution: BoardData[];
}

export const getDashboard = async (): Promise<DashboardData> => {
  const [leadsRes, activitiesRes] = await Promise.all([
    api.get("/leads"),
    api.get("/activities"),
  ]);

  const leads = leadsRes.data;
  const activities = activitiesRes.data;

  const stats: DashboardStats = {
    totalLeads: leads.length,
    newLeads: leads.filter((l: any) => l.status === "new").length,
    inNegotiation: leads.filter((l: any) => l.status === "negotiation").length,
    closedLeads: leads.filter((l: any) => l.status === "closed").length,
  };

  return {
    stats,
    funnel: {
      new: leads.length,
      qualified: Math.floor(leads.length * 0.82),
      proposal: Math.floor(leads.length * 0.33),
      closed: stats.closedLeads,
    },
    recentLeads: leads.slice(0, 5),
    recentActivities: activities.slice(0, 5),
    boardDistribution: [
      {
        name: "Residencial",
        count: leads.filter((l: any) => l.type === "residential").length,
      },
      {
        name: "Comercial",
        count: leads.filter((l: any) => l.type === "commercial").length,
      },
      {
        name: "Lançamentos",
        count: leads.filter((l: any) => l.type === "launch").length,
      },
    ],
  };
};
