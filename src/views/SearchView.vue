<script setup lang="ts">
import {onMounted, computed, watch} from "vue";
import SearchFilters from "@/components/SearchFilters.vue";
import {useCharacterStore} from "@/stores/characters.ts";
import {storeToRefs} from "pinia";
const store = useCharacterStore()
const { loading, data, previousPage, nextPage, statusFilter, speciesFilter, genderFilter} = storeToRefs(store);

const filters = computed(() => ({
  status: statusFilter.value,
  species: speciesFilter.value,
  gender: genderFilter.value,
}))

watch(filters, () => {
  store.getCharacters()
})

onMounted(async () => {
  await store.getCharacters()
  loading.value = false
})
</script>
<template>
  <div>
    <h1>Search View</h1>
    <SearchFilters />
    <ul v-if="data">
      <li v-for="character in data.results" :key="character.id">
        <RouterLink :to="`/character/${character.id}`">
          <img :src="character.image" class="w-32 h-32 rounded-full" :alt="`${character.name}'s picture`" />
          <div class="ml-2">
            <h2>{{ character.name }}</h2>
            <p>{{ character.status }}</p>
          </div>
        </RouterLink>
      </li>
    </ul>
    <div class="flex flex-row justify-between">
      <button @click="store.getCharacters(previousPage)" class="rounded-full bg-slate-600 p-2 m-2" :disabled="!previousPage">Précédent</button>
      <button @click="store.getCharacters(nextPage)" class="rounded-full bg-slate-600 p-2 m-2" :disabled="!nextPage">Suivant</button>
    </div>
  </div>
</template>