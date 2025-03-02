import { useLoaderData } from "react-router-dom";
import { AnimeLoaderResult } from "./homeLoader";
import AnimeTopItem from "../../component/AnimeTopItem";
import AnimeSeasonUpcoming from "../../component/AnimeSeasonUpcoming";
import AnimeSeasonNow from "../../component/AnimeSeasonNow";
import Carousel from "../../component/Carousel";
import Slider from "../../component/Slider";

export default function HomePage() {
  const { top, upcoming, now } = useLoaderData() as AnimeLoaderResult;
  console.log("topAnime", top);
  console.log("animeSeasonUpcoming", upcoming);
  console.log("animeNow", now);

  // const renderTop = top.map((top) => {
  //   return <AnimeTopItem top={top} mode={2} key={top.data.mal_id} />;
  // });

  // const renderUpcoming = upcoming.map((upcoming) => {
  //   return <AnimeSeasonUpcoming upcoming={upcoming} key={upcoming.mal_id} />;
  // });

  const renderNow = now.data.map((now) => (
    <AnimeSeasonNow now={now} key={now.mal_id} />
  ));

  return (
    <div>
      <hr />
      <h2 className="text-2xl font-bold tracking-tight text-white dark:bg-gray-800 dark:border-gray-700">
        Top Anime
      </h2>
      <Carousel
        autoPlayInterval={3000}
        items={top.map((e) => (
          <AnimeTopItem top={e} mode={1} key={e.mal_id} />
        ))
        }
      />
    
      {/* <div className="bg-gray-900">{renderTop}</div> */}
      <h2 className="text-2xl font-bold tracking-tight text-white dark:bg-gray-800 dark:border-gray-700">
        Anime Season Upcoming
      </h2>
      <Slider
        items={upcoming.map((upcoming) => (
          <AnimeSeasonUpcoming upcoming={upcoming} key={upcoming.mal_id} />
        ))}
        autoPlay
        autoPlayInterval={3000}
      />
      {/* <div className="bg-gray-900 flex">{renderUpcoming}</div> */}
      <div className="bg-gray-900">
        <div className="mx-auto max-w-full px-4 py-16">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Anime Season Now
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:gap-x-5">
            {renderNow}
          </div>
        </div>
      </div>
    </div>
  );
}
