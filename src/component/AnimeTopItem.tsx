import { Link } from "react-router-dom";
import type { AnimeTop } from "../api/types/AnimeTop";

interface TopProps {
  top: AnimeTop;
}

export default function AnimeTopItem({ top }: TopProps) {
  //รับตัวแปรเป็นค่า top เเล้ว top ที่ได้ออกมาเป็น top: AnimeTop จึงใช้ destructuring {top} ออกมา ทำให้ไม่ต้อง ใช้ top.top.xxx
  return (
    <div className="h-auto flex justify-center ">
      <div className="w-4/5 flex pt-4 rounded-2xl shadow-2xl dark:bg-gray-800 dark:border-gray-700 m-10">
        <div className="w-full flex justify-between rounded-lg p-6 text-white items-stretch">
          {/* ฝั่งซ้าย: Trailer + ข้อมูล */}
          <div className="w-3/5 flex flex-col px-4 gap-6">
            {/* ตรวจสอบว่ามีวิดีโอหรือไม่ */}
            <div className="w-full rounded-lg overflow-hidden shadow-md flex">
              {top.trailer?.embed_url ? (
                <iframe
                  className="w-full aspect-video rounded-lg"
                  src={top.trailer.embed_url}
                ></iframe>
              ) : (
                <div className="w-full aspect-video flex items-center justify-center bg-gray-700 text-gray-300 rounded-lg shadow-md">
                  No Trailer Available
                </div>
              )}
            </div>

            {/* Container สำหรับข้อความและปุ่ม */}
            <div className="w-full ">
              <div className="text-yellow-400 text-lg">
                #{top.rank} spotlight
              </div>
              <div className="text-4xl font-semibold">{top.title}</div>
              <div className="line-clamp-3 mt-3 text-lg">{top.synopsis}</div>
              <Link to={`/details/${top.mal_id}`}>
              <button className="mt-4 h-[45px] w-[130px] rounded-3xl bg-gray-500 text-white hover:bg-white hover:text-gray-900 shadow-md">
                Detail
              </button>
              </Link>
            </div>
          </div>

          {/* ฝั่งขวา: รูปภาพที่สูงเท่า Iframe จริงๆ */}
          <div className="w-fit object-cover flex justify-end">
            <img
              src={top.images.webp.large_image_url}
              alt={top.title}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
