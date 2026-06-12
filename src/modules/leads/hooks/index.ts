import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLeads, getLead, createLead, updateLead, deleteLead } from "../api";

export const useLeads = (params?: {
  search?: string;
  statusId?: string;
  origin?: string;
}) => {
  return useQuery({
    queryKey: ["leads", params],
    queryFn: () => getLeads(params),
  });
};

export const useLead = (id: string) => {
  return useQuery({
    queryKey: ["leads", id],
    queryFn: () => getLead(id),
    enabled: !!id,
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] }),
  });
};

export const useUpdateLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<any> }) =>
      updateLead(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] }),
  });
};

export const useDeleteLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] }),
  });
};
