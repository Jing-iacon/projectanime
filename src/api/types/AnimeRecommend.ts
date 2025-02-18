export interface AnimeRecommend {
  data: {
    mal_id: number;
    entry: {
      mal_id: string;
      url: string;
      images: {
        jpg: {
          image_url: string;
          small_image_url: string;
          large_image_url: string;
        };
        webp: {
          image_url: string;
          small_image_url: string;
          large_image_url: string;
        };
      };
      title: string;
    }[];
    content: string;
    user: {
      url: string;
      username: string;
    };
  }[];
}
