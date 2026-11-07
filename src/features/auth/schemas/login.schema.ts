import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'requires at least 1 character'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
