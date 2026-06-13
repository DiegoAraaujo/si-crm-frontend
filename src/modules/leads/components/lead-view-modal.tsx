"use client";

import { X, Phone, Mail, MapPin, Home, DollarSign, Tag } from "lucide-react";
import { useStatuses } from "@/modules/statuses/hooks";
import type { Lead } from "../api";

interface LeadViewModalProps {
  open: boolean;
  onClose: () => void;
  lead?: Lead;
}

const originLabels: Record<string, string> = {
  WHATSAPP: "WhatsApp",
  SITE: "Site",
  INDICACAO: "Indicação",
  INSTAGRAM: "Instagram",
  FACEBOOK: "Facebook",
  LINKEDIN: "LinkedIn",
  GOOGLE: "Google",
  PORTAL_IMOVEIS: "Portal de Imóveis",
  EMAIL: "E-mail",
  TELEFONE: "Telefone",
  VISITA_PRESENCIAL: "Visita Presencial",
  EVENTO: "Evento",
  OUTDOOR: "Outdoor",
  TV: "TV",
  RADIO: "Rádio",
};

const propertyTypeLabels: Record<string, string> = {
  APARTAMENTO: "Apartamento",
  CASA: "Casa",
  COBERTURA: "Cobertura",
  STUDIO: "Studio",
  KITNET: "Kitnet",
  TERRENO: "Terreno",
  SALA_COMERCIAL: "Sala Comercial",
  LOJA: "Loja",
  GALPAO: "Galpão",
  CHACARA: "Chácara",
  FAZENDA: "Fazenda",
  FLAT: "Flat",
  LOFT: "Loft",
  SOBRADO: "Sobrado",
  CASA_CONDOMINIO: "Casa em Condomínio",
  PENTHOUSE: "Penthouse",
};

const Field = ({ label, value }: { label: string; value?: string | null }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-xs font-medium text-text-muted uppercase tracking-widest">
      {label}
    </span>
    <span className="text-sm text-text-base">{value || "—"}</span>
  </div>
);

export const LeadViewModal = ({ open, onClose, lead }: LeadViewModalProps) => {
  const { data: statuses } = useStatuses();

  if (!open || !lead) return null;

  const statusName = statuses?.find((s) => s.id === lead.statusId)?.name ?? "—";
  const statusColor =
    statuses?.find((s) => s.id === lead.statusId)?.color ?? "#888";

  const formatBudget = (value?: number | null) => {
    if (!value) return null;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-lg font-bold text-text-base">{lead.name}</h2>
            <p className="text-xs text-text-muted mt-0.5">
              CÓDIGO: #{lead.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: `${statusColor}20`,
                color: statusColor,
              }}
            >
              {statusName}
            </span>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5 text-text-muted" />
            </button>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Identificação
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Nome completo" value={lead.name} />
              <Field label="Telefone" value={lead.phone} />
              <Field label="E-mail" value={lead.email} />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Interesse Imobiliário
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Tipo de Interesse"
                value={lead.type === "COMPRA" ? "Compra" : "Aluguel"}
              />
              <Field
                label="Tipo de Imóvel"
                value={
                  propertyTypeLabels[lead.propertyType] ?? lead.propertyType
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Preferências
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Orçamento mínimo"
                value={formatBudget(lead.budgetMin)}
              />
              <Field
                label="Orçamento máximo"
                value={formatBudget(lead.budgetMax)}
              />
              <Field label="Cidade" value={lead.city} />
              <Field label="Bairro" value={lead.neighborhood} />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              CRM
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Origem do Lead"
                value={originLabels[lead.origin] ?? lead.origin}
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-medium text-text-muted uppercase tracking-widest">
                  Data de Cadastro
                </span>
                <span className="text-sm text-text-base">
                  {new Date(lead.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {lead.notes && (
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                Observações
              </h3>
              <p className="text-sm text-text-base bg-gray-50 rounded-xl p-4 leading-relaxed">
                {lead.notes}
              </p>
            </div>
          )}

          <div className="flex justify-end pt-2 border-t border-border">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-text-muted hover:bg-gray-100 rounded-lg transition"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
