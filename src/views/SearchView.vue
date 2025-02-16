<script setup lang="ts">
import {onMounted, ref} from "vue";
import { CharacterService } from "@/services/characterService";
import type { ApiSearchResponse } from "@/types";

const loading = ref(true)
const searchResults = ref<ApiSearchResponse|null>(null)

onMounted(async () => {
  const filters = {
    status: 'alive',
    species: 'human',
    gender: 'male'
  }
  searchResults.value = await CharacterService.getCharacters('', filters)
  loading.value = false
})
</script>
<template>
  <div>
    <h1>Search View</h1>
    <ul v-if="searchResults">
      <li v-for="result in searchResults.results" :key="result.id">
        {{ result.name }}
      </li>
    </ul>
  </div>
</template>