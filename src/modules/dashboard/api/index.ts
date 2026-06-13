import api from "@/lib/axios";

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  topStatus: string;
  topStatusColor: string;
}

export interface RecentLead {
  id: string;
  name: string;
  propertyType: string;
  city: string | null;
  statusName: string;
  statusColor: string;
  createdAt: string;
}

export interface RecentActivity {
  id: string;
  action: string;
  leadName: string;
  createdAt: string;
}

export interface BoardData {
  name: string;
  color: string;
  count: number;
}

export interface DistributionData {
  name: string;
  count: number;
}

export interface DashboardData {
  stats: DashboardStats;
  boardDistribution: BoardData[];
  originDistribution: DistributionData[];
  propertyTypeDistribution: DistributionData[];
  typeDistribution: DistributionData[];
  recentLeads: RecentLead[];
  recentActivities: RecentActivity[];
}

export const getDashboard = async (): Promise<DashboardData> => {
  const { data } = await api.get("/dashboard");
  return data;
};
