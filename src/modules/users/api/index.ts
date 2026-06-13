import api from "@/lib/axios";

export interface User {
  id: string;
  name: string;
  email: string;
}

export const getMe = async (): Promise<User> => {
  const { data } = await api.get("/users/me");
  return data;
};

export const updateMe = async (payload: { name: string }): Promise<User> => {
  const { data } = await api.patch("/users/me", payload);
  return data;
};
