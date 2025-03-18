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
        window.dispatchEvent(new Event('favoritesUpdated')); 
        // มันคือ วิธีส่ง "เหตุการณ์" (Event) ไปบอกให้ ส่วนอื่น ๆ ในเว็บแอปของเรารู้ว่าเกิดอะไรขึ้น
        // เหมือนมีการบอกเพื่อนในห้องว่า อัพเดตรายการ Favorite แล้วนะ
        // คนที่ ตั้งใจฟัง (addEventListener) จะทำอะไรบางอย่างต่อ ทันทีที่ได้ยิน
        // เมื่อเหตุการณ์นี้เกิดขึ้น จะ โหลดข้อมูลใหม่ อัพเดต UI หรือทำอะไรก็ได้
        //** ยกตัวอย่าง **//
        // หน้า Home มีปุ่ม "Add to Favorite"
        // หน้า Favorites แสดงรายการ Favorite แบบเรียลไทม์ (อัปเดตทันที ถ้ามีคนเพิ่มหรือลบ)
        // เวลาเราเพิ่ม Favorite จาก หน้า Home, หน้า Favorites จะรู้ตัวทันทีว่าข้อมูลเปลี่ยนแล้ว (ไม่ต้องกด refresh)
        // หน้า Home → addAnimeFavorite() → dispatchEvent('favoritesUpdated')
        // หน้า Favorites → ได้ยิน favoritesUpdated → เรียก renderFavorites() → โหลดรายการใหม่มาโชว์ทันที!
        
        // ถ้าไม่มี หน้า Home เพิ่มอนิเมะเสร็จ ข้อมูลมีใน localStorage แล้ว
        // หน้า Favorites จะไม่รู้ว่ามีอะไรเปลี่ยนแปลง จนกว่าผู้ใช้จะ refresh หน้าเอง หรือมีฟังก์ชันโหลดข้อมูลที่กดเอง
    }
};

// ✅ ลบอนิเมะออกจากรายการโปรด
export const removeAnimeFromFavorites = (mal_id: number): void => {
    const currentList = getAnimeAdd();
    const updatedList = currentList.filter((item) => item.mal_id !== mal_id);
    saveAnime(updatedList);
    window.dispatchEvent(new Event("favoritesUpdated")); //ใช้ dispatchEvent เพื่อส่งเหตุการณ์ favoritesUpdated ไปยังทุกๆ ส่วนของแอปที่ฟังเหตุการณ์นี้
}