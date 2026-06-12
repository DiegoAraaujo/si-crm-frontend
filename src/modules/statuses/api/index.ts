import api from "@/lib/axios";

export interface Status {
  id: string;
  name: string;
  color?: string;
  order?: number;
}

export const getStatuses = async (): Promise<Status[]> => {
  const { data } = await api.get("/statuses");
  return data;
};

export const createStatus = async (payload: {
  name: string;
  color?: string;
}): Promise<Status> => {
  const { data } = await api.post("/statuses", payload);
  return data;
};

export const updateStatus = async (
  id: string,
  payload: { name?: string; color?: string },
): Promise<Status> => {
  const { data } = await api.patch(`/statuses/${id}`, payload);
  return data;
};

export const deleteStatus = async (id: string): Promise<void> => {
  await api.delete(`/statuses/${id}`);
};
