<script setup lang="ts">
import PublicNavbar from '@/components/shared/navigation/PublicNavbar.vue';
import PublicFooter from '@/components/shared/layout/PublicFooter.vue';
import { RouterView } from 'vue-router'
</script>

<template>
  <div class=" flex min-h-screen flex-col">
    <PublicNavbar />

    <main class="flex-1">
      <RouterView />
    </main>

    <PublicFooter />
  </div>
</template>
