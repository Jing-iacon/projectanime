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
    now: initialData, //เปลี่ยนเป็น initialData เพราะอาจทำให้เกิดความสับสนหรือการชนกันของชื่อตัวแปรได้.
    pagination,
  } = useLoaderData() as AnimeLoaderResult;

  const [currentPage, setCurrentPage] = useState(pagination.current_page);
  // ตัวแปรนี้จะถูกใช้ในการแสดงข้อมูลอนิเมะในหน้าๆ หนึ่งในหมวด Anime Season Now.
  const [data, setData] = useState(initialData);
  // ถ้าใช้ now ตรง ๆ อาจสับสนว่าเป็นค่าคงที่ (const) หรือค่าที่อัปเดตได้ (useState)
  // now จาก useLoaderData() เป็นค่าตั้งต้นจากเซิร์ฟเวอร์.
  // แต่ useState(now) จะทำให้ now กลายเป็นค่าที่เปลี่ยนแปลงได้.
  // อาจทำให้คนอ่านโค้ดเข้าใจผิดว่าค่า now เปลี่ยนแปลงโดยตรง.
  const [loading, setLoading] = useState(true);
  //บรรทัดนี้ตั้งค่าสถานะ loading เป็น true เพื่อระบุว่าการดำเนินการดึงข้อมูลกำลังจะเริ่มต้น ช่วยในการจัดการองค์ประกอบ UI เช่น การแสดงตัวหมุนโหลด
  const totalPages = pagination.last_visible_page;

  const fetchDataForCurrentPage = async () => {
    try {
      const response = await getAnimeSeasonNow(currentPage);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch anime data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      return setLoading(false); // 2 บรรทัดนี้เป็นการตรวจสอบสถานะ เพื่อป้องกันไม่ใม่ให้ทำงานซ้ำ
    }
    setLoading(true);
    fetchDataForCurrentPage();
  }, [currentPage]);

  // Navigation handlers
  const handlePagination = (direction: "prev" | "next") => {
    if (direction === "next" && currentPage < totalPages && data.length > 0) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Section components
  const TopSection = () => (
    // ทำ component ชื่อ TopSection โดยรับค่า top จาก useLoaderDataเเละครอบด้วย carousel
    // โดยใน carousel ส่ง prop ชื่อ items เป็น top.map(item => ( เเละ autoPlayInterval = 5000
    <div className="relative">
      <Carousel
        autoPlayInterval={5000}
        items={top.map((item) => (
          <AnimeTopItem top={item} mode={1} key={item.mal_id} />
        ))}
      />
    </div>
  );

  const UpcomingSection = () => (
    <>
      <h2 className="text-white mt-20 text-3xl ml-14 font-bold">
        Anime Upcoming
      </h2>
      <Slider
        items={upcoming.map((item, idx) => (
          <AnimeSeasonUpcoming
            upcoming={item}
            key={item.mal_id}
            idx={idx + 1}
          />
        ))}
        autoPlay
        autoPlayInterval={5000}
      />
    </>
  );

  const CurrentSeasonSection = () => (
    <div className="now-body w-full box-border flex flex-col">
      <div className="nowbody-container px-4">
        <h2 className="text-white text-3xl ml-4 font-bold mb-4 ">
          Anime Season Now
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mx-auto max-w-[1920px] mt-10">
          {data.map((item) => (
            <AnimeSeasonNow now={item} key={item.mal_id} />
          ))}
        </div>
      </div>
    </div>
  );

  const PaginationControls = () => (
    <div className="flex items-center justify-center gap-4 bg-black bg-opacity-50 p-6">
      <button
        onClick={() => handlePagination("prev")}
        disabled={currentPage === 1 || loading}
        className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 
          hover:bg-gray-600 transition-all hover:scale-105"
      >
        Previous
      </button>

      <span className="text-white font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => handlePagination("next")}
        disabled={currentPage === totalPages || loading}
        className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 
          hover:bg-gray-600 transition-all hover:scale-105"
      >
        Next
      </button>
    </div>
  );

  return (
    <div className="bg-black bg-opacity-50 min-h-screen">
      <div className="space-y-8">
        <TopSection />
        <UpcomingSection />
        <CurrentSeasonSection />
        <PaginationControls />
      </div>
    </div>
  );
}
