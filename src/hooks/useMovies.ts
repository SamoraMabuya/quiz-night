import { useState, useEffect } from "react";
import { fetchMovies } from "../services/api/movies";
import { Movie } from "../types/movies";

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
