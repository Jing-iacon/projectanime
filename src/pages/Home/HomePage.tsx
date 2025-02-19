import { useLoaderData } from "react-router-dom"
import { AnimeLoaderResult } from "./homeLoader";
export default function HomePage() {

    const {topAnime,animeSeasonUpcoming,animeRecommend} = useLoaderData() as AnimeLoaderResult;
    console.log("topA nime", topAnime);
    console.log("animeSeasonUpcoming", animeSeasonUpcoming);
    console.log("animeRecommend", animeRecommend);
  
    return (
        <div>
            Home Page
            {topAnime.map(e => <div>{e.mal_id}</div>)}
            Hello
            {animeRecommend.map(e => <div>{e.mal_id}</div>)}
        </div>
    )
}