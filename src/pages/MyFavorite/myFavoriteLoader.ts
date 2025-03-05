import type { ResultData, pagination } from "../../api/types/AnimeResult";

const localKey = "addlist";
export const getAnimeAdd = (): ResultData[] => {
    const saveData = localStorage.getItem(localKey);
    return saveData ? JSON.parse(saveData) : [];
};

export const saveAnime = (animeAdded: ResultData[]): void => {
    localStorage.setItem(localKey,JSON.stringify(animeAdded));
};

export const addAnimeFavorite = (anime: ResultData): void => {
    const currentList = getAnimeAdd();
    if(!currentList.some((item) => item.mal_id === anime.mal_id)) {
        const updatedList = [...currentList,anime];
        saveAnime(updatedList);
        window.dispatchEvent(new Event('favoritesUpdated')); // แจ้งให้ MyFavoritePage อัปเดต
    }
};

// ✅ ลบอนิเมะออกจากรายการโปรด
export const removeAnimeFromFavorites = (mal_id: number): void => {
    const currentList = getAnimeAdd();
    const updatedList = currentList.filter((item) => item.mal_id !== mal_id);
    saveAnime(updatedList);
    window.dispatchEvent(new Event("favoritesUpdated")); // แจ้งให้ MyFavoritePage อัปเดต
  };