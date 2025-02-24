import type { AnimeSeasonNow } from "../types/AnimeSeasonNow";
import type { AnimeData, Pagination } from "../types/AnimeSeasonNow";

interface NowResponse {
  data: AnimeData[];
  pagination: Pagination; 
}

export async function getAnimeSeasonNow(): Promise<AnimeSeasonNow> {
  const Now = await fetch(
    `https://api.jikan.moe/v4/seasons/now`
  );
  const data: NowResponse = await Now.json();

  return data
}
