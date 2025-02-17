<script setup lang="ts">
import type {Character} from "@/types";
defineProps<{
  character: Character
}>()
</script>

<template>
  <div class="flex flex-1 flex-row items-center w-full rounded-full bg-[#02b5cc] p-4 hover:-translate-y-1 active:translate-y-0 transition-all transition-duration-300" >
    <img :src="character.image" class="border-2 border-slate-900 outline outline-4 outline-solid outline-[#b2df28] w-32 h-32 rounded-full shadow-md mr-1" :alt="`${character.name}'s picture`" />
    <div class="ml-2">
      <h2 class="text-xl font-bold">{{ character.name }}</h2>
      <p class="text-sm">{{ character.species }}</p>
      <p>{{ character.status }}</p>
    </div>
  </div>
</template>