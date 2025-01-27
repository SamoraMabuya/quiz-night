export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  backdrop_path: string | null;
  original_language: string;
  original_title: string;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  video: boolean;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieError {
  status_message: string;
  status_code: number;
}
