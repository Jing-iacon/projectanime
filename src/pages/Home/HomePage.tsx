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
        <div className="now-body  w-full h-screen box-border flex flex-col">
          <div className="nowbody-container">
            <h1 className="Season text-white text-3xl ml-14 font-bold">
              Anime Season Now
            </h1>

            {/* ✅ กล่องสีขาวอยู่ตรงกลาง */}
            <div className="now-container grid grid-cols-6 grid-rows-2 gap-1 h-full mx-auto">
              {renderNow}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 bg-black bg-opacity-50 top-50 left-0 z-50 shadow-md p-10">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === totalPages || loading}
          className="px-4 py-2 bg-gray-700 rounded-md disabled:opacity-50"
        >
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
        >
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Nex</span>
        </button>
      </div>
    </>
  );
}
