import React, { useState, useEffect } from "react";
import { getAnimeAdd, removeAnimeFromFavorites } from "./myFavoriteLoader";
import { ResultData } from "../../api/types/AnimeResult";
import AnimeFavoriteCard from "../../component/AnimeFavoriteCard";

const MyFavoritePage: React.FC = () => {
  const [favoriteList, setFavoriteList] = useState<ResultData[]>([]);

  // ✅ โหลดข้อมูลจาก Local Storage เมื่อเปิดหน้า
  useEffect(() => {
    const handleStorageChange = () => {
      setFavoriteList(getAnimeAdd());
    };

    setFavoriteList(getAnimeAdd()); // โหลดครั้งแรก

    window.addEventListener("favoritesUpdated", handleStorageChange);
    return () => {
      window.removeEventListener("favoritesUpdated", handleStorageChange);
    };
  }, []);

  const handleRemove = (mal_id: number) => {
    removeAnimeFromFavorites(mal_id);
    setFavoriteList(getAnimeAdd()); // อัปเดตหลังจากลบ
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Favorite Anime</h2>
      {favoriteList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteList.map((anime) => (
            <AnimeFavoriteCard key={anime.mal_id} anime={anime} onRemove={handleRemove} />
          ))}
        </div>
      ) : (
        <p>No favorite anime yet.</p>
      )}
    </div>
  );
};

export default MyFavoritePage;
