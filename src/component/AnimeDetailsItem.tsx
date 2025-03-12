
import type { AnimeDetails } from "../api/types/AnimeDetail";
import { addAnimeFavorite } from "../pages/MyFavorite/myFavoriteLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 🔹 ต้อง import CSS ด้วย


interface AnimeDetailsItemProps {
  details: AnimeDetails;
}

export default function AnimeDetailsItem({details}: AnimeDetailsItemProps) {
    const handleAddFavorite = () => {
        addAnimeFavorite(details);
        toast.success("✅ Anime added to list!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });
    }

    return (
        <div className="bg-gradient-to-br from-zinc-950 via-black to-zinc-900 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 shadow-2xl">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Anime Poster */}
                        <div className="w-full md:w-1/3 lg:w-1/4">
                            <div className="relative group">
                                <img
                                    src={details.images?.jpg?.large_image_url}
                                    alt="Poster not available"
                                    className="w-full rounded-xl shadow-2xl transform transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"/>
                            </div>
                        </div>

                        {/* Anime Detail */}
                        <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">
                                    {details.title}
                                </h1>
                                <h2 className="text-xl text-gray-400 font-medium">
                                    {details.title_japanese}
                                </h2>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <span className="bg-green-600 px-3 py-1.5 rounded-full text-sm font-medium text-white">
                                    {details.type}
                                </span>
                                <span className="text-gray-400 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                                    </svg>
                                    {details.duration}
                                </span>
                            </div>

                            <p className="text-gray-300 leading-relaxed">
                                {details.synopsis}
                            </p>

                            <button
                                onClick={handleAddFavorite}
                                className="inline-flex items-center px-6 py-3 text-white font-semibold rounded-xl
                                bg-gradient-to-r from-red-600 to-pink-600 
                                hover:from-red-700 hover:to-pink-700
                                transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                </svg>
                                Add to Favorites
                            </button>
                        </div>
                    </div>

                    {/* Anime Info */}
                    <div className="mt-8 backdrop-blur-sm bg-white/5 rounded-xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <InfoItem label="Japanese" value={details.title_japanese} />
                                <InfoItem label="Synonyms" value={details.background} />
                                <InfoItem label="Aired" value={details.aired?.string} />
                            </div>
                            <div className="space-y-4">
                                <InfoItem label="Duration" value={details.duration} />
                                <InfoItem label="Status" value={details.status} />
                                <div>
                                    <h3 className="text-gray-400 text-sm mb-2">Genres</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {details.genres?.map((genre) => (
                                            <span 
                                                key={genre.name}
                                                className="px-3 py-1 bg-zinc-800 text-gray-200 rounded-full text-sm
                                                hover:bg-zinc-700 transition-colors duration-200"
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer className="z-[9999]" />
        </div>
    );
}

// Helper component for info items
function InfoItem({ label, value }: { label: string; value?: string }) {
    return (
        <div>
            <h3 className="text-gray-400 text-sm mb-1">{label}</h3>
            <p className="text-white">{value || 'N/A'}</p>
        </div>
    );
}
