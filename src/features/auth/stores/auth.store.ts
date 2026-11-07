import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { AuthResponse, AuthUser, LoginRequest, RegisterRequest } from '../types/auth.types'

import { getRefreshToken, setRefreshToken, removeRefreshToken } from '../utils/token-storage'

import {
  login as loginApi,
  refreshToken as refreshTokenApi,
  getCurrentUser as getCurrentUserApi,
  logout as logoutApi,
  register as registerApi,
} from '../api/auth.api'

import { apiClient } from '@/api/client'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const accessToken = ref<string | null>(null)
  const isInitialized = ref(false)

  const isAuthenticated = computed(() => !!user.value && !!accessToken.value)

  function setSession(authResponse: AuthResponse) {
    user.value = authResponse.user
    accessToken.value = authResponse.accessToken

    setRefreshToken(authResponse.refreshToken)

    apiClient.defaults.headers.common.Authorization = `Bearer ${authResponse.accessToken}`
  }

  async function register(credentials: RegisterRequest) {
    const data = await registerApi(credentials)
    setSession(data)
  }
  async function login(credentials: LoginRequest) {
    const data = await loginApi(credentials)
    setSession(data)
  }

  async function initializeSession() {
    const storedRefreshToken = getRefreshToken()

    if (!storedRefreshToken) {
      isInitialized.value = true
      return
    }

    try {
      // 1. Exchange the stored refresh token for new tokens
      const tokens = await refreshTokenApi({
        refreshToken: storedRefreshToken,
      })

      // 2. Save the rotated refresh token immediately
      setRefreshToken(tokens.refreshToken)

      // 3. Store the new access token
      accessToken.value = tokens.accessToken

      // 4. Configure Axios to authenticate subsequent requests
      apiClient.defaults.headers.common.Authorization = `Bearer ${tokens.accessToken}`

      // 5. Retrieve the authenticated user
      const currentUser = await getCurrentUserApi()

      user.value = currentUser
    } catch (error) {
      // Clear the session only when the server rejects authentication.
      if (
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        error.status === 401
      ) {
        removeRefreshToken()
      }

      user.value = null
      accessToken.value = null

      apiClient.defaults.headers.common.Authorization = undefined
    } finally {
      // The app can now safely decide whether to show protected pages.
      isInitialized.value = true
    }
  }
  async function logout() {
    const refreshToken = getRefreshToken()

    try {
      if (refreshToken) {
        await logoutApi({ refreshToken })
      }
    } finally {
      // Always clear the local session, even if the API fails.
      removeRefreshToken()

      user.value = null
      accessToken.value = null

      apiClient.defaults.headers.common.Authorization = undefined
    }
  }
  return {
    user,
    accessToken,
    isInitialized,
    isAuthenticated,
    setSession,
    login,
    initializeSession,
    logout,
    register,
  }
})
