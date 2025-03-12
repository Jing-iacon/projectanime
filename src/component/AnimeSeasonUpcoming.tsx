import { Link } from "react-router-dom";
import type { AnimeSeasonUpcoming } from "../api/types/AnimeSeasonUpcoming";
import "./Upcoming.css";
import { addAnimeFavorite } from "../pages/MyFavorite/myFavoriteLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Upcoming {
  upcoming: AnimeSeasonUpcoming;
  idx: number;
}

export default function AnimeSeasonUpcoming({ upcoming, idx }: Upcoming) {

  return (
    <div className="mt-5 w-full">
      <div className="wrapper-upcoming shadow-lg shadow-gray-800 rounded-lg overflow-hidden p-2 
        hover:scale-105 transition-transform duration-300 h-full">
        <div className="card-container flex flex-col justify-between h-full relative">
          {/* Rank indicator */}
          <div className="rank-indicator absolute top-0 left-0 bg-red-600 text-white font-bold px-3 py-1 rounded-br-lg z-10">
            {idx}
          </div>
          
          {/* Image */}
          <div className="img-container w-full aspect-[3/4] overflow-hidden">
            <Link to={`/details/${upcoming.mal_id}`}>
              <img 
                src={upcoming.images.webp.large_image_url} 
                className="upcomingimg cursor-pointer w-full h-full object-cover" 
                alt={upcoming.title}
              />
            </Link>
          </div>

          {/* Anime Title */}
          <h1 className="name line-clamp-1 mx-3 mt-2 text-center font-semibold">{upcoming.title}</h1>

          
        </div>
      </div>
      <ToastContainer className="z-[9999]" />
    </div>
  );
}
