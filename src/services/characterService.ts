import axios from "axios";
export const API_BASE_URL = 'https://rickandmortyapi.com/api';

import type { Character, ApiSearchResponse, Filters } from "@/types";

export class CharacterService {
    static async getCharacters(searchQuery: string,
                         filters: Filters = {}): Promise<ApiSearchResponse> {

        let queryString = `?name=${searchQuery}`;
        for (const [key, value] of Object.entries(filters)) {
            if (value) {
                queryString += `&${key}=${value}`;
            }
        }

        const response = await axios.get<ApiSearchResponse>(`${API_BASE_URL}/character/${queryString}`);
        return response.data;
    }

    static async getCharacter(id: number): Promise<Character> {
        const response = await axios.get<Character>(`${API_BASE_URL}/character/${id}`);
        return response.data;
    }
}