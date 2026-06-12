"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";
import { useDeleteLead } from "../hooks";

interface LeadActionsMenuProps {
  leadId: string;
  onView: () => void;
  onEdit: () => void;
}

export const LeadActionsMenu = ({
  leadId,
  onView,
  onEdit,
}: LeadActionsMenuProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { mutate: deleteLead } = useDeleteLead();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja excluir este lead?")) {
      deleteLead(leadId);
    }
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-1.5 rounded-lg hover:bg-gray-100 transition text-text-muted"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-8 bg-white border border-border rounded-xl shadow-lg z-50 w-40 py-1 overflow-hidden">
          <button
            onClick={() => {
              onView();
              setOpen(false);
            }}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-text-base hover:bg-gray-50 transition"
          >
            <Eye className="w-4 h-4 text-text-muted" />
            Detalhes
          </button>
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-text-base hover:bg-gray-50 transition"
          >
            <Pencil className="w-4 h-4 text-text-muted" />
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-danger hover:bg-danger-light transition"
          >
            <Trash2 className="w-4 h-4" />
            Excluir
          </button>
        </div>
      )}
    </div>
  );
};
