import { z } from "zod";

const LEAD_TYPES = ["COMPRA", "ALUGUEL"] as const;

const PROPERTY_TYPES = [
  "APARTAMENTO",
  "CASA",
  "COBERTURA",
  "STUDIO",
  "KITNET",
  "TERRENO",
  "SALA_COMERCIAL",
  "LOJA",
  "GALPAO",
  "CHACARA",
  "FAZENDA",
  "FLAT",
  "LOFT",
  "SOBRADO",
  "CASA_CONDOMINIO",
  "PENTHOUSE",
] as const;

const LEAD_ORIGINS = [
  "WHATSAPP",
  "SITE",
  "INDICACAO",
  "INSTAGRAM",
  "FACEBOOK",
  "LINKEDIN",
  "GOOGLE",
  "PORTAL_IMOVEIS",
  "EMAIL",
  "TELEFONE",
  "VISITA_PRESENCIAL",
  "EVENTO",
  "OUTDOOR",
  "TV",
  "RADIO",
] as const;

export const leadSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  phone: z.string().min(10, "Telefone inválido").optional().or(z.literal("")),
  type: z.enum(LEAD_TYPES, {
    message: "Selecione o tipo de interesse",
  }),
  propertyType: z.enum(PROPERTY_TYPES, {
    message: "Selecione o tipo de imóvel",
  }),
  origin: z.enum(LEAD_ORIGINS, {
    message: "Selecione a origem do lead",
  }),
  city: z.string().optional().or(z.literal("")),
  neighborhood: z.string().optional().or(z.literal("")),
  budgetMin: z.string().optional().or(z.literal("")),
  budgetMax: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
});

export type LeadSchema = z.infer<typeof leadSchema>;
