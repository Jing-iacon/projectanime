import type { ResultData } from "../../api/types/AnimeResult";

const localKey = "addlist"; // ประกาศมาเพื่อใช้เก็บ ข้อมูลใน localStorage
export const getAnimeAdd = (): ResultData[] => {
    const saveData = localStorage.getItem(localKey);
    return saveData ? JSON.parse(saveData) : [];
};
//ถ้ามีข้อมูลใน saveData (ไม่เป็น null), เราจะทำการแปลงข้อมูล JSON ที่เก็บใน localStorage กลับมาเป็นอาร์เรย์ด้วย JSON.parse().
//ถ้าไม่มีข้อมูลใน localStorage (คือ saveData เป็น null), เราจะคืนค่าเป็นอาร์เรย์ว่าง []

export const saveAnime = (animeAdded: ResultData[]): void => {
    localStorage.setItem(localKey,JSON.stringify(animeAdded));
    // ข้อมูลจะถูกแปลงเป็น JSON (โดยใช้ JSON.stringify()) ก่อนที่จะเก็บลงใน localStorage เพราะ localStorage สามารถเก็บได้แค่ข้อมูลในรูปแบบของสตริงเท่านั้น
};

export const addAnimeFavorite = (anime: ResultData): void => {
    const currentList = getAnimeAdd();
    if(!currentList.some((item) => item.mal_id === anime.mal_id)) {
        const updatedList = [...currentList,anime];
        saveAnime(updatedList);
        window.dispatchEvent(new Event('favoritesUpdated')); 
        //ใช้ dispatchEvent เพื่อส่งเหตุการณ์ favoritesUpdated ไปยังทุกๆ ส่วนของแอปที่ฟังเหตุการณ์นี้
    }
};

// ✅ ลบอนิเมะออกจากรายการโปรด
export const removeAnimeFromFavorites = (mal_id: number): void => {
    const currentList = getAnimeAdd();
    const updatedList = currentList.filter((item) => item.mal_id !== mal_id);
    saveAnime(updatedList);
    window.dispatchEvent(new Event("favoritesUpdated")); //ใช้ dispatchEvent เพื่อส่งเหตุการณ์ favoritesUpdated ไปยังทุกๆ ส่วนของแอปที่ฟังเหตุการณ์นี้
}