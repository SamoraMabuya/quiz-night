import { useState } from "react";
import { Link } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";
import Loading from "../components/ui/Loading";
import SearchBar from "../components/ui/SearchBar";

export default function Movies() {
  const [searchQuery, setSearchQuery] = useState("");
  const { movies, isLoading, error } = useMovies(searchQuery);

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
    <div className="w-full max-w-6xl px-4 lg:px-6">
      <div className="card mb-6">
        <SearchBar
          initialValue={searchQuery}
          onSearch={handleSearch}
          placeholder="Search movies..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movies/${movie.id}`}
            className="block transition-transform hover:scale-105"
          >
            <div className="card h-full">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
              <p className="text-gray-600 text-sm">
                {movie.overview.slice(0, 100)}...
              </p>
              <div className="mt-4 text-sm text-gray-500">
                {new Date(movie.release_date).getFullYear()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
