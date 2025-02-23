import { useLoaderData } from "react-router-dom"
import { AnimeLoaderResult } from "./homeLoader";
import AnimeTopItem from "../../component/AnimeTopItem";
import AnimeSeasonUpcoming from "../../component/AnimeSeasonUpcoming";
export default function HomePage() {

    const {top,Upcoming,Recommend} = useLoaderData() as AnimeLoaderResult;
    console.log("topA nime", top);
    console.log("animeSeasonUpcoming", Upcoming);
    console.log("animeRecommend", Recommend);

    const renderTop = top.map((top) => {
        return <AnimeTopItem top={top} key={top.title}/>
    })

    const renderUpcoming = Upcoming.map((Upcoming => {
        return <AnimeSeasonUpcoming upcoming={Upcoming} key={Upcoming.title} />
    }))
  
    return (
        <>
        <div className="bg-[#282828]">
 
            {renderTop}

            {renderUpcoming}
        </div>
        <div></div>
        </>
    )
}