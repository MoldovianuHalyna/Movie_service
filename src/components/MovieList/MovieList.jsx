import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-3">
      {movies?.map((movie) => {
        const releaseYear = movie?.release_date
          ? new Date(movie.release_date).getFullYear()
          : "Unknown";
        const posterSrc = movie?.poster_path
          ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          : "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";
        return (
          <li
            key={movie.id}
            className="group relative overflow-hidden rounded-lg border border-white/15 bg-white/50 p-4 shadow-soft backdrop-blur-xl transition-transform duration-500 hover:-translate-y-2 dark:border-aurora-100/15 dark:bg-midnight/70"
          >
            <Link
              className="flex h-full flex-col gap-6"
              to={`/movies/${movie.id}`}
              state={{ from: location }}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  className="h-80 w-full rounded-lg object-cover shadow-lg transition-transform duration-700 group-hover:scale-105"
                  src={posterSrc}
                  alt={movie.title}
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/10 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-80" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-aurora-500 dark:text-rose-300">
                  {releaseYear}
                </p>
                <p className="text-2xl font-display font-semibold text-midnight transition-colors duration-500 group-hover:text-nebula-600 dark:text-aurora-50 dark:group-hover:text-rose-400">
                  {movie.title}
                </p>
                <p className="overflow-hidden text-sm text-midnight/70 [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] dark:text-aurora-200/70">
                  {movie.overview ||
                    "Dive into the details to explore this universe."}
                </p>
              </div>
            </Link>
            <span className="pointer-events-none absolute inset-0 -z-10 animate-glow-pulse rounded-3xl bg-gradient-to-br from-nebula-600/20 via-aurora-400/10 to-rose-500/20 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
