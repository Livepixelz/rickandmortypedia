<script setup>
import { useCharacterStore } from "@/stores/characters";
import {storeToRefs} from "pinia";
const { statusFilter, speciesFilter, genderFilter} = storeToRefs(useCharacterStore());
const { setGenderFilter, setSpeciesFilter, setStatusFilter, resetSearch } = useCharacterStore();
</script>

<template>
  <div class="mx-auto">
    <ul class="flex flex-row py-4">
      <li class="text-center md:text-left">
        <label for="status" class="text-white font-bold text-lg">Status:</label>
        <select name="status" class="cursor-pointer rounded-full bg-[#b2df28] hover:bg-[#02b5cc] transition-all transition-duration-300 p-4 m-2 text-black  font-bold text-lg shadow-[0px_1px_inset_#fff]" id="status" :value="statusFilter" @change="setStatusFilter($event.target.value)">
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
        </select>
      </li>
      <li class="text-center md:text-left">
        <label for="species" class="text-white font-bold text-lg">Species:</label>
        <select name="species" class="cursor-pointer rounded-full bg-[#b2df28] hover:bg-[#02b5cc] transition-all transition-duration-300 p-4 m-2 text-black  font-bold text-lg shadow-[0px_1px_inset_#fff]" id="species" :value="speciesFilter" @change="setSpeciesFilter($event.target.value)">
          <option value="">All</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
          <option value="robot">Robot</option>
        </select>
      </li>
      <li class="text-center md:text-left">
        <label for="gender" class="text-white font-bold text-lg">Gender:</label>
        <select name="gender" class="cursor-pointer rounded-full bg-[#b2df28] hover:bg-[#02b5cc] transition-all transition-duration-300 p-4 m-2 text-black font-bold text-lg shadow-[0px_1px_inset_#fff]" id="gender" :value="genderFilter" @change="setGenderFilter($event.target.value)">
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </li>
      <li>
        <button @click="resetSearch()" class="p-4 m-2 mx-0 text-lg font-bold disabled:opacity-50 disabled:shadow-none"> Reset &cross;</button>
      </li>
    </ul>
  </div>
</template>