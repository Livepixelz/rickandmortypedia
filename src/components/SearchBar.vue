<script setup>
import { useDebounceFn } from '@vueuse/core'
import { useCharacterStore } from '@/stores/characters'
import {storeToRefs} from "pinia";
const store = useCharacterStore()
const { searchQuery } = storeToRefs(store)

const handleSubmitSearchQuery = useDebounceFn((e) => {
  store.setSearchQuery(e.target.value)
}, 1000)
</script>

<template>
  <input class="p-6 rounded-full bg-black xl:text-4xl w-[600px] border-8 border-slate-200 text-3xl font-black text-white mx-auto focus:outline-none focus:outline-[#b2df28] focus:outline-4 transition-all transition-duration-300 max-w-full" type="text" :value="searchQuery" @keyup="handleSubmitSearchQuery" />
</template>

<style scoped>

</style>