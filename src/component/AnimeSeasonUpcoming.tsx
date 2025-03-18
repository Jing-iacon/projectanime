import { Link } from "react-router-dom";
import type { AnimeSeasonUpcoming } from "../api/types/AnimeSeasonUpcoming";
import "./Upcoming.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Upcoming {
  upcoming: AnimeSeasonUpcoming;
  idx: number;
}

export default function AnimeSeasonUpcoming({ upcoming, idx }: Upcoming) {

  return (
    <div className="mt-4 w-[95%]"> {/* Reduced width from w-full to w-[95%] and margin top */}
      <div className="wrapper-upcoming shadow-lg shadow-gray-800 rounded-lg overflow-hidden p-1.5 
        hover:scale-105 transition-transform duration-300 h-full">
        <div className="card-container flex flex-col justify-between h-full relative">
          {/* Rank indicator */}
          <div className="rank-indicator absolute top-0 left-0 bg-red-600 text-white font-bold px-2 py-0.5 rounded-br-lg z-10">
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
          <h1 className="name line-clamp-1 mx-2 mt-1.5 text-center font-semibold text-sm">{upcoming.title}</h1>
        </div>
      </div>
      <ToastContainer className="z-[9999]" />
    </div>
  );
}
