import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  status: z.string().min(1, "Status obrigatório"),
  origin: z.string().min(1, "Origem obrigatória"),
  interestType: z.string().min(1, "Tipo de interesse obrigatório"),
  propertyType: z.string().min(1, "Tipo de imóvel obrigatório"),
  city: z.string().min(1, "Cidade obrigatória"),
  neighborhood: z.string().min(1, "Bairro obrigatório"),
  budgetMin: z.string().min(1, "Valor obrigatório"),
  budgetMax: z.string().min(1, "Valor obrigatório"),
  notes: z.string().optional(),
});

export type LeadSchema = z.infer<typeof leadSchema>;
