"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { leadSchema, type LeadSchema } from "../schemas";
import { useCreateLead, useUpdateLead } from "../hooks";
import { cn } from "@/lib/utils";
import type { Lead } from "../api";

interface LeadFormModalProps {
  open: boolean;
  onClose: () => void;
  lead?: Lead;
}

const inputClass =
  "w-full border border-border rounded-lg px-3 py-2.5 text-sm text-text-base placeholder:text-text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary transition";

export const LeadFormModal = ({ open, onClose, lead }: LeadFormModalProps) => {
  const { mutate: createLead, isPending: isCreating } = useCreateLead();
  const { mutate: updateLead, isPending: isUpdating } = useUpdateLead();

  // Informamos o LeadSchema ao useForm para que o TypeScript saiba exatamente o tipo de cada erro
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadSchema>({
    resolver: zodResolver(leadSchema),
  });

  useEffect(() => {
    if (lead) {
      // Fazemos o map das propriedades que vêm da API para o formato esperado pelo formulário
      reset({
        name: lead.name,
        email: lead.email || "",
        phone: lead.phone || "",
        type: lead.type as "COMPRA" | "ALUGUEL",
        propertyType: lead.propertyType as any,
        city: lead.city || "",
        neighborhood: lead.neighborhood || "",
        budgetMin: lead.budgetMin?.toString() || "",
        budgetMax: lead.budgetMax?.toString() || "",
        origin: lead.origin as any,
        notes: lead.notes || "",
      });
    } else {
      reset({
        name: "",
        email: "",
        phone: "",
        city: "",
        neighborhood: "",
        budgetMin: "",
        budgetMax: "",
        notes: "",
      });
    }
  }, [lead, reset]);

  const onSubmit = (data: LeadSchema) => {
    const payload = {
      name: data.name,
      email: data.email || undefined,
      phone: data.phone || undefined,
      type: data.type,
      propertyType: data.propertyType,
      city: data.city || undefined,
      neighborhood: data.neighborhood || undefined,
      budgetMin: data.budgetMin ? Number(data.budgetMin) : undefined,
      budgetMax: data.budgetMax ? Number(data.budgetMax) : undefined,
      origin: data.origin,
      notes: data.notes || undefined,
    };

    if (lead) {
      updateLead({ id: lead.id, payload }, { onSuccess: onClose });
    } else {
      createLead(payload as any, { onSuccess: onClose });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-lg font-bold text-text-base">
              {lead ? "Editar Lead" : "Novo Lead"}
            </h2>
            {lead && (
              <p className="text-xs text-text-muted mt-0.5">
                CÓDIGO: #{lead.id.slice(0, 8).toUpperCase()}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Identificação
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-text-muted">
                  Nome completo
                </label>
                <input
                  {...register("name")}
                  placeholder="Ricardo Silva"
                  className={cn(inputClass, errors.name && "border-danger")}
                />
                {errors.name?.message && (
                  <span className="text-xs text-danger">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-text-muted">
                  Telefone
                </label>
                <input
                  {...register("phone")}
                  placeholder="+55 (11) 99999-9999"
                  className={cn(inputClass, errors.phone && "border-danger")}
                />
                {errors.phone?.message && (
                  <span className="text-xs text-danger">
                    {errors.phone.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-text-muted">
                  E-mail
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="exemplo@email.com"
                  className={cn(inputClass, errors.email && "border-danger")}
                />
                {errors.email?.message && (
                  <span className="text-xs text-danger">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Interesse Imobiliário
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-text-muted">
                  Tipo de Interesse
                </label>
                <select
                  {...register("type")}
                  className={cn(inputClass, errors.type && "border-danger")}
                >
                  <option value="">Selecione</option>
                  <option value="COMPRA">Compra</option>
                  <option value="ALUGUEL">Aluguel</option>
                </select>
                {errors.type?.message && (
                  <span className="text-xs text-danger">
                    {errors.type.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-text-muted">
                  Tipo de Imóvel
                </label>
                <select
                  {...register("propertyType")}
                  className={cn(
                    inputClass,
                    errors.propertyType && "border-danger",
                  )}
                >
                  <option value="">Selecione</option>
                  <option value="APARTAMENTO">Apartamento</option>
                  <option value="CASA">Casa</option>
                  <option value="COBERTURA">Cobertura</option>
                  <option value="STUDIO">Studio</option>
                  <option value="KITNET">Kitnet</option>
                  <option value="TERRENO">Terreno</option>
                  <option value="SALA_COMERCIAL">Sala Comercial</option>
                  <option value="LOJA">Loja</option>
                  <option value="GALPAO">Galpão</option>
                  <option value="CHACARA">Chácara</option>
                  <option value="FAZENDA">Fazenda</option>
                  <option value="FLAT">Flat</option>
                  <option value="LOFT">Loft</option>
                  <option value="SOBRADO">Sobrado</option>
                  <option value="CASA_CONDOMINIO">Casa em Condomínio</option>
                  <option value="PENTHOUSE">Penthouse</option>
                </select>
                {errors.propertyType?.message && (
                  <span className="text-xs text-danger">
                    {errors.propertyType.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Preferências
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-text-muted">
                  Orçamento mínimo
                </label>
                <input
                  {...register("budgetMin")}
                  type="number"
                  placeholder="500000"
                  className={cn(
                    inputClass,
                    errors.budgetMin && "border-danger",
                  )}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-text-muted">
                  Orçamento máximo
                </label>
                <input
                  {...register("budgetMax")}
                  type="number"
                  placeholder="850000"
                  className={cn(
                    inputClass,
                    errors.budgetMax && "border-danger",
                  )}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-text-muted">
                  Cidade
                </label>
                <input
                  {...register("city")}
                  placeholder="São Paulo"
                  className={cn(inputClass, errors.city && "border-danger")}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-text-muted">
                  Bairro
                </label>
                <input
                  {...register("neighborhood")}
                  placeholder="Vila Mariana"
                  className={cn(
                    inputClass,
                    errors.neighborhood && "border-danger",
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              CRM
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-text-muted">
                  Origem do Lead
                </label>
                <select
                  {...register("origin")}
                  className={cn(inputClass, errors.origin && "border-danger")}
                >
                  <option value="">Selecione</option>
                  <option value="WHATSAPP">WhatsApp</option>
                  <option value="SITE">Site</option>
                  <option value="INDICACAO">Indicação</option>
                  <option value="INSTAGRAM">Instagram</option>
                  <option value="FACEBOOK">Facebook</option>
                  <option value="LINKEDIN">LinkedIn</option>
                  <option value="GOOGLE">Google</option>
                  <option value="PORTAL_IMOVEIS">Portal de Imóveis</option>
                  <option value="EMAIL">E-mail</option>
                  <option value="TELEFONE">Telefone</option>
                  <option value="VISITA_PRESENCIAL">Visita Presencial</option>
                  <option value="EVENTO">Evento</option>
                  <option value="OUTDOOR">Outdoor</option>
                  <option value="TV">TV</option>
                  <option value="RADIO">Rádio</option>
                </select>
                {errors.origin?.message && (
                  <span className="text-xs text-danger">
                    {errors.origin.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-text-muted uppercase tracking-widest">
              Observações
            </label>
            <textarea
              {...register("notes")}
              rows={3}
              placeholder="Informações adicionais sobre o lead..."
              className={cn(inputClass, "resize-none")}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-text-muted hover:bg-gray-100 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="px-6 py-2.5 text-sm font-semibold bg-primary hover:bg-primary-dark text-white rounded-lg transition disabled:opacity-50"
            >
              {isCreating || isUpdating ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
