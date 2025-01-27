import { Movie, MovieResponse } from "../../types/movies";

const MOVIES_POPULAR_ENDPOINT =
  "https://api.themoviedb.org/3/movie/popular?api_key=f93de02e1cd940525d69a87c9e4f6308";
const MOVIES_SEARCH_ENDPOINT =
  "https://api.themoviedb.org/3/search/movie?api_key=f93de02e1cd940525d69a87c9e4f6308";
const MOVIE_DETAILS_ENDPOINT = "https://api.themoviedb.org/3/movie";

export async function fetchMovies(query?: string): Promise<MovieResponse> {
  const endpoint = query
    ? `${MOVIES_SEARCH_ENDPOINT}&query=${encodeURIComponent(query)}`
    : MOVIES_POPULAR_ENDPOINT;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`HTTP status: ${response.status}`);
  }

  return response.json();
}

export async function fetchMovieDetails(
  id: string | undefined
): Promise<Movie> {
  if (!id) {
    throw new Error("Movie ID is required");
  }

  const response = await fetch(
    `${MOVIE_DETAILS_ENDPOINT}/${id}?api_key=f93de02e1cd940525d69a87c9e4f6308`
  );

  if (!response.ok) {
    throw new Error(`HTTP status: ${response.status}`);
  }

  return response.json();
}
