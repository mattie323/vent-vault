import { z } from 'zod'

export const VentSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Title is required, provide at least one character or more',
    }),
  feeling: z
  .string()
  .min(1,{message: 'Feeling is required'}),
  message: z
  .string()
  .min(1,{message: 'Feeling is required'}),
})
