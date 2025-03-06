import { Link } from "react-router-dom";
import type { TopData } from "../api/types/AnimeTop";
import { addAnimeFavorite } from "../pages/MyFavorite/myFavoriteLoader";

interface TopProps {
  top: TopData;
  mode?: number;
}

export default function AnimeTopItem({ top, mode = 1 }: TopProps) {
  //รับตัวแปรเป็นค่า top เเล้ว top ที่ได้ออกมาเป็น top: AnimeTop จึงใช้ destructuring {top} ออกมา ทำให้ไม่ต้อง ใช้ top.top.xxx
  const handleAddFavorite = () => {
    addAnimeFavorite(top); // บันทึกลง Local Storage
  };
  const jsx1 = (
    <>
      <header className="w-full bg-black bg-opacity-50 top-50 left-0 z-50 shadow-md p-4 mx-4">
        <div className="flex flex-col lg:flex-row gap-6 lg:pr-10">
          {/* 🔹 คอลัมน์ซ้าย (ข้อมูลอนิเมะ) */}
          <div
            className="flex-1 flex flex-col gap-4 sm:gap-6"
            style={{ opacity: 1, willChange: "auto", transform: "none" }}
          >
            {/* 🔹 ชื่อและหัวข้อ */}
            <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-fade-in">
              Explore The <span className="text-red-500">Diverse Realms</span>{" "}
              of Anime Magic With
              <span className="text-red-500"> COSMOS</span>
            </h1>

            <hr className="border-gray-400" />

            {/* 🔹 ข้อมูลอันดับ */}
            <p className="text-green-400 text-sm sm:text-lg font-semibold">
              #{top.rank} Spotlight
            </p>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold line-clamp-1">
              {top.title}
            </h1>

            {/* 🔹 หมวดหมู่และวันที่ */}
            <div className="flex items-center gap-4 text-gray-400 text-sm sm:text-base">
              <div className="flex items-center gap-1">
                {top.type}  
              </div>
              <div className="flex items-center gap-1 ">
                {top.genres?.map((e) => (
                  <span className="bg-gray-700 px-2 py-1 rounded" key={e.name}>
                    {e.name}
                  </span>
                ))}
              </div>
            </div>

            {/* 🔹 คะแนนและข้อมูลสถิติ */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-gray-400 text-xs sm:text-sm">
              <p>
                <strong>Rating:</strong> {top.score}/10
              </p>
              <p>
                <strong>Members:</strong> {top.favorites}
              </p>
              <p>
                <strong>Favorites:</strong> {top.popularity}
              </p>
            </div>

            {/* 🔹 คำอธิบายอนิเมะ */}
            <p className="text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base line-clamp-3">
              {top.synopsis}
            </p>

            <div className="button container flex gap-5">
              {/* 🔹 ปุ่ม "View More" */}
              <Link to={`/details/${top.mal_id}`}>
                <button
                  className="mt-4 inline-block px-6 py-3 text-white font-semibold text-lg rounded-lg 
                   bg-gradient-to-r from-red-500 to-red-700 
                   hover:from-red-600 hover:to-red-800 
                   hover:scale-105 transition-transform duration-300
                   w-[200px]"
                >
                  View More
                </button>
              </Link>
              <button
                onClick={handleAddFavorite}
                className="mt-4 inline-block px-6 py-3 text-white font-semibold text-lg rounded-lg 
                   bg-gradient-to-r from-red-500 to-red-700 
                   hover:from-red-600 hover:to-red-800 
                   hover:scale-105 transition-transform duration-300
                   w-[200px]"
              >
                Add List
              </button>
            </div>
          </div>

          {/* 🔹 คอลัมน์ขวา (รูปภาพ) */}
          <div className="relative flex-1 h-64 sm:h-80 md:h-96 lg:h-[600px] flex justify-center items-center overflow-hidden rounded-lg">
            <div className="opacity-100 will-change-auto transform-none">
              <img
                alt="Anime Image"
                loading="lazy"
                decoding="async"
                className="w-[425px] h-[600px] object-contain hover:scale-105 transition-transform duration-500 hidden lg:block"
                src={top.images.webp.large_image_url}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );

  switch (mode) {
    case 1:
      return jsx1;
    case 2:
    default:
      return <>Error</>;
  }
}
