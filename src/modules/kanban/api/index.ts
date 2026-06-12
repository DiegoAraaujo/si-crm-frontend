import api from '@/lib/axios'
import type { Lead } from '@/modules/leads/api'
import type { Status } from '@/modules/statuses/api'

export interface KanbanColumn {
  status: Status
  leads: Lead[]
}

export const getKanban = async (): Promise<KanbanColumn[]> => {
  const { data } = await api.get('/kanban')
  return data
}

export const moveLead = async (leadId: string, statusId: string): Promise<void> => {
  await api.patch(`/kanban/${leadId}/move`, { statusId })
}