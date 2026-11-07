import { apiClient } from '@/api/client'
import type {
  AuthResponse,
  AuthTokens,
  AuthUser,
  LoginRequest,
  LogoutRequest,
  RefreshTokenRequest,
  RegisterRequest,
} from '../types/auth.types'

export async function register(payload: RegisterRequest): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/api/auth/register', payload)

  return data
}

export async function login(payload: LoginRequest): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/api/auth/login', payload)

  return data
}

export async function refreshToken(payload: RefreshTokenRequest): Promise<AuthTokens> {
  const { data } = await apiClient.post<AuthTokens>('/api/auth/refresh', payload)

  return data
}

export async function logout(payload: LogoutRequest): Promise<void> {
  await apiClient.post<void>('/api/auth/logout', payload)
}

export async function getCurrentUser(): Promise<AuthUser> {
  const { data } = await apiClient.get<AuthUser>('/api/auth/me')

  return data
}
