<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="container mx-auto p-8">
    <header class="flex items-center justify-center">
      <img src="/logo.png" alt="Rick and Morty pedia" class="h-56" />
    </header>
    <RouterView v-slot:default="{ Component }">
      <transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="transform opacity-0"
          mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>
</template>
