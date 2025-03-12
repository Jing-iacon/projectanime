import { Link } from "react-router-dom";
import type { TopData } from "../api/types/AnimeTop";
import { addAnimeFavorite } from "../pages/MyFavorite/myFavoriteLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 🔹 ต้อง import CSS ด้วย

interface TopProps {
  top: TopData;
  mode?: number;
}

export default function AnimeTopItem({ top, mode = 1 }: TopProps) {
  const handleAddFavorite = () => {
    addAnimeFavorite(top);
    toast.success("Anime added to list!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };
  const jsx1 = (
    <header className="w-[95%] mx-auto bg-black bg-opacity-50 p-2 sm:p-3 md:p-4 rounded-lg">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 md:gap-8 lg:gap-20 px-2 sm:px-4 lg:pr-10">
          {/* Info Section */}
          <section className="flex-1 space-y-4 sm:space-y-6 px-2 sm:px-4 md:px-6">
            {/* Hero Section */}
            <div className="space-y-2 sm:space-y-4">
              <h1 className="text-white font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl animate-fade-in leading-tight sm:leading-tight lg:leading-tight">
                Explore The <span className="text-red-500">Diverse Realms</span>{" "}
                of Anime Magic With
                <span className="text-red-500"> COSMOS</span>
              </h1>
              <hr className="border-gray-400" />
            </div>

            {/* Anime Details Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-green-400 text-sm sm:text-base lg:text-lg font-semibold">
                  #{top.rank} Spotlight
                </p>
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold line-clamp-1">
                  {top.title}
                </h1>
              </div>

              {/* Meta Info */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-400 text-xs sm:text-sm lg:text-base">
                  <div className="flex items-center gap-1 text-green-400">
                    {top.type}
                  </div>
                  <div className="flex flex-wrap items-center gap-1">
                    {top.genres?.map((e) => (
                      <span className="bg-gray-700 px-2 py-1 rounded text-xs sm:text-sm" key={e.name}>
                        {e.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-4 text-gray-400 text-xs sm:text-sm">
                  <p><strong>Rating:</strong> {top.score}/10</p>
                  <p><strong>Members:</strong> {top.favorites}</p>
                  <p><strong>Favorites:</strong> {top.popularity}</p>
                </div>
              </div>

              {/* Synopsis */}
              <p className="text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base line-clamp-3">
                {top.synopsis}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 pt-4">
                <Link to={`/details/${top.mal_id}`} className="w-full sm:w-auto">
                  <button className="w-full sm:w-[200px] px-4 sm:px-6 py-2 sm:py-3 
                    text-white font-semibold text-base sm:text-lg rounded-lg 
                    bg-gradient-to-r from-red-500 to-red-700 
                    hover:from-red-600 hover:to-red-800 
                    hover:scale-105 transition-transform duration-300">
                    View More
                  </button>
                </Link>
                <button
                  onClick={handleAddFavorite}
                  className="w-full sm:w-[200px] px-4 sm:px-6 py-2 sm:py-3 
                    text-white font-semibold text-base sm:text-lg rounded-lg 
                    bg-gradient-to-r from-red-500 to-red-700 
                    hover:from-red-600 hover:to-red-800 
                    hover:scale-105 transition-transform duration-300">
                  Add List
                </button>
              </div>
            </div>
          </section>

          {/* Image Section */}
          <section className="relative flex-1 h-48 sm:h-64 md:h-80 lg:h-[600px] flex justify-center items-center overflow-hidden rounded-lg px-4">
            <div className="w-full h-full">
              <img
                alt="Anime Image"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                src={top.images.webp.large_image_url}
              />
            </div>
          </section>
        </div>
      </div>
      <ToastContainer className="z-[9999]" />
    </header>
);

  switch (mode) {
    case 1:
      return jsx1;
    case 2:
    default:
      return <>Error</>;
  }
}
