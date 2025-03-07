import { useLoaderData } from "react-router-dom";
import type { SearchLoaderResult } from "./searchLoader";
import AnimeListItem from "../../component/AnimeListItem";
import { useState, useEffect } from "react";
import { searchResult } from "../../api/queries/searchResult"; // นำเข้าฟังก์ชัน searchResult

export default function SearchPage() {
  const {
    searchResult: initialData,
    pagination,
    searchTerm,
  } = useLoaderData() as SearchLoaderResult;

  // กำหนด state สำหรับหน้า, ข้อมูล และสถานะการโหลด
  const [currentPage, setCurrentPage] = useState(pagination.current_page);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const totalPages = pagination.last_visible_page; // ใช้ last_visible_page แทน total
  // console.log("totalPages :",totalPages);

  // ฟังก์ชันสำหรับไปหน้าถัดไป
  const goToNextPage = () => {
    if (currentPage < totalPages && data.length > 0) {
      // เพิ่มเงื่อนไขตรวจสอบว่ามีข้อมูลในหน้านั้นหรือไม่
      setCurrentPage((prev) => prev + 1);
    }
  };

  // ฟังก์ชันสำหรับย้อนกลับไปหน้าก่อนหน้า
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // ฟังก์ชันดึงข้อมูลใหม่จาก API
  const fetchDataForCurrentPage = async () => {
    const response = await searchResult(searchTerm, currentPage); // ส่งคำค้นหาและ currentPage ไป
    setData(response.data); // อัปเดตข้อมูล
    // console.log("Result:", response.data);
    setLoading(false); // หยุดโหลด
  };

  // รีเฟรชข้อมูลทุกครั้งที่ currentPage, limit หรือ searchTerm เปลี่ยนแปลง
  useEffect(() => {
    setLoading(true); // เริ่มโหลดข้อมูล
    fetchDataForCurrentPage();
    // console.log("CurrentPage: " + currentPage);
  }, [currentPage, searchTerm]); // เมื่อ currentPage, limit หรือ searchTerm เปลี่ยนแปลงจะโหลดข้อมูลใหม่

  const renderResult = data.map((result) => {
    return <AnimeListItem result={result} key={result.mal_id} />;
  });

  return (
    <div className="bg-black bg-opacity-50 top-50 left-0 z-50 shadow-md">
      <div className="mx-auto max-w-full px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Search Result For {searchTerm}
        </h2>

        {/* แสดงผลลัพธ์ */}
        <div className="mt-3 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-5">
          {loading ? (
            <div className="text-white text-center">Loading...</div> // แสดงข้อความกำลังโหลด
          ) : (
            renderResult
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1 || loading}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}{" "}
            {/* แสดงหน้าปัจจุบัน และจำนวนหน้าทั้งหมด */}
          </span>
          <button
            onClick={goToNextPage}
            disabled={
              currentPage === totalPages || loading || data.length === 0
            } // ปุ่ม Next จะถูกปิดหากไม่มีข้อมูลในหน้า
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
