import type { AnimeTop } from "../types/AnimeTop";

interface TopAnime {
  data: AnimeTop[]
}


export async function getAnimeTop(): Promise<AnimeTop[]> {
  const topAnime = await fetch(`https://api.jikan.moe/v4/top/anime?limit=10`);
  const data: TopAnime = await topAnime.json();

  return data.data 
} //.map((anime: AnimeTop) => ({
//   ...anime,
//   genres: anime.genres?.map((e) => ({...e})) || [], // ป้องกัน undefined
// }));
// }
