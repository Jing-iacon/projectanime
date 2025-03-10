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

        <div className="text-white mt-20 text-3xl ml-14 font-bold">
          Anime Upcoming
        </div>
        <Slider
          items={upcoming.map((upcoming, idx) => (
            <AnimeSeasonUpcoming
              upcoming={upcoming}
              key={upcoming.mal_id}
              idx={idx + 1}
            />
          ))}
          autoPlay
          autoPlayInterval={5000}
        />
        <div className="now-body w-full box-border flex flex-col">
          <div className="nowbody-container px-4">
            <h1 className="Season text-white text-3xl ml-12 font-bold">
              Anime Season Now
            </h1>

            {/* ✅ กล่องสีขาวอยู่ตรงกลาง */}
            <div className="now-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {renderNow}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 bg-black bg-opacity-50 top-50 left-0 z-50 shadow-md p-10">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1 || loading}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 hover:bg-gray-600 transition-transform transform hover:scale-110"
        >
          <svg
            className="w-4 h-4 text-white rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </button>

        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages || loading}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 hover:bg-gray-600 transition-transform transform hover:scale-110"
        >
          <svg
            className="w-4 h-4 text-white rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
