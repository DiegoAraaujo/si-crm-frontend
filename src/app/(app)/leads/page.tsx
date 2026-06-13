"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { useLeads } from "@/modules/leads/hooks";
import { useStatuses } from "@/modules/statuses/hooks";
import { LeadAvatar } from "@/modules/leads/components/lead-avatar";
import { LeadActionsMenu } from "@/modules/leads/components/lead-actions-menu";
import { LeadFormModal } from "@/modules/leads/components/lead-form-modal";
import { LeadViewModal } from "@/modules/leads/components/lead-view-modal";
import { cn } from "@/lib/utils";
import type { Lead } from "@/modules/leads/api";

const LeadsPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>();
  const [viewLead, setViewLead] = useState<Lead | undefined>();

  const { data: statuses } = useStatuses();
  const { data: leads, isLoading } = useLeads({
    search: search || undefined,
    statusId: statusFilter || undefined,
  });

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  const handleView = (lead: Lead) => {
    setViewLead(lead);
    setViewModalOpen(true);
  };

  const handleNew = () => {
    setSelectedLead(undefined);
    setModalOpen(true);
  };

  const getStatusName = (statusId: string) => {
    return statuses?.find((s) => s.id === statusId)?.name ?? "—";
  };

  const getStatusColor = (statusId: string) => {
    return statuses?.find((s) => s.id === statusId)?.color ?? "#888";
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text-base">Leads</h1>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            Novo Lead
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome..."
              className="w-full border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-text-base placeholder:text-text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary transition bg-white"
            />
          </div>

          <div className="flex items-center gap-1 bg-white border border-border rounded-lg p-1 flex-wrap">
            <span className="text-xs text-text-muted font-medium px-2">
              STATUS:
            </span>
            <button
              onClick={() => setStatusFilter("")}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-semibold transition",
                statusFilter === ""
                  ? "bg-primary text-white"
                  : "text-text-muted hover:bg-gray-100",
              )}
            >
              Todos
            </button>
            {statuses?.map((status) => (
              <button
                key={status.id}
                onClick={() => setStatusFilter(status.id)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-semibold transition",
                  statusFilter === status.id
                    ? "text-white"
                    : "text-text-muted hover:bg-gray-100",
                )}
                style={
                  statusFilter === status.id
                    ? { backgroundColor: status.color }
                    : {}
                }
              >
                {status.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-border rounded-xl overflow-visible">
          <table className="w-full hidden md:table">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="text-left text-xs font-semibold uppercase tracking-widest text-text-muted px-6 py-3">
                  Nome
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-widest text-text-muted px-6 py-3">
                  Cidade
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-widest text-text-muted px-6 py-3">
                  Interesse
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-widest text-text-muted px-6 py-3">
                  Status
                </th>
                <th className="text-right text-xs font-semibold uppercase tracking-widest text-text-muted px-6 py-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : leads?.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-16 text-text-muted text-sm"
                  >
                    Nenhum lead encontrado.
                  </td>
                </tr>
              ) : (
                leads?.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-border last:border-0 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <LeadAvatar name={lead.name} size="sm" />
                        <span className="text-sm font-semibold text-text-base">
                          {lead.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      {lead.city || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      {lead.type === "COMPRA" ? "Compra" : "Aluguel"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: `${getStatusColor(lead.statusId)}20`,
                          color: getStatusColor(lead.statusId),
                        }}
                      >
                        {getStatusName(lead.statusId)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <LeadActionsMenu
                        leadId={lead.id}
                        onView={() => handleView(lead)}
                        onEdit={() => handleEdit(lead)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="md:hidden flex flex-col divide-y divide-border">
            {isLoading ? (
              <div className="flex justify-center py-16">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : leads?.length === 0 ? (
              <div className="text-center py-16 text-text-muted text-sm">
                Nenhum lead encontrado.
              </div>
            ) : (
              leads?.map((lead) => (
                <div key={lead.id} className="flex items-center gap-3 p-4">
                  <LeadAvatar name={lead.name} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-base truncate">
                      {lead.name}
                    </p>
                    <p className="text-xs text-text-muted truncate">
                      {lead.city || "—"}
                    </p>
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: `${getStatusColor(lead.statusId)}20`,
                      color: getStatusColor(lead.statusId),
                    }}
                  >
                    {getStatusName(lead.statusId)}
                  </span>
                  <LeadActionsMenu
                    leadId={lead.id}
                    onView={() => handleView(lead)}
                    onEdit={() => handleEdit(lead)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <LeadFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedLead(undefined);
        }}
        lead={selectedLead}
      />

      <LeadViewModal
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setViewLead(undefined);
        }}
        lead={viewLead}
      />
    </>
  );
};

export default LeadsPage;
