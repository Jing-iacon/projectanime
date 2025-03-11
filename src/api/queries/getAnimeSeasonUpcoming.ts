import type { AnimeSeasonUpcoming } from "../types/AnimeSeasonUpcoming";

interface UpcomingResponse {
  data: AnimeSeasonUpcoming[]
}

export async function getAnimeSeasonUpcoming(): Promise<AnimeSeasonUpcoming[]> {
  const animeSeason = await fetch(`https://api.jikan.moe/v4/seasons/upcoming?limit=10`);
  const data: UpcomingResponse = await animeSeason.json();

  return data.data.map((anime, idx) => ({
    ...anime,
    idx: idx + 1 // เริ่มที่ 1 (ถ้าต้องการเริ่มที่ 0 ให้ลบ `+ 1`),
    
    
  }));  //.map((anime: any) => ({...anime}));
}
