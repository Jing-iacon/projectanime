import type { AnimeTop } from "../api/types/AnimeTop";

interface TopProps {
  top: AnimeTop;
}

export default function AnimeTopItem({ top }: TopProps) {
  //รับตัวแปรเป็นค่า top เเล้ว top ที่ได้ออกมาเป็น top: AnimeTop จึงใช้ destructuring {top} ออกมา ทำให้ไม่ต้อง ใช้ top.top.xxx
  return (
<div className="m-8 max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-full border border-amber-600">
  <div className="md:flex border border-red-600">
    <div className="p-5">
      <div className="border border-red-600 text-l font-semibold tracking-wide text-yellow-400 uppercase mb-3">#{top.rank} spotlight</div>
      <a href="#" className="border border-red-600 mt-1 block text-4xl leading-tight font-medium text-black hover:underline">
        {top.title}
      </a>
      <p className="border border-red-600 mt-2 text-gray-500 text-xl line-clamp-3 h-auto flex-grow">
       {top.synopsis}
      </p>
      <button className="bg-gray-600 h-[35px] w-[70px] rounded-2xl text-white mt-3 md:text-center" >Detail</button>
    </div>
    <div className="border border-red-600 md:shrink-0">
      <img
        className="h-48 w-full object-cover md:h-full md:w-48 max-w-none"
        src={top.images.webp.large_image_url}
        alt=""
      />
    </div>
  </div>
</div>

 )
}
    
{/*  */}
 
