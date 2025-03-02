export interface AnimeResult {
 data: ResultData[];
 pagination: pagination
}

interface Genre {
  name: string;
}

export interface pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;  // เพิ่ม current_page เข้าไป
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface ResultData {
  mal_id: number;
  url: string;
  images: {
    jpg?: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp?: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  title: string;
  title_english?: string;
  title_synonyms?: string[];
  type?: string;
  status?: string;
  aired?: {
    from?: string;
    to?: string;
  };
  duration?: string;
  synopsis?: string;
  genres?: Genre[];
}