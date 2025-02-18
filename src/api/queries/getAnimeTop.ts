import type { AnimeTop } from "../types/AnimeTop";


export async function getAnimeTop(): Promise<AnimeTop[]> {
  const topAnime = await fetch(`https://api.jikan.moe/v4/top/anime?limit=10`);
  const data = await topAnime.json();

  return data.data.map(({ 
    mal_id, 
    url, 
    images, 
    trailer, 
    title, 
    title_english, 
    title_japanese, 
    type, 
    source, 
    status, 
    duration, 
    rating, 
    score, 
    rank, 
    synopsis, 
    background, 
    genres 
  }: AnimeTop) => ({
    mal_id,
    url,
    images,
    trailer,
    title,
    title_english,
    title_japanese,
    type,
    source,
    status,
    duration,
    rating,
    score,
    rank,
    synopsis,
    background,
    genres: genres?.map(({ name }: any) => ({ name })) || [], // ป้องกัน undefined
  }));
}