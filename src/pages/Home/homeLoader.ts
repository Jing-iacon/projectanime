import { getAnimeTop } from "../../api/queries/getAnimeTop";
import { getAnimeSeasonUpcoming } from "../../api/queries/getAnimeSeasonUpcoming";
import { getAnimeRecommend } from "../../api/queries/getAnimeRecommend";
import type { AnimeTop } from "../../api/types/AnimeTop";
import type { AnimeSeasonUpcoming } from "../../api/types/AnimeSeasonUpcoming";
import type { AnimeRecommend } from "../../api/types/AnimeRecommend";


export interface AnimeLoaderResult {
  top:  AnimeTop[];
  Upcoming: AnimeSeasonUpcoming[];
  Recommend: AnimeRecommend[];
}

export async function homeLoader(): Promise<AnimeLoaderResult> {
  // จะมี Obj เข้ามาใน loader เเล้วจะมี props ที่ขื่อ Request ดึงตัวนี้ออกมา

  const top = await getAnimeTop(); 
  const Upcoming = await getAnimeSeasonUpcoming();
  const Recommend = await getAnimeRecommend();
  return {
    top,
    Upcoming,
    Recommend
  };
}
