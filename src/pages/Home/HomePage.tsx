import { useLoaderData } from "react-router-dom"
import { AnimeLoaderResult } from "./homeLoader";
import AnimeTopItem from "../../component/AnimeTopItem";
export default function HomePage() {

    const {top,Upcoming,Recommend} = useLoaderData() as AnimeLoaderResult;
    console.log("topA nime", top);
    console.log("animeSeasonUpcoming", Upcoming);
    console.log("animeRecommend", Recommend);

    const renderTop = top.map((top) => {
        return <AnimeTopItem top={top} key={top.title}/>
    })
  
    return (
        <div>
            Home Page
            {renderTop}
            Hello
            {Recommend.map(e => <div>{e.mal_id}</div>)}
        </div>
    )
}