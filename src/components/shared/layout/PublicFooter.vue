<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="border-t bg-background">
    <div class="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
      <RouterLink to="/" class="flex items-center gap-2">
        <div class="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <span class="font-bold">I</span>
        </div>

        <span class="font-semibold tracking-tight">ISI LMS</span>
      </RouterLink>

      <p class="text-sm text-muted-foreground">
        © {{ new Date().getFullYear() }} ISI LMS. All rights reserved.
      </p>

      <nav class="flex gap-5 text-sm text-muted-foreground">
        <RouterLink to="/" class="transition-colors hover:text-foreground">
          Home
        </RouterLink>

        <RouterLink to="/courses" class="transition-colors hover:text-foreground">
          Courses
        </RouterLink>
      </nav>
    </div>
  </footer>
</template>
