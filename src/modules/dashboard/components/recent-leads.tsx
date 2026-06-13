import Link from "next/link";
import { cn } from "@/lib/utils";
import type { RecentLead } from "../api";

interface RecentLeadsProps {
  leads: RecentLead[];
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const avatarColors = [
  "bg-primary",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-purple-500",
];

export const RecentLeads = ({ leads }: RecentLeadsProps) => {
  return (
    <div className="bg-sidebar border border-border rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-text-base">Leads Recentes</h2>
        <Link
          href="/leads"
          className="text-xs text-primary font-medium hover:underline"
        >
          Ver Todos
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {leads.length === 0 && (
          <p className="text-sm text-text-muted">Nenhum lead recente.</p>
        )}
        {leads.map((lead, i) => (
          <div key={lead.id} className="flex items-center gap-3">
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0",
                avatarColors[i % avatarColors.length],
              )}
            >
              {getInitials(lead.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-base truncate">
                {lead.name}
              </p>
              <p className="text-xs text-text-muted truncate">
                {lead.propertyType}
                {lead.city ? ` • ${lead.city}` : ""}
              </p>
            </div>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{
                backgroundColor: `${lead.statusColor}20`,
                color: lead.statusColor,
              }}
            >
              {lead.statusName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
