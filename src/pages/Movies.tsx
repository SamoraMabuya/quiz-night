import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import Loading from "../components/ui/Loading";
import SearchBar from "../components/ui/SearchBar";
import { useDebounce } from "../hooks/useDebounce";
import { MovieCard } from "../components/MovieCard";

export default function Movies() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const { movies, isLoading, error } = useMovies(debouncedSearch);
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  function handleSearch(query: string) {
    setSearchQuery(query);
  }

  return (
    <div className="min-h-screen w-full">
      <div className="relative h-[50vh] mb-8">
        <div className="absolute inset-0 bg-gradient-spotlight from-dark-100 via-dark-200 to-dark-300" />
        <div className="absolute inset-0 flex items-center px-6 lg:px-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Discover Movies
            </h1>
            <SearchBar
              initialValue={searchQuery}
              onSearch={handleSearch}
              placeholder="Search movies..."
              className="w-full max-w-lg"
            />
          </div>
        </div>
      </div>
      {/* Movies Grid */}
      <div className="px-6 lg:px-12 pb-12">
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
