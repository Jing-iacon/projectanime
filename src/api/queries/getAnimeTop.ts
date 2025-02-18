import type { AnimeTop } from "../types/AnimeTop";

export async function getAnimeTop(): Promise<AnimeTop[]> {
  const topAnime = await fetch(`https://api.jikan.moe/v4/top/anime?limit=10`);
  const data = await topAnime.json();

  return data.data.map((anime: AnimeTop) => ({
    ...anime,
    genres: anime.genres?.map(({ name }: any) => ({ name })) || [], // ป้องกัน undefined
  }));
}
