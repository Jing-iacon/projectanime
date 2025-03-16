// src/components/AnimeCard.tsx
import { Link } from "react-router-dom";
import type { ResultData } from "../api/types/AnimeResult";

interface AnimeCardProps {
  anime: ResultData;
  onRemove?: (mal_id: number) => void; // รองรับการลบ (optional) // void หมายถึง การไม่คืนค่า หรือ ไม่คืนผลลัพธ์ จากฟังก์ชันนั้น ๆ เมื่อฟังก์ชันทำงานเสร็จสิ้น
}

export default function AnimeFavoriteCard({ anime, onRemove }: AnimeCardProps) {
  return (
    <div className="anime-card shadow-lg shadow-gray-800 rounded-lg overflow-hidden 
      hover:scale-[1.02] transition-transform duration-300 bg-[#111111]/70
      w-[280px] h-[600px] flex-shrink-0">
      <div className="flex flex-col h-full">
        {/* Image */}
        <div className="relative overflow-hidden h-[380px]">
          <img 
            src={anime.images.webp?.large_image_url} 
            alt={anime.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col justify-between h-[220px]">
          <div>
            <Link to={`/details/${anime.mal_id}`}>
              <h2 className="text-white font-medium text-lg line-clamp-1 mb-2">
                {anime.title}
              </h2>
            </Link>
            <div className="text-green-400 font-bold text-sm mb-2">
              {anime.type}
            </div>
            
            {/* Genres with fixed height and scrollbar */}
            <div className="h-[80px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
              <div className="flex flex-wrap gap-1.5">
                {anime?.genres?.map((genre) => (
                  <span 
                    className="bg-gray-700 px-2 py-0.5 rounded text-xs text-gray-300 mb-1.5" 
                    key={genre.name}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex gap-3">
            <Link to={`/details/${anime.mal_id}`} className="w-full">
              <button className="w-full px-3 py-2 text-white font-semibold text-sm rounded-lg 
                bg-gradient-to-r from-red-500 to-red-700 
                hover:from-red-600 hover:to-red-800 
                hover:scale-105 active:scale-95 transition-all duration-300">
                View more
              </button>
            </Link>
            {onRemove && (
              <button
                onClick={() => onRemove(anime.mal_id)}
                className="w-full px-3 py-2 text-white font-semibold text-sm rounded-lg 
                  bg-gradient-to-r from-red-500 to-red-700 
                  hover:from-red-600 hover:to-red-800 
                  hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

