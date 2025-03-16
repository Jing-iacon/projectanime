import type { TopData } from "../types/AnimeTop";

interface TopAnime {
  data: TopData[]
}


export async function getAnimeTop(): Promise<TopData[]> {
  const topAnime = await fetch(`https://api.jikan.moe/v4/top/anime?limit=10`);
  const data: TopAnime = await topAnime.json();

  return data.data
} 
