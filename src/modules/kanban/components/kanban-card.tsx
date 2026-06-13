"use client";

import { Calendar, MessageSquare } from "lucide-react";
import type { Lead } from "@/modules/leads/api";

interface KanbanCardProps {
  lead: Lead;
  onDragStart: (e: React.DragEvent, leadId: string) => void;
}

export const KanbanCard = ({ lead, onDragStart }: KanbanCardProps) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, lead.id)}
      onDragOver={(e) => e.preventDefault()}
      className="bg-white border border-border rounded-xl p-4 flex flex-col gap-3 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
    >
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
