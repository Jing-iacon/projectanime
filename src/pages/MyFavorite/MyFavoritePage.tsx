import React, { useState, useEffect } from "react";
import { getAnimeAdd, removeAnimeFromFavorites } from "./myFavoriteLoader";
import { ResultData } from "../../api/types/AnimeResult";
import AnimeFavoriteCard from "../../component/AnimeFavoriteCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ต้อง import CSS ด้วย

const MyFavoritePage: React.FC = () => {
  const [favoriteList, setFavoriteList] = useState<ResultData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateFavorites = () => {
      setLoading(true);
      setFavoriteList(getAnimeAdd());
      setLoading(false);
    };
  
    updateFavorites(); // โหลดข้อมูลครั้งแรก
    console.log(favoriteList);
    
  }, []);
  
  //การใช้ window.dispatchEvent เป็นวิธีการหนึ่งในการ สื่อสารระหว่างคอมโพเนนต์โดยไม่ต้องใช้ prop หรือ state โดยตรง
  // ในกรณีนี้, เมื่อผู้ใช้ทำการเปลี่ยนแปลง favorites (เพิ่ม/ลบอนิเมะ) ข้อมูลจะถูกอัพเดตแล้วเราจะส่งสัญญาณไปยัง window เพื่อให้ทุกๆ ส่วนของแอปที่ฟังอีเวนต์นี้ (ผ่าน addEventListener) รีเฟรชข้อมูล favorites
  
  const FavoriteSection = () => (
    <div className="now-body w-full box-border flex flex-col">
      <div className="nowbody-container px-4">
        <h2 className="text-white text-3xl ml-4 font-bold mb-4 mt-8">
          My Favorite Anime
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mx-auto max-w-[1920px] min-h-[400px] mt-8">
          {loading ? (
            <div className="flex items-center justify-center w-full h-[400px]">
              <p className="text-white text-xl">Loading...</p>
            </div>
          ) : favoriteList.length > 0 ? (
            favoriteList.map((anime) => (
              <AnimeFavoriteCard 
                key={anime.mal_id} 
                anime={anime} 
                onRemove={handleRemove} 
              />
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-[400px]">
              <p className="text-white text-xl">No favorite anime yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ConfirmRemoveToast = (mal_id: number) => (
    <div>
      <span>Are you sure you want to remove this anime from your favorites?</span>
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => {
            removeAnimeFromFavorites(mal_id);
            setFavoriteList(getAnimeAdd());
            toast.dismiss();
          }}
          className="px-4 py-2 bg-gray-700 text-white rounded-md 
            hover:bg-gray-600 transition-all hover:scale-105"
        >
          Yes, remove
        </button>
        <button
          onClick={() => toast.dismiss()}
          className="px-4 py-2 bg-gray-700 text-white rounded-md 
            hover:bg-gray-600 transition-all hover:scale-105"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const handleRemove = (mal_id: number) => {
    toast.warn(ConfirmRemoveToast(mal_id), {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  return (
    <div className="bg-black bg-opacity-50 min-h-screen">
      <div className="space-y-6 pb-6">
        <FavoriteSection />
      </div>
      <ToastContainer className="z-[9999]" />
    </div>
  );
};

export default MyFavoritePage;
