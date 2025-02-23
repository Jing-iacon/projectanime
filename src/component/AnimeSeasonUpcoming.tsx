import type { AnimeSeasonUpcoming } from "../api/types/AnimeSeasonUpcoming";

interface Upcoming {
  upcoming: AnimeSeasonUpcoming;
}

export default function AnimeSeasonUpcoming({ upcoming }: Upcoming) {
  return (
    <div className="container">
      <div className="border-1 border-red-400 wrapper flex flex-row">
        <div className="card flex flex-row m-8 border-1 border-white">
          <div className="anime-name border-1 border-red-400 m-8 flex flex-col justify-end">
            <p className="border-1 border-red-400 wrapper transform rotate-270 origin-top-left ">
              {upcoming.title}
            </p>
          </div>
          <div className="w-full h-fit object-cover">
            <img src={upcoming.images.webp.large_image_url} />
          </div>
        </div>
      </div>
    </div>
  );
}
