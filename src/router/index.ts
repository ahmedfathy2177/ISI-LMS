import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/features/auth/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    // Public pages
    {
      path: '/',
      component: () => import('@/layouts/PublicLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'courses',
          name: 'courses',
          component: () => import('@/features/catalog/views/CoursesView.vue'),
        },
        {
          path: 'courses/:id',
          name: 'course-details',
          component: () => import('@/features/catalog/views/CourseDetailsView.vue'),
        },
      ],
    },

    // Authentication pages
    {
      path: '/login',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/features/auth/views/LoginView.vue'),
          meta: { guestOnly: true },
        },
      ],
    },
    {
      path: '/register',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        {
          path: '',
          name: 'register',
          component: () => import('@/features/auth/views/RegisterView.vue'),
          meta: { guestOnly: true },
        },
      ],
    },

    // Student dashboard
    {
      path: '/dashboard',
      component: () => import('@/layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'student-dashboard',
          component: () => import('@/features/student/views/StudentDashboardView.vue'),
        },
      ],
    },

    // Instructor pages
    {
      path: '/instructor',
      component: () => import('@/layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'instructor-dashboard',
          component: () => import('@/features/instructor/views/InstructorDashboardView.vue'),
        },
        {
          path: 'courses',
          name: 'instructor-courses',
          component: () => import('@/features/instructor/views/InstructorCoursesView.vue'),
        },
      ],
    },

    // Learning page
    {
      path: '/learn',
      component: () => import('@/layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: ':id',
          name: 'learning',
          component: () => import('@/features/learning/views/LearningView.vue'),
        },
      ],
    },

    // 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

// Global navigation guard
router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    }
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: 'home' }
  }
})

export default router
