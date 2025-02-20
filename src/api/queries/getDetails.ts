import type { AnimeDetails } from "../types/AnimeDetail";

interface DetailsResponse {
 data: AnimeDetails[]
}

export async function getDetails(mal_id:number): Promise<AnimeDetails[]> {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${mal_id}`); // 
    const data: DetailsResponse = await res.json();

    return data.data;
}