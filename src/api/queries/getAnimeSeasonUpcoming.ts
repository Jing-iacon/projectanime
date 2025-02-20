import type { AnimeSeasonUpcoming } from "../types/AnimeSeasonUpcoming";

interface UpcomingResponse {
  data: AnimeSeasonUpcoming[]
}

export async function getAnimeSeasonUpcoming(): Promise<AnimeSeasonUpcoming[]> {
  const animeSeason = await fetch(`https://api.jikan.moe/v4/seasons/upcoming?limit=10`);
  const data: UpcomingResponse = await animeSeason.json();

  return data.data  //.map((anime: any) => ({...anime}));
}
