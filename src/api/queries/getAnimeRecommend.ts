import type { AnimeRecommend } from "../types/AnimeRecommend";

interface RecommendResponse {
  data: AnimeRecommend[]
}

export async function getAnimeRecommend(): Promise<AnimeRecommend[]> {
  const Recommend = await fetch(
    `https://api.jikan.moe/v4/recommendations/anime?limit=10`
  );
  const data: RecommendResponse = await Recommend.json();

  return data.data 
}
