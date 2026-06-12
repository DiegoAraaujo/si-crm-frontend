import api from "@/lib/axios";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  origin: string;
  interestType: string;
  propertyType: string;
  city: string;
  neighborhood: string;
  budgetMin: number;
  budgetMax: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export const getLeads = async (params?: {
  search?: string;
  statusId?: string;
  origin?: string;
}): Promise<Lead[]> => {
  const { data } = await api.get("/leads", { params });
  return data;
};

export const getLead = async (id: string): Promise<Lead> => {
  const { data } = await api.get(`/leads/${id}`);
  return data;
};

export const createLead = async (payload: Partial<Lead>): Promise<Lead> => {
  const { data } = await api.post("/leads", payload);
  return data;
};

export const updateLead = async (
  id: string,
  payload: Partial<Lead>,
): Promise<Lead> => {
  const { data } = await api.patch(`/leads/${id}`, payload);
  return data;
};

export const deleteLead = async (id: string): Promise<void> => {
  await api.delete(`/leads/${id}`);
};
