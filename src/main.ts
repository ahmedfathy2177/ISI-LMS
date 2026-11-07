import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from '@/app/providers/query-client'
import { useAuthStore } from './features/auth/stores/auth.store'
async function bootstrap() {
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)
  app.use(VueQueryPlugin, { queryClient })
  const authStore = useAuthStore()
  await authStore.initializeSession()
  await router.isReady()
  app.mount('#app')
}
bootstrap()
