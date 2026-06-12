import { cn } from '@/lib/utils'

interface LeadBadgeProps {
  status: string
}

const variants: Record<string, string> = {
  hot: 'bg-hot/10 text-hot border border-hot/20',
  warm: 'bg-warm/10 text-warm border border-warm/20',
  cold: 'bg-cold/10 text-cold border border-cold/20',
}

export const LeadBadge = ({ status }: LeadBadgeProps) => {
  const key = status?.toLowerCase()
  return (
    <span className={cn('text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase', variants[key] ?? 'bg-gray-100 text-text-muted border border-border')}>
      {status}
    </span>
  )
}