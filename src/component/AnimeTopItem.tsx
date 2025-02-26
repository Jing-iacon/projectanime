import { Link } from "react-router-dom";
import type { AnimeTop } from "../api/types/AnimeTop";

interface TopProps {
  top: AnimeTop;
  mode?: number;
}

export default function AnimeTopItem({ top, mode = 1 }: TopProps) {
  //รับตัวแปรเป็นค่า top เเล้ว top ที่ได้ออกมาเป็น top: AnimeTop จึงใช้ destructuring {top} ออกมา ทำให้ไม่ต้อง ใช้ top.top.xxx
  const jsx1 = (
    <>
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
    </>
  );

  const jsx2 = (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-4">
              <div className="relative w-full max-w-md h-auto overflow-hidden rounded-3xl bg-gray-900 shadow-2xl">
                <img
                  className="w-full h-full object-cover rounded-lg shadow-md"
                  src={top.images.webp.large_image_url}
                  alt=""
                />

                <div
                  className="absolute left-1/2 top-1/2 -ml-16 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
                  aria-hidden="true"
                >
                  <div
                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-40"
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-yellow-400">
                  #{top.rank} Spotlight
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {top.title}
                </h1>
                <div className="max-w-xl">
                  <p className="mt-6 text-justify">{top.synopsis}</p>
                  <p className="mt-8 text-justify">{top.background}</p>
                </div>
              </div>
              <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-900/10 pt-10 sm:grid-cols-4">
                <div>
                  <dt className="text-sm font-semibold leading-6 text-gray-600">
                    Type
                  </dt>
                  <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">
                    {top.type}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold leading-6 text-gray-600">
                    Season
                  </dt>
                  <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">
                    {top.season || "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold leading-6 text-gray-600">
                    Score
                  </dt>
                  <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">
                    {top.score}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold leading-6 text-gray-600">
                    Genres
                  </dt>
                  <dd className="mt-2 text-lg font-bold leading-6 tracking-tight text-gray-900 flex gap-3 flex-row w-full">
                    {top.genres.map((e) => (
                      <span
                        className="bg-gray-700 px-1 py-1 rounded text-white whitespace-nowrap"
                        key={e.name}
                      >
                        {e.name}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
              <div className="mt-10 flex">
                <a
                  href="#"
                  className="text-base font-semibold leading-7 text-yellow-500"
                >
                  Details <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  switch (mode) {
    case 1:
      return jsx1;
    case 2:
      return jsx2;
    default:
      return <>Error</>;
  }
}
