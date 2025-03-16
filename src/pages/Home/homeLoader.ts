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
  //ข้อมูลที่เข้ามาคือ request ที่เป็นอ็อบเจ็กต์ประเภท Request ซึ่งจะเป็น คำขอ (Request) ที่ส่งมา จากคลาวด์หรือหน้าเว็บที่ผู้ใช้เรียกดู 
  // (เช่น หน้าเว็บที่โหลดข้อมูลจาก API) ซึ่งโดยปกติแล้วจะมีหลายข้อมูลภายใน:

  const {searchParams} = new URL(request.url); //ทำการดึง URL ออกมา 
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1  
  // const page = 3 
  // เพื่อหาว่าใน URL มีค่า page หรือไม่ถ้ามีดึงค่า page ออกมา ถ้าไม่มี ให้เป็น 1 เพื่อส่งให้ getAnimeSeasonNow(page)
  

  // ! (ที่เรียกว่า non-null assertion operator) 
  // คือการบอก TypeScript ว่า เรามั่นใจว่า searchParams.get("page") 
  // จะไม่เป็น null ในที่นี้เราใช้เพราะเราคิดว่า URL จะมีค่าพารามิเตอร์ page เสมอ ถ้าไม่มีเราจะใช้ค่าเริ่มต้นแทน


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