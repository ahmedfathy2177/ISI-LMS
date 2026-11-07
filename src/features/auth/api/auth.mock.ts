import type {
  AuthResponse,
  AuthTokens,
  AuthUser,
  LoginRequest,
  LogoutRequest,
  RefreshTokenRequest,
  RegisterRequest,
} from '../types/auth.types'

import { getRefreshToken } from '../utils/token-storage'
import type { AppError } from '@/api/errors'

const MOCK_USER_KEY = 'isi_mock_user'

// Demo credentials
const DEMO_EMAIL = 'student@isi.com'
const DEMO_PASSWORD = 'Password123!'

// Simulate network latency
function delay(ms = 700): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function createTokens(): AuthTokens {
  return {
    accessToken: `mock-access-${crypto.randomUUID()}`,
    refreshToken: `mock-refresh-${crypto.randomUUID()}`,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  }
}

function createUnauthorizedError(message: string): AppError {
  return {
    kind: 'http',
    status: 401,
    message,
  }
}

function saveMockUser(user: AuthUser): void {
  localStorage.setItem(MOCK_USER_KEY, JSON.stringify(user))
}

function readMockUser(): AuthUser | null {
  const storedUser = localStorage.getItem(MOCK_USER_KEY)

  if (!storedUser) return null

  try {
    return JSON.parse(storedUser) as AuthUser
  } catch {
    localStorage.removeItem(MOCK_USER_KEY)
    return null
  }
}

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  await delay()

  if (credentials.email !== DEMO_EMAIL || credentials.password !== DEMO_PASSWORD) {
    throw createUnauthorizedError('Invalid email or password.')
  }

  const user: AuthUser = {
    id: 'mock-student-001',
    fullName: 'Demo Student',
    email: DEMO_EMAIL,
    roles: [],
  }

  saveMockUser(user)

  return {
    ...createTokens(),
    user,
  }
}

export async function register(payload: RegisterRequest): Promise<AuthResponse> {
  await delay()

  const user: AuthUser = {
    id: crypto.randomUUID(),
    fullName: payload.fullName,
    email: payload.email,
    roles: [],
  }

  saveMockUser(user)

  return {
    ...createTokens(),
    user,
  }
}

export async function refreshToken(payload: RefreshTokenRequest): Promise<AuthTokens> {
  await delay(400)

  const storedToken = getRefreshToken()
  const user = readMockUser()

  if (!storedToken || storedToken !== payload.refreshToken || !user) {
    throw createUnauthorizedError('Your session has expired. Please sign in again.')
  }

  // Generate a new pair to simulate refresh-token rotation.
  return createTokens()
}

export async function getCurrentUser(): Promise<AuthUser> {
  await delay(300)

  const user = readMockUser()

  if (!user) {
    throw createUnauthorizedError('No authenticated user found.')
  }

  return user
}

export async function logout(_payload: LogoutRequest): Promise<void> {
  await delay(300)

  localStorage.removeItem(MOCK_USER_KEY)
}
