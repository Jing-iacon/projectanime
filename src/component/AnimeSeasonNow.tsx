import { Link } from "react-router-dom";
import type { AnimeData } from "../api/types/AnimeSeasonNow";

interface AnimeNowItemProps {
  now: AnimeData;
}

export default function AnimeSeasonNow({ now }: AnimeNowItemProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 w-full flex flex-col">
      <Link to={`/details/${now.mal_id}`}>
        <div className="w-full overflow-hidden rounded-t-lg">
          <img
            src={now.images.webp?.large_image_url}
            alt={now.title}
            className="p-4 w-[320px] h-[380px] bg-gray-800 group-hover:opacity-75 transition-opacity duration-300 object-cover"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <Link to={`/details/${now.mal_id}`}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
              {now.title}
            </h3>
          </Link>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
            {now.type}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to={`/details/${now.mal_id}`}
            className="w-[110px] mt-4 inline-flex items-center justify-center p-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-400 dark:hover:bg-blue-300 dark:focus:ring-blue-800"
          >
            Read more
          </Link>
          <Link
            to={`/myfavorite/`}
            className="w-[140px] mt-4 inline-flex items-center justify-center p-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-400 dark:hover:bg-blue-300 dark:focus:ring-blue-800"
          >
            Add Favorite
          </Link>
        </div>
      </div>
    </div>
  );
}
