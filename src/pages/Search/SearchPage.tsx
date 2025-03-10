import { useLoaderData } from "react-router-dom";
import type { SearchLoaderResult } from "./searchLoader";
import AnimeListItem from "../../component/AnimeListItem";
import { useState, useEffect } from "react";
import { searchResult } from "../../api/queries/searchResult";

export default function SearchPage() {
  const { searchResult: initialData, pagination, searchTerm } = useLoaderData() as SearchLoaderResult;
  const [currentPage, setCurrentPage] = useState(pagination.current_page);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const totalPages = pagination.last_visible_page;

  const goToNextPage = () => {
    if (currentPage < totalPages && data.length > 0) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const fetchDataForCurrentPage = async () => {
    setLoading(true);
    const response = await searchResult(searchTerm, currentPage);
    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataForCurrentPage();
  }, [currentPage, searchTerm]);

  return (
    
    <div className="container mx-auto max-w-full overflow-hidden flex flex-col bg-black bg-opacity-50 shadow-md px-2 md:px-4 lg:px-12 py-6">
      <h1 className="text-white text-3xl font-bold text-start mb-6">Anime for {searchTerm}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-4">
        {loading ? <p className="text-white text-center col-span-full">Loading...</p> : data.map((result) => <AnimeListItem result={result} key={result.mal_id} />)}
      </div>
      <div className="flex justify-center items-center gap-4 bg-black bg-opacity-50 shadow-md p-4 mt-6 rounded-lg">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1 || loading}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 hover:bg-gray-600 transition-transform transform hover:scale-105"
        >
          Prev
        </button>
        <span className="text-white text-lg">Page {currentPage} of {totalPages}</span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages || loading || data.length === 0}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 hover:bg-gray-600 transition-transform transform hover:scale-105"
        >
          Next
        </button>
      </div>
    </div>
  );
}
