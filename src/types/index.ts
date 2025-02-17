export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: Date;
}

export interface Location {
    name: string;
    url: string;
}

export interface Origin {
    name: string;
    url: string;
}


export interface ApiSearchResponse {
    results: Character[];
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
}

export interface Filters {
    status?: string;
    species?: string;
    gender?: string;
}