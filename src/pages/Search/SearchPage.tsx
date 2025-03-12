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

  const fetchDataForCurrentPage = async () => {
    try {
      setLoading(true);
      const response = await searchResult(searchTerm, currentPage);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch anime data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataForCurrentPage();
  }, [currentPage, searchTerm]);

  // Navigation handlers
  const handlePagination = (direction: 'prev' | 'next') => {
    if (direction === 'next' && currentPage < totalPages && data.length > 0) {
      setCurrentPage(prev => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const SearchResults = () => (
    <div className="now-body w-full box-border flex flex-col">
      <div className="nowbody-container px-4">
        <h2 className="text-white text-3xl ml-4 font-bold mb-4 mt-8">
          Search Results for "{searchTerm}"
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mx-auto max-w-[1920px] min-h-[400px] mt-8">
          {loading ? (
            <div className="flex items-center justify-center w-full h-[400px]">
              <p className="text-white text-xl">Loading...</p>
            </div>
          ) : (
            data.map((result) => (
              <AnimeListItem result={result} key={result.mal_id} />
            ))
          )}
        </div>
      </div>
    </div>
  );

  const PaginationControls = () => (
    <div className="flex items-center justify-center gap-4 bg-black bg-opacity-50 p-6">
      <button
        onClick={() => handlePagination('prev')}
        disabled={currentPage === 1 || loading}
        className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 
          hover:bg-gray-600 transition-all hover:scale-105"
      >
        Previous
      </button>

      <span className="text-white font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => handlePagination('next')}
        disabled={currentPage === totalPages || loading}
        className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 
          hover:bg-gray-600 transition-all hover:scale-105"
      >
        Next
      </button>
    </div>
  );

  return (
    <div className="bg-black bg-opacity-50 min-h-screen">
      <div className="space-y-6">
        <SearchResults />
        <PaginationControls />
      </div>
    </div>
  );
}
