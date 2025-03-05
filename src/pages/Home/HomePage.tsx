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
      <div className="bg-gray-900">
        <div>
          <hr />
          <h2 className="text-2xl font-bold tracking-tight text-white px-4">
            Top Anime
          </h2>
          <Carousel
            autoPlayInterval={5000}
            items={top.map((e) => (
              <AnimeTopItem top={e} mode={1} key={e.mal_id} />
            ))}
          />

          <h2 className="text-2xl font-bold tracking-tight text-white px-4">
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
      <header className="w-full bg-black bg-opacity-50 top-0 left-0 z-50 shadow-md p-4">
  <div className="flex flex-col lg:flex-row gap-6 lg:pr-10">
    
    {/* 🔹 คอลัมน์ซ้าย (ข้อมูลอนิเมะ) */}
    <div 
      className="flex-1 flex flex-col gap-4 sm:gap-6"
      style={{ opacity: 1, willChange: "auto", transform: "none" }}
    >
      {/* 🔹 ชื่อและหัวข้อ */}
      <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-fade-in">
        Explore The <span className="text-red-500">Diverse Realms</span> of Anime Magic With 
        <span className="text-red-500"> COSMOS</span>
      </h1>
      
      <hr className="border-gray-700" />

      {/* 🔹 ข้อมูลอันดับ */}
      <p className="text-green-400 text-sm sm:text-lg font-semibold">#4 Spotlight</p>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">One Punch Man</h1>

      {/* 🔹 หมวดหมู่และวันที่ */}
      <div className="flex items-center gap-4 text-gray-400 text-sm sm:text-base">
        <div className="flex items-center gap-1">
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2m0 14H3V5h18z"></path></svg>
          TV
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 18H4V8h16z"></path></svg>
          10/5/2015
        </div>
      </div>

      {/* 🔹 คะแนนและข้อมูลสถิติ */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-gray-400 text-xs sm:text-sm">
        <p><strong>Rating:</strong> 8.49/10</p>
        <p><strong>Members:</strong> 3,351,557</p>
        <p><strong>Favorites:</strong> 65,555</p>
      </div>

      {/* 🔹 คำอธิบายอนิเมะ */}
      <p className="text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base">
        The seemingly unimpressive Saitama has a rather unique hobby: being a hero. 
        In order to pursue his childhood dream, Saitama relentlessly trained for three years, 
        losing all of his hair in the process...
      </p>

      {/* 🔹 ปุ่ม "View More" */}
      <button className="mt-4 inline-block btn glass text-white hover:bg-red-600 transition">
        View More
      </button>
    </div>

    {/* 🔹 คอลัมน์ขวา (รูปภาพ) */}
    <div className="relative flex-1 h-64 sm:h-80 md:h-96 lg:h-[500px] flex justify-center items-center overflow-hidden rounded-lg">
      <div style={{ opacity: 1, willChange: "auto", transform: "none" }}>
        <img 
          alt="One Punch Man" 
          loading="lazy" 
          width="400" 
          height="600" 
          decoding="async"
          className="object-contain hover:scale-105 transition-transform duration-500 hidden lg:block"
          src="https://cdn.myanimelist.net/images/anime/12/76049l.jpg"
        />
      </div>

      {/* 🔹 ปุ่มเลื่อนซ้าย */}
      <button className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 btn btn-square btn-outline transition">
        <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"></path></svg>
      </button>

      {/* 🔹 ปุ่มเลื่อนขวา */}
      <button className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 btn btn-square btn-outline transition">
        <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
      </button>
    </div>

  </div>
</header>

    </>
  );
}
