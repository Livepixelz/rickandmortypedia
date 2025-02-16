<script setup lang="ts">
import { useRoute } from 'vue-router'
import {onMounted, ref} from "vue";
import { CharacterService } from "@/services/characterService";
import type { Character } from "@/types";

const route = useRoute()
const id = +route.params.id
const loading = ref(true)
const character = ref<Character|null>(null)

onMounted(async () => {
  character.value = await CharacterService.getCharacter(id)
  loading.value = false
})
</script>
<template>
  <div>
    <h1>Character View for character id: {{ id }}</h1>
    <div v-if="loading">LOADING...</div>
    <div v-else>
      <div v-if="character">
        <img :src="character.image" alt="Character Image">
        <h2>{{ character.name }}</h2>
        <p>{{ character.species }}</p>
        <p>{{ character.status }}</p>
        <p>{{ character.type }}</p>
        <p>{{ character.gender }}</p>
        <p>{{ character.origin }}</p>
      </div>
    </div>
  </div>
</template>