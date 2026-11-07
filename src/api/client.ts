import axios from 'axios'
import { normalizeError } from './errors'

const isMockApi = import.meta.env.VITE_USE_MOCK_API === 'true'
const baseURL = import.meta.env.VITE_API_BASE_URL

if (!isMockApi && !baseURL) {
  throw new Error('VITE_API_BASE_URL is not configured')
}
export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    return Promise.reject(normalizeError(error))
  },
)
