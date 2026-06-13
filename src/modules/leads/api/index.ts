import api from "@/lib/axios";

export interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  type: string;
  propertyType: string;
  city: string | null;
  neighborhood: string | null;
  budgetMin: number | null;
  budgetMax: number | null;
  origin: string;
  notes: string | null;
  userId: string;
  statusId: string;
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

export const createLead = async (payload: {
  name: string;
  email?: string;
  phone?: string;
  type: string;
  propertyType: string;
  city?: string;
  neighborhood?: string;
  budgetMin?: number;
  budgetMax?: number;
  origin: string;
  notes?: string;
}): Promise<Lead> => {
  const { data } = await api.post("/leads", payload);
  return data;
};

export const updateLead = async (
  id: string,
  payload: {
    name?: string;
    email?: string;
    phone?: string;
    type?: string;
    propertyType?: string;
    city?: string;
    neighborhood?: string;
    budgetMin?: number;
    budgetMax?: number;
    origin?: string;
    notes?: string;
    statusId?: string;
  }
): Promise<Lead> => {
  const { data } = await api.patch(`/leads/${id}`, payload);
  return data;
};

export const deleteLead = async (id: string): Promise<void> => {
  await api.delete(`/leads/${id}`);
};