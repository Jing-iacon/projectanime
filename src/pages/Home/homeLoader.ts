import { getAnimeTop } from "../../api/queries/getAnimeTop";
import { getAnimeSeasonUpcoming } from "../../api/queries/getAnimeSeasonUpcoming";
import { getAnimeSeasonNow } from "../../api/queries/getAnimeSeaseonNow";
import type { TopData } from "../../api/types/AnimeTop";
import type { AnimeSeasonUpcoming } from "../../api/types/AnimeSeasonUpcoming";
import type { Pagination, AnimeData } from "../../api/types/AnimeSeasonNow";




export interface AnimeLoaderResult {
  top:  TopData[];
  upcoming: AnimeSeasonUpcoming[];
  now: AnimeData[];
  pagination: Pagination

}

export async function homeLoader({ request }: { request: Request }): Promise<AnimeLoaderResult> {
  // จะมี Obj เข้ามาใน loader เเล้วจะมี props ที่ขื่อ Request ดึงตัวนี้ออกมา
  const {searchParams} = new URL(request.url);
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1



  const top = await getAnimeTop(); 
  const upcoming = await getAnimeSeasonUpcoming();
  const now = await getAnimeSeasonNow(page);
  return {
    top,
    upcoming,
    now: now.data,
    pagination: now.pagination 
}
}