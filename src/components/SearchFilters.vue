<script setup>
import { useCharacterStore } from "@/stores/characters";
import {storeToRefs} from "pinia";
const { statusFilter, speciesFilter, genderFilter} = storeToRefs(useCharacterStore());
const { setGenderFilter, setSpeciesFilter, setStatusFilter } = useCharacterStore();
</script>

<template>
  <div>
    Filters:
    <ul class="flex flex-row">
      <li class="rounded-full bg-slate-600 p-2 m-2">
        <label for="status" class="text-white">Status:</label>
        <select name="status" class="text-slate-900" id="status" :value="statusFilter" @change="setStatusFilter($event.target.value)">
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
        </select>
      </li>
      <li class="rounded-full bg-slate-600 p-2 m-2">
        <label for="species" class="text-white">Species:</label>
        <select name="species" class="text-slate-900" id="species" :value="speciesFilter" @change="setSpeciesFilter($event.target.value)">
          <option value="">All</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
          <option value="robot">Robot</option>
        </select>
      </li>
      <li class="rounded-full bg-slate-600 p-2 m-2">
        <label for="gender" class="text-white">Gender:</label>
        <select name="gender" class="text-slate-900" id="gender" :value="genderFilter" @change="setGenderFilter($event.target.value)">
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </li>
    </ul>
  </div>
</template>