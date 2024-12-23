import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(4).max(6),
});
