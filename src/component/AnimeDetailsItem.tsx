import { Link } from "react-router-dom";
import type { AnimeDetails } from "../api/types/AnimeDetail";
import { addAnimeFavorite } from "../pages/MyFavorite/myFavoriteLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 🔹 ต้อง import CSS ด้วย


interface AnimeDetailsItemProps {
  details: AnimeDetails;
}

export default function AnimeDetailsItem({details}: AnimeDetailsItemProps) {


  const handleAddFavorite = ()  => {
      addAnimeFavorite(details); // บันทึกลง Local Storage
      toast.success("✅ Anime added to list!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
  }
  return (
    <div className="bg-black bg-opacity-50 top-0 left-0 z-50 shadow-md pt-10 min-h-screen">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 h-full">
        {/* Anime Poster */}
        <div className="w-full md:w-1/4">
          <img
            src={details.images?.jpg?.large_image_url}
            alt="Poster not available"
            className="w-full rounded-lg"
          />
        </div>

        {/* Anime Detail */}
        <div className="w-full md:w-3/4 flex flex-col justify-between h-full">
          <h1 className="text-3xl font-bold text-white">
            {details.title} • {details.title_japanese}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-green-600 px-2 py-1 rounded text-sm">
              {details.type}
            </span>
            <span className="text-gray-400">• {details.duration}</span>
          </div>

          <p className="mt-4 text-gray-300 text-justify">{details.synopsis}</p>

          <div className="flex gap-4 mt-4">
            
            <button
            className="Add list View more px-4 py-2 text-white font-semibold text-sm rounded-lg 
               bg-gradient-to-r from-red-500 to-red-700 
               hover:from-red-600 hover:to-red-800 
               hover:scale-105 transition-transform duration-300
               w-[100px] cursor-pointer"
            onClick={handleAddFavorite}
          >
            Add list
          </button>
          
          </div>
        </div>
      </div>

      {/* Anime Info */}
      <div className="max-w-5xl mx-auto mt-8">
        <div className="dark:bg-gray-800 dark:border-gray-700 p-4 rounded-lg text-white">
          <p>
            <span className="font-bold">Japanese:</span> {details.title_japanese}
          </p>
          <p>
            <span className="font-bold">Synonyms:</span> {details.background}
          </p>
          <p>
            <span className="font-bold">Aired:</span> {details.aired?.string}
          </p>
          <p>
            <span className="font-bold">Duration:</span> {details.duration}
          </p>
          <p>
            <span className="font-bold">Status:</span> {details.status}
          </p>
          <div className="flex gap-2 mt-2">
            {details.genres?.map((e) => {
              return (
                <span className="bg-gray-700 px-2 py-1 rounded" key={e.name}>
                  {e.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer className="z-[9999]" />
    </div>
  );
}
