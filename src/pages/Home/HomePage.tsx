import { useLoaderData } from "react-router-dom";
import { AnimeLoaderResult } from "./homeLoader";
import AnimeTopItem from "../../component/AnimeTopItem";
import AnimeSeasonUpcoming from "../../component/AnimeSeasonUpcoming";
import AnimeSeasonNow from "../../component/AnimeSeasonNow";
export default function HomePage() {
  const { top, upcoming, now } = useLoaderData() as AnimeLoaderResult;
  console.log("topAnime", top);
  console.log("animeSeasonUpcoming", upcoming);
  console.log("animeNow", now);

  const renderTop = top.map((top) => {
    return <AnimeTopItem top={top} key={top.title} />;
  });

  const renderUpcoming = upcoming.map((upcoming) => {
    return <AnimeSeasonUpcoming upcoming={upcoming} key={upcoming.title} />;
  });

  const renderNow = now.data.map((now) => (
    <AnimeSeasonNow now={now} key={now.mal_id} />
  ));

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-white">Top Anime</h2>
      <div className="bg-gray-900">{renderTop}</div>
      <h2 className="text-2xl font-bold tracking-tight text-white">Anime Season Upcoming</h2>
      <div className="bg-gray-900 flex">{renderUpcoming}</div>
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
