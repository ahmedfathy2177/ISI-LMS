import type { AppError } from '@/api/errors'

declare module '@tanstack/vue-query' {
  interface Register {
    defaultError: AppError
  }
}
