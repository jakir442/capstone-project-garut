import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama minimal 2 karakter.")
    .max(100, "Nama maksimal 100 karakter."),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Format email tidak valid."),

  password: z
    .string()
    .min(8, "Password minimal 8 karakter.")
    .max(100, "Password maksimal 100 karakter."),
});

export type RegisterInput = z.infer<typeof registerSchema>;
