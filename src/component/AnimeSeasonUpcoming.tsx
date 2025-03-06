import type { AnimeSeasonUpcoming } from "../api/types/AnimeSeasonUpcoming";

interface Upcoming {
  upcoming: AnimeSeasonUpcoming;
  idx: number
}

export default function AnimeSeasonUpcoming({ upcoming,idx }: Upcoming) {
  return (
//     <div className="flex w-max rounded-xl overflow-hidden dark:bg-gray-800 dark:border-gray-700 mx-4">
//   {/* ส่วนของข้อความ */}
//   <div
//     className="flex justify-start p-2 text-white text-2xl rotate-180 mx-2 ml-2 rounded-r-xl bg-gray-700 h-[380px] overflow-hidden whitespace-nowrap text-ellipsis"
//     style={{
//       writingMode: "vertical-rl",
//       textOverflow: "ellipsis",
//       maxHeight: "380px",
//       maxWidth: "40px", // จำกัดความกว้างเพื่อไม่ให้ข้อความแสดงเกิน
//       display: "block",
//     }}
//   >
//     {upcoming.title}
//   </div>

//   {/* ส่วนของรูปภาพ */}
//   <img
//     src={upcoming.images.webp.large_image_url}
//     alt="Upcoming image"
//     className="my-2 mr-2 w-[300px] h-[380px] rounded-r-xl object-cover"
//   />
// </div>

<div className="border-1 border-red-600">
  <div className="container w-full h-[400px] border-1 border-white">
    <div className="w-[60px] h-full border-1 border-red-600 text-white">
    index: {idx}
    </div>

  </div>

</div>


  );
}
