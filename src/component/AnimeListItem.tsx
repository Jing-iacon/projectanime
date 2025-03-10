import { Link } from "react-router-dom";
import type { ResultData } from "../api/types/AnimeResult";
import { addAnimeFavorite } from "../pages/MyFavorite/myFavoriteLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 🔹 ต้อง import CSS ด้วย

interface AnimeListItemProps {
  result: ResultData;
}

export default function AnimeListItem({ result }: AnimeListItemProps) {
  const handleAddFavorite = () => {
    addAnimeFavorite(result); // บันทึกลง Local Storage
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

  return (
    <div
      className="wrapper-res shadow-lg shadow-gray-800 rounded-lg overflow-hidden p-2 
  hover:scale-105 transition-transform duration-300 min-h-[350px]"
    >
      <div className="card-container flex flex-col justify-between h-full">
        {/* 🔹 รูปภาพ */}
        <div className="img">
          <img
            src={result.images.webp?.large_image_url}
            className="nowimg cursor-pointer"
          />
        </div>

        {/* 🔹 ชื่อ Anime */}
        <h1 className="name line-clamp-1 mx-3 text-start text-lg">{result.title}</h1>

        {/* 🔹 รายละเอียด */}
        <div className="details-container flex-grow">
          <div className="details-now text-green-400 mx-4 font-bold">
            {result.type} - {result.duration}
          </div>
          <div className="details-now flex flex-wrap gap-2 text-gray-400 mx-4 mt-3">
            {result.genres?.map((e) => (
              <span
                className="bg-gray-700 px-2 py-1 rounded text-xs"
                key={e.name}
              >
                {e.name}
              </span>
            ))}
          </div>
        </div>

        {/* 🔹 ปุ่ม (ติดอยู่ด้านล่างสุด) */}
        <div className="button-container mt-4 mr-8 flex gap-2 justify-center pb-3">
          <Link to={`/details/${result.mal_id}`}>
            <button
              className="View more px-4 py-2 text-white font-semibold text-sm rounded-lg 
               bg-gradient-to-r from-red-500 to-red-700 
               hover:from-red-600 hover:to-red-800 
               hover:scale-105 transition-transform duration-300
               w-[100px] cursor-pointer"
            >
              View more
            </button>
          </Link>
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
      <ToastContainer className="z-[9999]" />
    </div>
  );
}
