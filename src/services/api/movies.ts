import { Movie, MovieResponse } from "../../types/movies";
import { cachedFetch } from "./cacheFetch";

// API endpoints with authentication
const MOVIES_POPULAR_ENDPOINT = `https://api.themoviedb.org/3/movie/popular?api_key=f93de02e1cd940525d69a87c9e4f6308`;
const MOVIES_SEARCH_ENDPOINT = `https://api.themoviedb.org/3/search/movie?api_key=f93de02e1cd940525d69a87c9e4f6308`;
const MOVIE_DETAILS_ENDPOINT = `https://api.themoviedb.org/3/movie`;

// Fetch movies list - can be either popular movies or search results
export async function fetchMovies(query?: string): Promise<MovieResponse> {
  // If query exists, use search endpoint, otherwise use popular movies
  const endpoint = query
    ? `${MOVIES_SEARCH_ENDPOINT}&query=${encodeURIComponent(query)}`
    : MOVIES_POPULAR_ENDPOINT;

  return cachedFetch(endpoint);
}

// Fetch detailed information for a specific movie
export async function fetchMovieDetails(
  id: string | undefined
): Promise<Movie> {
  if (!id) {
    throw new Error("Movie ID is required");
  }

  return cachedFetch(
    `${MOVIE_DETAILS_ENDPOINT}/${id}?api_key=f93de02e1cd940525d69a87c9e4f6308`
  );
}
