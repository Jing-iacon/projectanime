// src/components/AnimeCard.tsx
import { Link } from "react-router-dom";
import type { ResultData } from "../api/types/AnimeResult";

interface AnimeCardProps {
  anime: ResultData;
  onRemove?: (mal_id: number) => void; // รองรับการลบ (optional)
}

export default function AnimeFavoriteCard({ anime, onRemove }: AnimeCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 w-full flex flex-col">
      <Link to={`/details/${anime.mal_id}`}>
        <div className="w-full overflow-hidden rounded-t-lg">
          <img
            src={anime.images.webp?.large_image_url}
            alt="No Image Available"
            className="p-4 w-[320px] h-[380px] bg-gray-800 group-hover:opacity-75 transition-opacity duration-300"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <Link to={`/details/${anime.mal_id}`}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
              {anime.title}
            </h3>
          </Link>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
            {anime.type}
          </p>
        </div>
        <div className="flex gap-3">
          {onRemove && (
            <button
              onClick={() => onRemove(anime.mal_id)}
              className="w-[140px] mt-4 inline-flex items-center justify-center p-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-400 dark:focus:ring-red-800"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
