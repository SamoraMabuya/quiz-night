import { Movie } from "../types/movies";
import { OptimizedImage } from "./ui/OptimizedImages";
import { Link } from "react-router-dom";

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link to={`/movies/${movie.id}`} className="group movie-card">
      <OptimizedImage
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full aspect-[2/3] object-cover"
      />
      <div className="movie-card-overlay">
        <div className="absolute bottom-0 p-4 w-full">
          <h3 className="text-lg font-semibold text-white mb-2">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-300 line-clamp-2">{movie.overview}</p>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span>•</span>
            <span>{movie.vote_average.toFixed(1)} ★</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
