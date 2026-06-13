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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { mutate: deleteLead, isPending } = useDeleteLead();

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
    deleteLead(leadId, { onSuccess: () => setConfirmOpen(false) });
  };

  return (
    <>
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
              onClick={() => {
                setConfirmOpen(true);
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-danger hover:bg-red-50 transition"
            >
              <Trash2 className="w-4 h-4" />
              Excluir
            </button>
          </div>
        )}
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setConfirmOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h2 className=" font-bold text-text-base text-left">
                Excluir lead
              </h2>
              <p className="text-sm text-text-muted text-left">
                Tem certeza que deseja excluir este lead? Esta ação não pode ser
                desfeita.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-text-muted hover:bg-gray-100 rounded-lg transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="px-4 py-2.5 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white rounded-lg transition disabled:opacity-50"
              >
                {isPending ? "Excluindo..." : "Excluir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
