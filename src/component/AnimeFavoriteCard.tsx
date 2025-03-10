// src/components/AnimeCard.tsx
import { Link } from "react-router-dom";
import type { ResultData } from "../api/types/AnimeResult";

interface AnimeCardProps {
  anime: ResultData;
  onRemove?: (mal_id: number) => void; // รองรับการลบ (optional)
}

export default function AnimeFavoriteCard({ anime, onRemove }: AnimeCardProps) {
  return (
    <div className="wrapper-res shadow-lg shadow-gray-800 rounded-lg overflow-hidden p-2 
  hover:scale-105 transition-transform duration-300 min-h-[350px] flex flex-col">
      <Link to={`/details/${anime.mal_id}`}>
        <div className="w-full overflow-hidden rounded-t-lg">
          <img
            src={anime.images.webp?.large_image_url}
            alt="No Image Available"
            className="w-[320px] h-[380px] bg-gray-800 group-hover:opacity-75 transition-opacity duration-300"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <Link to={`/details/${anime.mal_id}`}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
              {anime.title}
            </h3>
          </Link>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
            {anime.type}
          </p>
          <div className="details-now flex flex-wrap gap-2 text-gray-400  mt-3">
            {anime?.genres?.map((e) => (
              <span className="bg-gray-700 px-2 py-1 rounded text-xs" key={e.name}>
                {e.name}
              </span>
            ))}
          </div>
        </div>
        {onRemove && (
          <div className="flex justify-start mt-5">
            <button
              onClick={() => onRemove(anime.mal_id)}
              className="w-[140px] p-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-400 dark:focus:ring-red-800"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

