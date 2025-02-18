import { useLoaderData } from "react-router-dom"
import { AnimeSeasonUpcomingLoader, AnimeFeatureLoader, AnimeRecommendLoader} from "./homeLoader";
export default function HomePage() {

    const {topAnime,animeSeasonUpcoming,animeRecommend} = useLoaderData() as {
        topAnime: AnimeFeatureLoader,
        animeSeasonUpcoming: AnimeSeasonUpcomingLoader,
        animeRecommend: AnimeRecommendLoader
    }
    
    console.log("topAnime", topAnime);
    console.log("animeSeasonUpcoming", animeSeasonUpcoming);
    console.log("animeRecommend", animeRecommend);
  
    return (
        <div>
            Home Page
        </div>
    )
}