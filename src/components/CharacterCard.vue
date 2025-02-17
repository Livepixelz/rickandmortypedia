<script setup lang="ts">
import type {Character} from "@/types";
defineProps<{
  character: Character
}>()
</script>

<template>
  <div class="flex flex-1 flex-row items-center w-full rounded-full bg-[#02b5cc] p-2 hover:scale-105 transition-all transition-duration-300" >
    <img :src="character.image" class="border-8 border-[#b2df28] w-32 h-32 rounded-full shadow-md" :alt="`${character.name}'s picture`" />
    <div class="ml-2">
      <h2 class="text-xl font-bold">{{ character.name }}</h2>
      <p class="text-sm">{{ character.species }}</p>
      <p>{{ character.status }}</p>
    </div>
  </div>
</template>