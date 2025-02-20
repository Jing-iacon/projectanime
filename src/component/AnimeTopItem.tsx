import type { AnimeTop } from "../api/types/AnimeTop";

interface TopProps {
  top: AnimeTop;
}

export default function AnimeTopItem({ top }: TopProps) {
  //รับตัวแปรเป็นค่า top เเล้ว top ที่ได้ออกมาเป็น top: AnimeTop จึงใช้ destructuring {top} ออกมา ทำให้ไม่ต้อง ใช้ top.top.xxx
  return (
    <div className="bg-no-repeat bg-right bg-local" style={{ backgroundImage: `url(${top.images.webp.large_image_url})` }}>
        <div className="h-screen">
            {top.title}
        </div>
    </div>






    // <div
    //   className="border-1 border-red-100 bg-gray-900 p-8 h-full max-h-9/10 ">
    //   <div className="bg-no-repeat bg-right bg-local" style={{ backgroundImage: `url(${top.images.webp.large_image_url})` }}>
    //     <div className="flex flex-row ">
    //       <div className="border-2 border-red-900 flex-col basis-1/3">
    //         <div className="text-yellow-300 mb-4">#{top.rank} Spotlight</div>
    //         <div className="text-white text-3xl font-bold mb-4">
    //           {top.title}
    //         </div>
    //         <div className="line-clamp-3 text-white mb-4">{top.synopsis}</div>
    //       </div>
    //     </div>
    //   </div>



    //   <div className="flex gap-4 mt-4">
    //     <button className="px-6 py-2 rounded-full bg-slate-600 text-white border border-none">
    //       Detail
    //     </button>
    //   </div>
    // </div>
);
}
// {/* <div className="w-full max-w-5xl h-full max-h-9/10 mx-auto bg-white shadow-lg rounded-lg p-6 flex items-center gap-6">
// {/* Left Section */}
// <div className="flex-1 space-y-4">
//   <p className="text-gray-600 font-semibold text-sm">{top.title}</p>
//   <h2 className="text-2xl font-bold">{top.title}</h2>
//   <div className="border border-gray-300 p-4 rounded-lg">
//     <p className="text-gray-700">{top.synopsis}</p>
//   </div>
//   <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//     Detail
//   </button>
// </div>

// {/* Right Section (Image + Navigation) */}
// <div className="relative w-1/2">
//   {/* Image */}
//   <div
//     className="w-full h-56 bg-center rounded-lg"
//     style={{ backgroundImage: `url(${top.images.webp.large_image_url})` }}
//   />

//   {/* Navigation Buttons */}
//   <div className="absolute bottom-2 right-2 flex gap-2">
//     <button
      
//       className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded hover:bg-gray-400"
//     >
//       ◀
//     </button>
//     <button
      
//       className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded hover:bg-gray-400"
//     >
//       ▶
//     </button>
//   </div>
// </div>
// </div> */}

 
