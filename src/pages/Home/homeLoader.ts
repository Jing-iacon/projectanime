import { getAnimeTop } from "../../api/queries/getAnimeTop";
import { getAnimeSeasonUpcoming } from "../../api/queries/getAnimeSeasonUpcoming";
import { getAnimeRecommend } from "../../api/queries/getAnimeRecommend";
import type { AnimeTop } from "../../api/types/AnimeTop";
import type { AnimeSeasonUpcoming } from "../../api/types/AnimeSeasonUpcoming";
import type { AnimeRecommend } from "../../api/types/AnimeRecommend";


export interface AnimeLoaderResult {
  topAnime:  AnimeTop[];
  animeSeasonUpcoming: AnimeSeasonUpcoming[];
  animeRecommend: AnimeRecommend[];
}

export async function homeLoader(): Promise<AnimeLoaderResult> {
  // จะมี Obj เข้ามาใน loader เเล้วจะมี props ที่ขื่อ Request ดึงตัวนี้ออกมา

  const topAnime = await getAnimeTop(); 
  const animeSeasonUpcoming = await getAnimeSeasonUpcoming();
  const animeRecommend = await getAnimeRecommend();
  return {
    topAnime,
    animeSeasonUpcoming,
    animeRecommend
  };
}
