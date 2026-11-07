import * as http from './auth.http'
import * as mock from './auth.mock'

const authApi = import.meta.env.VITE_USE_MOCK_API === 'true' ? mock : http

export const { login, register, refreshToken, logout, getCurrentUser } = authApi
