import { z } from 'zod'

export const UserSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, { message: 'First Name must be 2 or more characters long' }),
  lastName: z
    .string()
    .trim()
    .min(2, { message: 'Last Name must be 2 or more characters long' }),
  email: z.string().email({message:'Invalid email address'}).trim().toLowerCase(),
})
