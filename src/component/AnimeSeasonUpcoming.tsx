import { Link } from "react-router-dom";
import type { AnimeSeasonUpcoming } from "../api/types/AnimeSeasonUpcoming";
import "./Upcoming.css";

interface Upcoming {
  upcoming: AnimeSeasonUpcoming;
  idx: number;
}

export default function AnimeSeasonUpcoming({ upcoming, idx }: Upcoming) {
  return (
    <div className="mt-5">
      <div className="containerupcoming w-full h-[450px]">
        <div className="wrapper flex flex-col-reverse">
          <div className="sidebox1">{idx}</div>
          <div className="sidebox2">{upcoming.title}</div>
        </div>
        <div className="imgbox curser-pointer">
          <Link to={`/details/${upcoming.mal_id}`}>
            <img
              src={upcoming.images.webp.large_image_url}
              className="imgcartoon"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
