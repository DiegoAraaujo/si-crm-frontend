"use client";

import { Calendar, MessageSquare, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lead } from "@/modules/leads/api";

interface KanbanCardProps {
  lead: Lead;
  onDragStart: (e: React.DragEvent, leadId: string) => void;
}

const priorityColors: Record<string, string> = {
  hot: "text-hot bg-hot/10",
  warm: "text-warm bg-warm/10",
  cold: "text-cold bg-cold/10",
};

export const KanbanCard = ({ lead, onDragStart }: KanbanCardProps) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, lead.id)}
      className="bg-white border border-border rounded-xl p-4 flex flex-col gap-3 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
    >
      {lead.status && (
        <span
          className={cn(
            "text-xs font-semibold uppercase w-fit px-2 py-0.5 rounded-full",
            priorityColors[lead.status?.toLowerCase()] ??
              "text-text-muted bg-gray-100",
          )}
        >
          {lead.status}
        </span>
      )}

      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-semibold text-text-base">{lead.name}</p>
        {lead.propertyType && (
          <p className="text-xs text-text-muted">
            {lead.propertyType}
            {lead.neighborhood ? `, ${lead.neighborhood}` : ""}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-text-muted">
        {lead.createdAt && (
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>
              {new Date(lead.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "short",
              })}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 ml-auto">
          <MessageSquare className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
