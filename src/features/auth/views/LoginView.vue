<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { loginSchema } from '../schemas/login.schema';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth.store'
import {
  Mail,
  LockKeyhole,
  ArrowRight,
  LoaderCircle
} from '@lucide/vue'
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const submitError = ref<string | null>(null)
const router = useRouter()
const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  validateOnMount: false,
  initialValues: {
    email: '',
    password: ''
  },
})
const [email, emailAttrs] = defineField('email', {
  // validateOnBlur: true,
  // validateOnInput: false,
  // validateOnChange: true,
  // validateOnModelUpdate: false
})
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (formValues) => {
  submitError.value = null

  try {
    await authStore.login(formValues)

    // Temporary destination until we configure dashboard routing.
    await router.push('/')
  } catch (error) {
    submitError.value =
      error instanceof Error
        ? error.message
        : 'Something went wrong. Please try again.'
  }
})
</script>


<template>
  <div class="w-full space-y-8">

    <!-- Heading -->
    <div class="space-y-3">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        ISI Learning Platform
      </p>

      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome back
        </h1>

        <p class="text-sm leading-relaxed text-muted-foreground">
          Sign in to continue learning, exploring courses, and tracking your progress.
        </p>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="onSubmit" class="space-y-5">

      <!-- Email -->
      <div class="space-y-2">
        <Label for="email">Email address</Label>

        <div class="relative">
          <Mail class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input id="email" v-model="email" v-bind="emailAttrs" type="email" autocomplete="email"
            placeholder="name@example.com" :aria-invalid="!!errors.email" class="h-11 pl-10" />
        </div>

        <p v-if="errors.email" class="text-sm text-destructive">
          {{ errors.email }}
        </p>
      </div>

      <!-- Password -->
      <div class="space-y-2">
        <Label for="password">Password</Label>

        <div class="relative">
          <LockKeyhole
            class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input id="password" v-model="password" v-bind="passwordAttrs" type="password" autocomplete="current-password"
            placeholder="Enter your password" :aria-invalid="!!errors.password" class="h-11 pl-10" />
        </div>

        <p v-if="errors.password" class="text-sm text-destructive">
          {{ errors.password }}
        </p>
      </div>


      <p v-if="submitError" class="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
        {{ submitError }}
      </p>
      <!-- Submit -->
      <Button type="submit" class="h-11 w-full gap-2 text-sm font-semibold" :disabled="isSubmitting">
        {{ isSubmitting ? 'Signing in...' : 'Sign in' }}

        <ArrowRight v-if="!isSubmitting" class="size-4" />
        <LoaderCircle v-else class="size-4 animate-spin" />
      </Button>

    </form>

    <!-- Footer -->
    <p class="text-center text-xs leading-relaxed text-muted-foreground">
      Your learning journey continues here.
      <br />
      Secure access to your ISI LMS account.
    </p>

  </div>
</template>
