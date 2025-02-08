import { z } from "zod";

export const setupSchema = z.object({
  topics: z.array(z.string()).optional().default([]),
  newsSources: z.array(z.string()).default([]),
  avatar: z.string().url().default(""),
  fullname: z.string().min(4).max(20),
  isProviderUrl: z.boolean().optional(),
});
