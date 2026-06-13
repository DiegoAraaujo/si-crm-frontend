"use client";

import { useState, useRef } from "react";
import { Plus } from "lucide-react";
import { useKanban } from "@/modules/kanban/hooks";
import { useMoveLead } from "@/modules/kanban/hooks";
import { KanbanColumn } from "@/modules/kanban/components/kanban-column";
import { CreateStatusModal } from "@/modules/kanban/components/create-status-modal";

const KanbanPage = () => {
  const { data: columns, isLoading } = useKanban();
  const { mutate: moveLead } = useMoveLead();
  const [modalOpen, setModalOpen] = useState(false);
  const dragLeadId = useRef<string | null>(null);

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    dragLeadId.current = leadId;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, statusId: string) => {
    e.preventDefault();
    if (dragLeadId.current) {
      moveLead({ leadId: dragLeadId.current, statusId });
      dragLeadId.current = null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text-base">Kanban</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            Novo Status
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns?.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          ))}

          {columns?.length === 0 && (
            <div className="flex items-center justify-center w-full h-64 text-text-muted text-sm">
              Nenhum status criado. Crie um status para começar.
            </div>
          )}
        </div>
      </div>

      <CreateStatusModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default KanbanPage;