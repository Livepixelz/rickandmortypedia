<script setup lang="ts">
import { useRoute } from 'vue-router'
import {onMounted, ref} from "vue";
import { CharacterService } from "@/services/characterService";
import type { Character } from "@/types";

const route = useRoute()
const id = +route.params.id
const loading = ref(true)
const character = ref<Character|null>(null)

const emojismap = {
  "human": "👨‍👩‍👧‍👦",
  "alien": "👽",
  "robot": "🤖",
  "male": "♂️",
  "female": "♀️",
}

const getEmoji = (type: string) => {
  return emojismap[type.toLowerCase()] ?? ""
}

onMounted(async () => {
  character.value = await CharacterService.getCharacter(id)
  loading.value = false
})
</script>
<template>
  <div>
    <div v-if="loading" class="flex flex-col items-center justify-center h-56 text-4xl font-bold">
      LOADING...
    </div>
    <div v-else>
      <article v-if="character" class="flex flex-col items-center justify-center font-bold bg-[#02b5cc] rounded-3xl max-w-2xl shadow-md p-10 mx-auto relative">
        <RouterLink to="/characters" class="absolute top-2 left-2 rounded-full bg-[#b2df28] p-4 m-2 text-black text-lg font-bold shadow-[0px_1px_inset_#fff] hover:-translate-y-1 transition-all active:translate-y-0">&laquo; Back</RouterLink>
        <img :src="character.image" alt="Character Image" class="border-4 border-slate-900 outline outline-8 outline-solid outline-[#b2df28] rounded-full shadow-md" />
          <h1 class="text-5xl font-bold mt-4">{{ character.name }}</h1>
        <p class="text-2xl">{{getEmoji(character.species)}} {{ character.species }}</p>
        <p>{{getEmoji(character.gender)}} {{ character.gender }}</p>
        <p>{{ character.status }}</p>
        <p>{{ character.type }}</p>
        <p>Origin: {{ character.origin.name }}</p>
        <p>Location: {{ character.location.name }}</p>
      </article>
    </div>
  </div>
</template>