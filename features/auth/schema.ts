import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(4).max(6),
});

export const signUpSchema = z.object({
  username: z.string().min(4),
  email: z.string().email().min(2),
  password: z.string().min(4),
  terms: z.boolean().default(false),
});
