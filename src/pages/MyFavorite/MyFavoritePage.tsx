import React, { useState, useEffect } from "react";
import { getAnimeAdd, removeAnimeFromFavorites } from "./myFavoriteLoader";
import { ResultData } from "../../api/types/AnimeResult";
import AnimeFavoriteCard from "../../component/AnimeFavoriteCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ต้อง import CSS ด้วย

const MyFavoritePage: React.FC = () => {
  const [favoriteList, setFavoriteList] = useState<ResultData[]>([]);

  // โหลดข้อมูลจาก Local Storage เมื่อเปิดหน้า
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
    toast.warn(
      <div>
        <span>Are you sure you want to remove this anime from your favorites?</span>
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => {
              removeAnimeFromFavorites(mal_id);
              setFavoriteList(getAnimeAdd()); // อัปเดตหลังจากลบ
              toast.dismiss(); // ปิด Toast
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
          >
            Yes, remove
          </button>
          <button
            onClick={() => toast.dismiss()} // ปิด Toast หากกด Cancel
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false, // ไม่ปิดเอง
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark", // ใช้ธีมมืด
      }
    );
  };

  return (
    <div className="bg-black bg-opacity-50 top-0 left-0 z-50 shadow-md min-h-screen">
      <div className="Favorite-con mx-10 h-full flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-white">My Favorite Anime</h2>
        <div className="flex-grow flex flex-wrap gap-4 mb-10">
          {favoriteList.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-4 m-auto">
              {favoriteList.map((anime) => (
                <AnimeFavoriteCard key={anime.mal_id} anime={anime} onRemove={handleRemove} />
              ))}
            </div>
          ) : (
            <p className="text-white">No favorite anime yet.</p>
          )}
        </div>
      </div>
      <ToastContainer className="z-[9999]" />
    </div>
  );
};

export default MyFavoritePage;
