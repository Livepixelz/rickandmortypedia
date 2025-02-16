import axios from "axios";
export const API_BASE_URL = 'https://rickandmortyapi.com/api';

import type { Character, ApiSearchResponse, Filters } from "@/types";

export class CharacterService {
    static async getCharacters(searchQuery: string,
                         filters: Filters = {}): Promise<ApiSearchResponse> {
        const response = await axios.get<ApiSearchResponse>(`${API_BASE_URL}/character`, {
            params: {
                name: searchQuery,
                status: filters.status,
                species: filters.species,
                gender: filters.gender,
            },
        });
        return response.data;
    }

    static async getCharacter(id: number): Promise<Character> {
        return axios.get<Character>(`${API_BASE_URL}/character/${id}`).then(async res => {
            return res.data;
        });
    }
}

export class type {
}