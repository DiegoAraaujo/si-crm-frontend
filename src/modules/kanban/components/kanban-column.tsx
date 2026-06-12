"use client";

import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { KanbanCard } from "./kanban-card";
import type { KanbanColumn as KanbanColumnType } from "../api";

interface KanbanColumnProps {
  column: KanbanColumnType;
  onDragStart: (e: React.DragEvent, leadId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, statusId: string) => void;
}

export const KanbanColumn = ({
  column,
  onDragStart,
  onDragOver,
  onDrop,
}: KanbanColumnProps) => {
  return (
    <div
      className="flex flex-col gap-3 min-w-72 w-72"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.status.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-text-base text-sm">
            {column.status.name}
          </h3>
          <span className="bg-primary-light text-primary text-xs font-bold px-2 py-0.5 rounded-full">
            {column.leads.length}
          </span>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded-lg transition text-text-muted">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-2 min-h-24">
        {column.leads.map((lead) => (
          <KanbanCard key={lead.id} lead={lead} onDragStart={onDragStart} />
        ))}

        {column.leads.length === 0 && (
          <div className="border-2 border-dashed border-border rounded-xl p-6 flex items-center justify-center">
            <p className="text-xs text-text-muted">Mova um card para aqui</p>
          </div>
        )}
      </div>
    </div>
  );
};
