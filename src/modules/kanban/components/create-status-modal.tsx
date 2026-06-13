"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useCreateStatus } from "@/modules/statuses/hooks";
import { useStatuses } from "@/modules/statuses/hooks";

const PRESET_COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
];

interface CreateStatusModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateStatusModal = ({
  open,
  onClose,
}: CreateStatusModalProps) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const { mutate: createStatus, isPending } = useCreateStatus();
  const { data: statuses } = useStatuses();

  const handleSubmit = () => {
    if (!name.trim()) return;
    const order = statuses ? statuses.length : 0;
    createStatus(
      { name, color, order },
      {
        onSuccess: () => {
          setName("");
          setColor(PRESET_COLORS[0]);
          onClose();
        },
      },
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-base">Novo Status</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text-base">
            Nome do status
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Visita Agendada"
            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-text-base placeholder:text-text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text-base">
            Cor do status
          </label>
          <div className="flex gap-2 flex-wrap">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className="w-7 h-7 rounded-full transition ring-offset-2"
                style={{
                  backgroundColor: c,
                  outline: color === c ? `2px solid ${c}` : "none",
                  outlineOffset: "2px",
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-text-muted hover:bg-gray-100 rounded-lg transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending || !name.trim()}
            className="px-6 py-2.5 text-sm font-semibold bg-primary hover:bg-primary-dark text-white rounded-lg transition disabled:opacity-50"
          >
            {isPending ? "Criando..." : "Criar Status"}
          </button>
        </div>
      </div>
    </div>
  );
};
