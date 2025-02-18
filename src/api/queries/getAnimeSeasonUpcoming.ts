import type { AnimeSeasonUpcoming } from "../types/AnimeSeasonUpcoming";

export async function getAnimeSeasonUpcoming(): Promise<AnimeSeasonUpcoming[]> {
  const animeSeason = await fetch(`https://api.jikan.moe/v4/seasons/upcoming`);
  const data = await animeSeason.json();

  return data.data.map(({ mal_id }) => {
    return {
      mal_id,
    };
  });
}
