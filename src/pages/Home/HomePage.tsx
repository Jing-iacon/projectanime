import { useLoaderData } from "react-router-dom";
import { AnimeLoaderResult } from "./homeLoader";
import AnimeTopItem from "../../component/AnimeTopItem";
import AnimeSeasonUpcoming from "../../component/AnimeSeasonUpcoming";
import AnimeSeasonNow from "../../component/AnimeSeasonNow";
import Carousel from "../../component/Carousel";
import Slider from "../../component/Slider";
import { useEffect, useState } from "react";
import { getAnimeSeasonNow } from "../../api/queries/getAnimeSeaseonNow";

export default function HomePage() {
  const {
    top,
    upcoming,
    now: initialData,
    pagination,
  } = useLoaderData() as AnimeLoaderResult;

  const [currentPage, setCurrentPage] = useState(pagination.current_page);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);

  const totalPages = pagination.last_visible_page;

  const goToNextPage = () => {
    if (currentPage < totalPages && data.length > 0) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const fetchDataForCurrentPage = async () => {
    const response = await getAnimeSeasonNow(currentPage); // ส่งคำค้นหาและ currentPage ไป
    setData(response.data); // อัปเดตข้อมูล
    // console.log("Result:", response.data);
    setLoading(false); // หยุดโหลด
  };

  useEffect(() => {
    if (loading) {
      return setLoading(false);
    }
    setLoading(true);
    fetchDataForCurrentPage();
  }, [currentPage]);

  console.log("data=======>1114", data);

  const renderNow = data.map((now, idx) => (
    <AnimeSeasonNow now={now} key={idx} />
  ));

  return (
    <>
      <div className="bg-black bg-opacity-50 top-50 left-0 z-50 shadow-md">
          <Carousel
            autoPlayInterval={5000}
            items={top.map((e) => (
              <AnimeTopItem top={e} mode={1} key={e.mal_id} />
            ))}
          />

          <Slider
            items={upcoming.map((upcoming,idx) => (
              <AnimeSeasonUpcoming upcoming={upcoming} key={upcoming.mal_id} idx={idx + 1} />
            ))}
            autoPlay
            autoPlayInterval={5000}
          />
        <div className="mx-auto max-w-full px-4 py-16">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Anime Season Now
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:gap-x-5 ">
            {renderNow}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === totalPages || loading}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages || loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      
    </>
  );
}
