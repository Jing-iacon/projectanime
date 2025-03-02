import type { AnimeResult, pagination, ResultData } from "../types/AnimeResult";

interface SearchAnime {
  data: ResultData[];
  pagination: pagination;
}

export async function searchResult(term: string, page: number = 1, limit: number = 12): Promise<AnimeResult> {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${term}&page=${page}&limit=${limit}`);

    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.status} ${res.statusText}`);
    }
  
    const data: SearchAnime = await res.json();
  
    return data;
  }
  
