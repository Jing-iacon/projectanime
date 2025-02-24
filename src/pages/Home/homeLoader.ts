import { getAnimeTop } from "../../api/queries/getAnimeTop";
import { getAnimeSeasonUpcoming } from "../../api/queries/getAnimeSeasonUpcoming";
import { getAnimeSeasonNow } from "../../api/queries/getAnimeSeaseonNow";
import type { AnimeTop } from "../../api/types/AnimeTop";
import type { AnimeSeasonUpcoming } from "../../api/types/AnimeSeasonUpcoming";
import type { AnimeSeasonNow } from "../../api/types/AnimeSeasonNow";


export interface AnimeLoaderResult {
  top:  AnimeTop[];
  upcoming: AnimeSeasonUpcoming[];
  now: AnimeSeasonNow;
}

export async function homeLoader(): Promise<AnimeLoaderResult> {
  // จะมี Obj เข้ามาใน loader เเล้วจะมี props ที่ขื่อ Request ดึงตัวนี้ออกมา

  const top = await getAnimeTop(); 
  const upcoming = await getAnimeSeasonUpcoming();
  const now = await getAnimeSeasonNow();
  return {
    top,
    upcoming,
    now
  };
}
