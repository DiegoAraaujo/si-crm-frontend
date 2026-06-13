import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStatuses, createStatus, updateStatus, deleteStatus } from "../api";

export const useStatuses = () => {
  return useQuery({
    queryKey: ["statuses"],
    queryFn: getStatuses,
  });
};

export const useCreateStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
      queryClient.invalidateQueries({ queryKey: ["kanban"] });
    },
  });
};

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: { name?: string; color?: string };
    }) => updateStatus(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
      queryClient.invalidateQueries({ queryKey: ["kanban"] });
    },
  });
};

export const useDeleteStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
      queryClient.invalidateQueries({ queryKey: ["kanban"] });
    },
  });
};
