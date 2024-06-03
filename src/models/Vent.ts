import { z } from "zod";

export interface ventDetails {
  id: number;
  title: string;
  feeling: string;
  message: string;
}
export const VentSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  feeling: z.string().min(1, { message: "Feeling is required" }),
  message: z.string().min(1, { message: "Message is required" }),
});

export type ventInputs = z.infer<typeof VentSchema>;
