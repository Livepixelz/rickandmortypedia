<script setup lang="ts">
import {onMounted, computed, watch} from "vue";
import SearchFilters from "@/components/SearchFilters.vue";
import {useCharacterStore} from "@/stores/characters.ts";
import {storeToRefs} from "pinia";
import SearchBar from "@/components/SearchBar.vue";
import CharacterCard from "@/components/CharacterCard.vue";
const store = useCharacterStore()
const { loading, data, error, previousPage, nextPage, statusFilter, speciesFilter, genderFilter, searchQuery} = storeToRefs(store);

const filters = computed(() => ({
  status: statusFilter.value,
  species: speciesFilter.value,
  gender: genderFilter.value,
  name: searchQuery.value
}))

watch(filters, () => {
  store.setCurrentPage(1)
  store.getCharacters()
})

onMounted(async () => {
  await store.getCharacters()
  loading.value = false
})
</script>
<template>
  <div>
    <h1 class="text-4xl font-bold text-center shadow-2xl text-shadow-slate-200/50 -mt-16">Pedia</h1>
    <div class="flex flex-col my-4">
      <SearchBar />
      <SearchFilters />
    </div>
    <div v-if="loading" class="flex flex-col items-center justify-center h-56 text-4xl font-bold">
      LOADING...
    </div>
    <div v-else-if="error" class="flex flex-col items-center justify-center text-4xl font-bold">
      {{ error }}
    </div>
    <div v-else-if="data" class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <RouterLink :to="`/character/${character.id}`" v-for="character in data.results" :key="character.id">
          <CharacterCard :character="character" />
        </RouterLink>
    </div>
    <div class="flex flex-row justify-between mt-8">
      <button @click="store.getCharacters(previousPage)" class="rounded-full bg-[#b2df28] p-4 m-2 text-black text-lg font-bold w-1/2 disabled:opacity-50  shadow-[0px_1px_inset_#fff] disabled:shadow-none" :disabled="!previousPage">Précédent</button>
      <button @click="store.getCharacters(nextPage)" class="rounded-full bg-[#b2df28] p-4 m-2 text-black text-lg font-bold w-1/2 disabled:opacity-50  shadow-[0px_1px_inset_#fff] disabled:shadow-none" :disabled="!nextPage">Suivant</button>
    </div>
  </div>
</template>