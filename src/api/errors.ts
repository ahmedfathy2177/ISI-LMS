import axios from 'axios'

export type AppError =
  | {
      kind: 'validation'
      status: 400
      message: string
      errors: Record<string, string[]>
    }
  | {
      kind: 'business'
      status: number
      code: string
      message: string
    }
  | {
      kind: 'http'
      status: number
      message: string
    }
  | {
      kind: 'network'
      message: string
    }
  | {
      kind: 'unknown'
      message: string
    }

function isRecord(data: unknown): data is Record<string, unknown> {
  return typeof data === 'object' && data !== null && !Array.isArray(data)
}

function isValidationErrors(data: unknown): data is Record<string, string[]> {
  if (!isRecord(data)) return false

  return Object.values(data).every(
    (value) => Array.isArray(value) && value.every((message) => typeof message === 'string'),
  )
}

export function normalizeError(error: unknown): AppError {
  if (!axios.isAxiosError(error)) {
    return {
      kind: 'unknown',
      message: 'An unexpected error occurred',
    }
  }

  if (!error.response) {
    return {
      kind: 'network',
      message: 'Unable to connect to the server',
    }
  }

  const status = error.response.status
  const data: unknown = error.response.data

  if (status === 400 && isRecord(data)) {
    if (isValidationErrors(data.errors)) {
      return {
        kind: 'validation',
        status: 400,
        message: typeof data.title === 'string' ? data.title : 'Please check your input',
        errors: data.errors,
      }
    }

    if (typeof data.code === 'string' && typeof data.detail === 'string') {
      return {
        kind: 'business',
        status,
        code: data.code,
        message: data.detail,
      }
    }
  }

  return {
    kind: 'http',
    status,
    message:
      isRecord(data) && typeof data.title === 'string'
        ? data.title
        : 'Something went wrong. Please try again.',
  }
}
