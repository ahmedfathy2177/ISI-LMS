<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="grid min-h-screen lg:grid-cols-2">

    <!-- Branding panel -->
    <section
      class="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">
      <!-- Decorative background -->
      <div
        class="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full border border-primary-foreground/10" />

      <div
        class="pointer-events-none absolute -bottom-48 -left-32 size-125 rounded-full border border-primary-foreground/10" />

      <!-- Brand -->
      <RouterLink to="/" class="relative z-10 flex w-fit items-center gap-3">
        <div
          class="flex size-11 items-center justify-center rounded-xl border border-primary-foreground/20 bg-primary-foreground/10">
          <span class="text-xl font-bold">I</span>
        </div>

        <span class="text-xl font-bold tracking-tight">
          ISI LMS
        </span>
      </RouterLink>

      <!-- Main message -->
      <div class="relative z-10 max-w-lg space-y-6">
        <div
          class="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-sm">
          Your learning journey starts here
        </div>

        <h1 class="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
          Learn something new.
          <br />
          Build something great.
        </h1>

        <p class="max-w-md text-base leading-relaxed text-primary-foreground/75">
          Discover courses, develop new skills, and take control of your
          learning journey with ISI LMS.
        </p>
      </div>

      <!-- Footer -->
      <p class="relative z-10 text-sm text-primary-foreground/60">
        © {{ new Date().getFullYear() }} ISI LMS. All rights reserved.
      </p>
    </section>

    <!-- Authentication content -->
    <section class="flex min-h-screen flex-col">

      <!-- Mobile brand -->
      <header class="flex items-center p-6 lg:hidden">
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span class="font-bold">I</span>
          </div>

          <span class="font-bold tracking-tight">ISI LMS</span>
        </RouterLink>
      </header>

      <!-- Form container -->
      <main class="flex flex-1 items-center justify-center px-6 py-12">
        <div class="w-full max-w-md">
          <RouterView />
        </div>
      </main>

      <!-- Bottom navigation -->
      <footer class="px-6 py-6 text-center text-xs text-muted-foreground">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </footer>

    </section>
  </div>
</template>
