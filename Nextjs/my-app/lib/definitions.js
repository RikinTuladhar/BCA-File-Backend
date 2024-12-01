import { z } from "zod";

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "User name must be at least 2 character long" })
    .trim(),
  password: z
    .string()
    .min(6, { message: "Be at least 6 character long" })
    .regex(/[a-zA-Z0-9]+/, { message: "Contains at least one letter" })
    .trim(),
});
