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
  // ตัว request ที่ส่งเข้ามาใน homeLoader นี่คือ Request Object หรือบาง Framework ที่ใช้ Loader (เช่น React Router Loader)
  // มันจะมี property request.url อยู่ ซึ่งจะเก็บ URL ของหน้าเว็บที่เรียกเข้ามา
console.log(request)
  const {searchParams} = new URL(request.url); //ทำการดึง URL ออกมา  url: "http://localhost:5173/"
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1  
 // อธิบาย tenary คล้ายกับ if else แต่เป็นแบบสั้น ๆ เช่น ถ้าเงื่อนไขเป็นจริงให้ทำอะไร ถ้าไม่ให้ทำอะไร
 // เหตุผลที่ใช้แบบนี้คือ มีความยืดหยุ่น ถ้ามีการแชร์ลิ้งเเล้วสามารถโหลดหน้าที่ต้องการได้ทันที
 // จาก parameter ไม่มีหน้าเพจจะมีค่าเริ่มต้นเป็น 1 ซึ่งจริง ๆ ไม่มีบรรทัดข้างบนก็ได้ แต่สามารถกำหนด const page = 1; ได้เลย
 // ข้อแตกต่างคือ ถ้าใช้ Hardcode จะไม่ได้อ่านค่า qurey string ใน URL มาเลย จะโหลดหน้า 1 ตลอด ไม่ว่าค่า url มีค่า page อะไรก็ตาม
 //  const page = 1

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