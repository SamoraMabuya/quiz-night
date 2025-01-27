import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { fetchMovieDetails } from "../services/api/movies";
import Loading from "./ui/Loading";
import { Movie } from "../types/movies";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovie() {
      if (!id) return;

      try {
        setIsLoading(true);
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch movie details"
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="card w-full max-w-4xl">
      <Link
        to="/movies"
        className="btn-secondary inline-flex items-center mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Movies
      </Link>

      {movie && (
        <div>
          <div className="flex flex-col md:flex-row gap-8">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full md:w-64 rounded-lg"
            />
            <div>
              <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>
              <p className="text-gray-600 mb-4">{movie.overview}</p>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Release Date:</span>{" "}
                  {new Date(movie.release_date).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-semibold">Rating:</span>{" "}
                  {movie.vote_average.toFixed(1)}/10
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
