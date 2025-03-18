import type { ResultData } from "../../api/types/AnimeResult";

const localKey = "addlist"; // ประกาศมาเพื่อใช้เก็บ ข้อมูลใน localStorage
// ประกาศชื่อ key เพื่อใช้ในการเก็บข้อมูลใน localStorage key กับ value ทำงานเหมือน กล่องเก็บข้อมูลที่ต้องมีชื่อกำกับเสมอ
// ทุกครั้งที่จะเก็บหรืออ่านข้อมูลจาก localStorage
// ต้องมี key เสมอ เพื่อบอกว่าจะ "อ่าน/เขียน/ลบ" ช่องไหนใน localStorage
// หมายถึงว่า ทุกครั้งที่บันทึก/อ่าน/ลบ ข้อมูล รายการ AnimeFavorite
// มันจะใช้ addlist เป็นชื่อ key ใน localStorage
//** ถ้าไม่กำหนดคีย์ ก็ยังคงใช้ได้ เเต่มีความเสี่ยงในการพิมพ์ผิด*/
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
        
    }
};

// ✅ ลบอนิเมะออกจากรายการโปรด
export const removeAnimeFromFavorites = (mal_id: number): void => {
    const currentList = getAnimeAdd();
    const updatedList = currentList.filter((item) => item.mal_id !== mal_id);
    saveAnime(updatedList);
    window.dispatchEvent(new Event("favoritesUpdated")); //ใช้ dispatchEvent เพื่อส่งเหตุการณ์ favoritesUpdated ไปยังทุกๆ ส่วนของแอปที่ฟังเหตุการณ์นี้
}