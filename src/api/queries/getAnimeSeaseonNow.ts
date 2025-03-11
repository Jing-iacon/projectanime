import type { AnimeData, Pagination } from "../types/AnimeSeasonNow";

interface NowResponse {
  data: AnimeData[];
  pagination: Pagination; 
}

export async function getAnimeSeasonNow(page: number = 1, limit: number = 12): Promise<NowResponse> {
  // ➕ ดึงมามากขึ้น เช่น 24 รายการ ต่อหน้า
  const Now = await fetch(
    `https://api.jikan.moe/v4/seasons/now?page=${page}&limit=${limit * 2}`
  );

  const data: NowResponse = await Now.json();

  // ✅ กรอง Hentai ออก
  const filteredData = data.data.filter(anime => {
    return !anime.genres.some(genre => genre.name.toLowerCase() === "hentai");
  });

  // ➕ ตัดแค่ limit ที่ต้องการ
  const finalData = filteredData.slice(0, limit);

  return {
    data: finalData,
    pagination: data.pagination
  };
}
