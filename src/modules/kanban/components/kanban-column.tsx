"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { KanbanCard } from "./kanban-card";
import { useDeleteStatus, useUpdateStatus } from "@/modules/statuses/hooks";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(column.name);
  const menuRef = useRef<HTMLDivElement>(null);

  const { mutate: deleteStatus } = useDeleteStatus();
  const { mutate: updateStatus } = useUpdateStatus();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = () => {
    setMenuOpen(false);
    deleteStatus(column.id);
  };

  const handleEditSubmit = () => {
    if (!editName.trim() || editName === column.name) {
      setEditing(false);
      return;
    }
    updateStatus(
      { id: column.id, payload: { name: editName } },
      { onSuccess: () => setEditing(false) },
    );
  };

  return (
    <div
      className="flex flex-col gap-3 min-w-72 w-72"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div className="flex flex-col gap-2">
        <div
          className="h-1 rounded-full w-full"
          style={{ backgroundColor: column.color }}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {editing ? (
              <div className="flex items-center gap-1">
                <input
                  autoFocus
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEditSubmit();
                    if (e.key === "Escape") setEditing(false);
                  }}
                  className="text-sm font-semibold text-text-base border-b border-primary outline-none bg-transparent w-28"
                />
                <button
                  onClick={handleEditSubmit}
                  className="text-xs font-semibold text-white bg-primary px-2 py-0.5 rounded-md"
                >
                  Ok
                </button>
              </div>
            ) : (
              <h3 className="font-semibold text-text-base text-sm">
                {column.name}
              </h3>
            )}
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${column.color}20`,
                color: column.color,
              }}
            >
              {column.leads?.length || 0}
            </span>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-1 hover:bg-gray-100 rounded-lg transition text-text-muted"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-7 z-20 bg-white border border-border rounded-xl shadow-lg w-40 py-1">
                <button
                  onClick={() => {
                    setEditing(true);
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-base hover:bg-gray-50 transition"
                >
                  <Pencil className="w-4 h-4 text-text-muted" />
                  Renomear
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-danger hover:bg-red-50 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Excluir
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 min-h-24">
        {column.leads?.map((lead) => (
          <KanbanCard key={lead.id} lead={lead} onDragStart={onDragStart} />
        ))}

        {(!column.leads || column.leads.length === 0) && (
          <div className="border-2 border-dashed border-border rounded-xl p-6 flex items-center justify-center">
            <p className="text-xs text-text-muted">Mova um card para aqui</p>
          </div>
        )}
      </div>
    </div>
  );
};
