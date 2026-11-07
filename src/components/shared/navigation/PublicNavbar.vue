<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Menu } from '@lucide/vue';
import Button from '@/components/ui/button/Button.vue';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
      <!-- Brand -->
      <RouterLink to="/" class="flex items-center gap-2">
        <div class="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <span class="text-lg font-bold">I</span>
        </div>

        <span class="text-lg font-bold tracking-tight">
          ISI LMS
        </span>
      </RouterLink>

      <!-- Desktop navigation -->
      <NavigationMenu class="hidden md:flex">
        <NavigationMenuList class="gap-2">
          <NavigationMenuItem>
            <RouterLink to="/"
              class="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
              Home
            </RouterLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <RouterLink to="/courses"
              class="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
              Explore Courses
            </RouterLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <!-- Desktop actions -->
      <div class="hidden items-center gap-3 md:flex">
        <Button variant="ghost" as-child>
          <RouterLink to="/login">
            Sign in
          </RouterLink>
        </Button>

        <Button as-child>
          <RouterLink to="/register">
            Get started
          </RouterLink>
        </Button>
      </div>

      <!-- Mobile navigation -->
      <div class="md:hidden">
        <Sheet>
          <SheetTrigger as-child>
            <Button variant="ghost" size="icon" aria-label="Open navigation menu">
              <Menu class="size-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" class="w-75">
            <SheetHeader>
              <SheetTitle class="text-left">
                ISI LMS
              </SheetTitle>
            </SheetHeader>

            <nav class="mt-8 flex flex-col gap-3">
              <RouterLink to="/" class="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
                Home
              </RouterLink>

              <RouterLink to="/courses"
                class="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
                Explore Courses
              </RouterLink>

              <div class="my-2 border-t" />

              <Button variant="outline" as-child>
                <RouterLink to="/login">
                  Sign in
                </RouterLink>
              </Button>

              <Button as-child>
                <RouterLink to="/register">
                  Get started
                </RouterLink>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
</template>
