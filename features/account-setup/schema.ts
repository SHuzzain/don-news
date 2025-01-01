import { z } from "zod";

export const setupSchema = z.object({
  topics: z.array(z.string()).optional().default([]),
  primaryArea: z.string().optional().default(""),
  newsSources: z.array(z.string()).default([]),
});
