import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email().min(4).max(24),
  password: z.string().min(4).max(12),
});

export const signUpSchema = z.object({
  username: z.string().min(4).max(20),
  email: z.string().email().min(2).max(24),
  password: z.string().min(4).max(12),
  terms: z.boolean().default(false),
});

export const forgetPwdSchema = z.object({
  email: z.string().email().min(4).max(24),
});

export const updatePwdSchema = z
  .object({
    password: z.string().min(4).max(12),

    confirmPassword: z.string().min(4).max(12),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
