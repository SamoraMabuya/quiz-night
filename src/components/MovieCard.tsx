import { Movie } from "../types/movies";
import { OptimizedImage } from "./ui/OptimizedImages";
import { Link } from "react-router-dom";

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      key={movie.id}
      to={`/movies/${movie.id}`}
      className="block transition-transform hover:scale-105"
    >
      <div className="card h-full">
        <OptimizedImage
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{movie.overview}</p>
        <div className="mt-4 text-sm text-gray-500">
          {new Date(movie.release_date).getFullYear()}
        </div>
      </div>
    </Link>
  );
}
