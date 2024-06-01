import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password might be incorrect" }),
  });
  
 export type LoginFormInputs = z.infer<typeof loginSchema>;