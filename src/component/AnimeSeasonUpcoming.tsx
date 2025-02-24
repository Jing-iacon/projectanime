import type { AnimeSeasonUpcoming } from "../api/types/AnimeSeasonUpcoming";

interface Upcoming {
  upcoming: AnimeSeasonUpcoming;
}

export default function AnimeSeasonUpcoming({ upcoming }: Upcoming) {
  return (
    <div className="flex w-max rounded-xl overflow-hidden dark:bg-gray-800 dark:border-gray-700 m-auto my-5">
  {/* ส่วนของข้อความ */}
  <div
    className="flex justify-start p-2 text-white text-2xl rotate-180 mx-2 ml-2 rounded-r-xl bg-gray-700 h-[380px] overflow-hidden whitespace-nowrap text-ellipsis"
    style={{
      writingMode: "vertical-rl",
      textOverflow: "ellipsis",
      maxHeight: "380px",
      maxWidth: "40px", // จำกัดความกว้างเพื่อไม่ให้ข้อความแสดงเกิน
      display: "block",
    }}
  >
    {upcoming.title}
  </div>

  {/* ส่วนของรูปภาพ */}
  <img
    src={upcoming.images.webp.large_image_url}
    alt="Upcoming image"
    className="my-2 mr-2 w-[300px] h-[380px] rounded-r-xl object-cover"
  />
</div>

  );
}
