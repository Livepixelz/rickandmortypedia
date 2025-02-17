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
  const currentPage = ref<number|null>(null)
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
  }
  function setGenderFilter(gender: string) {
    genderFilter.value = gender
  }
  function setSpeciesFilter(species: string) {
    speciesFilter.value = species
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }
  function setCurrentPage(page: number) {
    currentPage.value = page
  }

  async function getCharacters(page?: number | null) {
    loading.value = true
    error.value = null
    if (!page && currentPage.value) {
      page = currentPage.value
    }
    const filters = {
      status: statusFilter.value,
      gender: genderFilter.value,
      species: speciesFilter.value,
      page,
    }
    currentPage.value = page ?? null
    try {
      data.value = await CharacterService.getCharacters(searchQuery.value, filters)
      if (data.value.info.prev) {
        const prev = getQueryParamValue(data.value.info.prev, 'page')
        previousPage.value = prev ? +prev : null
      } else {
        previousPage.value = null
      }
      if (data.value.info.next) {
        const next = getQueryParamValue(data.value.info.next, 'page')
        nextPage.value = next ? +next : null
      } else {
        nextPage.value = null
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
    currentPage,
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
    setSearchQuery,
    setCurrentPage,
    getCharacters,
    getCharacter,
  }

})