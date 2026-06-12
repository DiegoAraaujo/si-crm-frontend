import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getKanban, moveLead } from '../api'

export const useKanban = () => {
  return useQuery({
    queryKey: ['kanban'],
    queryFn: getKanban,
  })
}

export const useMoveLead = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ leadId, statusId }: { leadId: string; statusId: string }) =>
      moveLead(leadId, statusId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['kanban'] }),
  })
}