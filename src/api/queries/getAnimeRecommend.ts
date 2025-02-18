import type { AnimeRecommend } from "../types/AnimeRecommend";


export async function getAnimeRecommend():Promise<AnimeRecommend> {
    const Recommend = await fetch(`https://api.jikan.moe/v4/recommendations/anime`);
    const data:AnimeRecommend = await Recommend.json();

    return data;
}