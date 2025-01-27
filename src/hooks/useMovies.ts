import { useState, useEffect } from "react";
import { fetchMovies } from "../services/api/movies";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export function useMovies(query?: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchMovies(query);
        setMovies(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch movies");
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();
  }, [query]);

  return { movies, isLoading, error };
}
