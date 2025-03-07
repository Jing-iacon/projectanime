import { Link } from "react-router-dom";
import type { ResultData } from "../api/types/AnimeResult";
import { addAnimeFavorite } from "../pages/MyFavorite/myFavoriteLoader";

interface AnimeListItemProps {
  result: ResultData;
}

export default function AnimeListItem({ result }: AnimeListItemProps) {
  const handleAddFavorite = () => {
    addAnimeFavorite(result); // บันทึกลง Local Storage
  };

  return (
    // <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 w-full flex flex-col">
    //   <Link to={`/details/${result.mal_id}`}>
    //     <div className="w-full overflow-hidden rounded-t-lg">
    //       <img
    //         src={result.images.webp?.large_image_url}
    //         alt="No Image Available"
    //         className="p-4 w-[320px] h-[380px] bg-gray-800 group-hover:opacity-75 transition-opacity duration-300"
    //       />
    //     </div>
    //   </Link>

    //   <div className="p-4 flex flex-col flex-grow justify-between">
    //     <div>
    //       <Link to={`/details/${result.mal_id}`}>
    //         <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
    //           {result.title}
    //         </h3>
    //       </Link>
    //       <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
    //         {result.type}
    //       </p>
    //     </div>
    //     <div className="flex gap-3">
    //       <Link to={`/details/${result.mal_id}`}>
    //         <button className="w-[140px] mt-4 inline-flex items-center justify-center p-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-400 dark:hover:bg-blue-300 dark:focus:ring-blue-800">
    //           Detail
    //         </button>
    //       </Link>
    //       <button
    //         onClick={handleAddFavorite}
    //         className="w-[140px] mt-4 inline-flex items-center justify-center p-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-400 dark:hover:bg-blue-300 dark:focus:ring-blue-800"
    //       >
    //         Add Favorite
    //       </button>
    //     </div>
    //   </div>
    // </div>


    <div className="wrapper-now shadow-lg shadow-gray-800 rounded-lg overflow-hidden p-2">
      <div className="card-container flex flex-col justify-between h-full">
        {/* 🔹 รูปภาพ */}
        <div className="img">
          <img src={result.images.webp?.large_image_url} className="nowimg cursor-pointer" />
        </div>

        {/* 🔹 ชื่อ Anime */}
        <h1 className="name line-clamp-1 mx-3">{result.title}</h1>

        {/* 🔹 รายละเอียด */}
        <div className="details-container flex-grow">
          <div className="details-now text-green-400 mx-4 font-bold">
            {result.type}
          </div>
          <div className="details-now flex flex-wrap gap-2 text-gray-400 mx-4 mt-3">
            {result.genres?.map((e) => (
              <span className="bg-gray-700 px-2 py-1 rounded text-xs" key={e.name}>
                {e.name}
              </span>
            ))}
          </div>
        </div>

        {/* 🔹 ปุ่ม (ติดอยู่ด้านล่างสุด) */}
        <div className="button-container mt-auto mr-3 flex gap-2 justify-center pb-3">
          
          <Link to={`/details/${result.mal_id}`}>
          <button
            className="View more px-4 py-2 text-white font-semibold text-sm rounded-lg 
               bg-gradient-to-r from-red-500 to-red-700 
               hover:from-red-600 hover:to-red-800 
               hover:scale-105 transition-transform duration-300
               w-[100px] cursor-pointer"
          >
            View more
          </button></Link>
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


  );
}
