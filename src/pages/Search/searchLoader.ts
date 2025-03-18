import { searchResult } from "../../api/queries/searchResult";
import type {
  ResultData,
  AnimeResult,
  pagination,
} from "../../api/types/AnimeResult";

export interface SearchLoaderResult {
  searchResult: ResultData[];
  pagination: pagination; // เพิ่มการส่ง pagination กลับไป
  searchTerm: string;
}

export async function searchLoader({
  request: { url },
}: {
  request: Request;
}): Promise<SearchLoaderResult> {
  // console.log("request.url:", url);
  const urlObj = new URL(url);
  console.log(urlObj)
  const {searchParams} = urlObj
  // term=naruto&page=2
  const term = searchParams.get("term");
  const page = searchParams.get("page") ? parseInt(searchParams.get('page')!) : 1  ;

  // console.log("term & page: ", { term, page });

  if (!term) {
    throw new Error("Search term must be provided");
  }

  // ถ้าไม่มี page ส่งค่าเริ่มต้นเป็น 1
  // const pageNumber = page ? parseInt(page) : 1;

  const result: AnimeResult = await searchResult(term, page); // เปลี่ยนจากการส่งแค่ data เป็นการส่งทั้ง data และ pagination
  console.log(result);

  return {
    searchResult: result.data, // ส่งแค่ data ไปให้ searchResult
    pagination: result.pagination, // เพิ่มการส่ง pagination ไปด้วย
    searchTerm: term,
  };
}
