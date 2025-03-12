import type { DetailsLoaderResult } from "./detailsLoader"
import { useLoaderData } from "react-router-dom"
import AnimeDetailsItem from "../../component/AnimeDetailsItem";

export default function DetailsPage() {
    const {details} = useLoaderData() as DetailsLoaderResult;
    console.log(details);

    return (
        <div className="body min-h-screen w-full bg-black bg-opacity-50">
            <AnimeDetailsItem details={details} key={details?.mal_id}/>
        </div>
    )
}