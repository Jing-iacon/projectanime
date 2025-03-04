import { useLoaderData } from "react-router-dom";
import { AnimeLoaderResult } from "./homeLoader";
import AnimeTopItem from "../../component/AnimeTopItem";
import AnimeSeasonUpcoming from "../../component/AnimeSeasonUpcoming";
import AnimeSeasonNow from "../../component/AnimeSeasonNow";
import Carousel from "../../component/Carousel";
import Slider from "../../component/Slider";
import { useEffect, useState} from "react";
import { getAnimeSeasonNow } from "../../api/queries/getAnimeSeaseonNow";

export default function HomePage() {
  const { top, upcoming, now: initialData, pagination } = useLoaderData() as AnimeLoaderResult;

  const [currentPage, setCurrentPage] = useState(pagination.current_page);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    fetchDataForCurrentPage();
  }, [currentPage]);

  const renderNow = (data ?? []).map((now) => (
    <AnimeSeasonNow now={now} key={now.mal_id} />
  ));

  return (
    <>
    <div>
      <hr />
      <h2 className="text-2xl font-bold tracking-tight text-white dark:bg-gray-800 dark:border-gray-700">
        Top Anime
      </h2>
      <Carousel
        autoPlayInterval={5000}
        items={top.map((e) => (
          <AnimeTopItem top={e} mode={1} key={e.mal_id} />
        ))}
      />

      <h2 className="text-2xl font-bold tracking-tight text-white dark:bg-gray-800 dark:border-gray-700">
        Anime Season Upcoming
      </h2>
      <Slider
        items={upcoming.map((upcoming) => (
          <AnimeSeasonUpcoming upcoming={upcoming} key={upcoming.mal_id} />
        ))}
        autoPlay
        autoPlayInterval={5000}
      />
    </div>
    <div className="bg-gray-900">
        <div className="mx-auto max-w-full px-4 py-16">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Anime Season Now
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:gap-x-5">
            {renderNow}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages }
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
