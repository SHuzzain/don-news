import { z } from "zod";
import { MAX_OTP_LENGTH } from "./constant";

export const signInSchema = z.object({
  credential: z.string().min(4).max(20).or(z.string().email().min(4).max(24)),
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

export const verifyOtpSchema = z.object({
  otp: z.array(z.string()).min(MAX_OTP_LENGTH),
});
