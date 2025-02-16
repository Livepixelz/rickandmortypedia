import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CharacterService } from '@/services/characterService'
import {type Character, type ApiSearchResponse} from "@/types";

function getQueryParamValue(url: string, key: string) {
  const query = new URL(url).searchParams.get(key)
  return query ? query : null
}

export const useCharacterStore = defineStore('characters', () => {
  const data = ref<ApiSearchResponse|null>(null)
  const previousPage = ref<number|null>(null)
  const nextPage = ref<number|null>(null)
  const character = ref<Character|null>(null)
  const loading = ref(false)
  const error = ref<string|null>(null)
  const searchQuery = ref('')
  const statusFilter = ref('')
  const genderFilter = ref('')
  const speciesFilter = ref('')

  function setStatusFilter(status: string) {
    statusFilter.value = status
    getCharacters()
  }
  function setGenderFilter(gender: string) {
    genderFilter.value = gender
    getCharacters()
  }
  function setSpeciesFilter(species: string) {
    speciesFilter.value = species
    getCharacters()
  }

  async function getCharacters(page: number | null = 1) {
    loading.value = true
    error.value = null
    const filters = {
      status: statusFilter.value,
      gender: genderFilter.value,
      species: speciesFilter.value,
      page,
    }

    try {
      data.value = await CharacterService.getCharacters(searchQuery.value, filters)
      if (data.value.info.prev) {
        const prev = getQueryParamValue(data.value.info.prev, 'page')
        previousPage.value = prev ? +prev : null
      }
      if (data.value.info.next) {
        const next = getQueryParamValue(data.value.info.next, 'page')
        nextPage.value = next ? +next : null
      }
    } catch (e: any) {
      error.value = e.response.data.error
    } finally {
      loading.value = false
    }
  }
  async function getCharacter(id: number) {
    loading.value = true
    error.value = null
    try {
      character.value = await CharacterService.getCharacter(id)
    } catch (e) {
      error.value = e as string
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    previousPage,
    nextPage,
    character,
    loading,
    error,
    searchQuery,
    statusFilter,
    genderFilter,
    speciesFilter,
    setStatusFilter,
    setGenderFilter,
    setSpeciesFilter,
    getCharacters,
    getCharacter,
  }

})