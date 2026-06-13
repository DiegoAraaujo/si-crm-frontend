import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
