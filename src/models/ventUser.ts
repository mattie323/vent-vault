import { z } from "zod";

export interface ventUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const ventUserSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
});

export const ventUserProfileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
});
export type ventUserInputs = z.infer<typeof ventUserSchema>;
