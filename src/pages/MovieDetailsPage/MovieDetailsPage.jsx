import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { oneFilmFetcher } from "../../fetcherApi";
import Loader from "../../components/Loader/Loader";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [film, setFilm] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const goBackLink = useRef(location.state?.from || "/movies");

  const addActive = ({ isActive }) =>
    `relative rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-[0.35em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-nebula-500 ${
      isActive
        ? "text-nebula-600 shadow-neon dark:text-rose-400 dark:shadow-neon"
        : "text-midnight hover:text-nebula-600 dark:text-aurora-100 dark:hover:text-rose-400"
    }`;

  useEffect(() => {
    const getMovie = async () => {
      try {
        const movie = await oneFilmFetcher(movieId);
        setFilm(movie.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };
    getMovie();
  }, [movieId]);

  if (loading) return <Loader />;
  const hasFilmData = film && Object.keys(film).length > 0;

  if (!hasFilmData) {
    return (
      <div className="glass-panel mt-12 rounded-3xl px-10 py-14 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.45em] text-aurora-500 dark:text-aurora-200">
          Movie not found
        </p>
        <p className="mt-5 text-base text-midnight/70 dark:text-aurora-200/70">
          We couldn’t retrieve details for this selection.
        </p>
      </div>
    );
  }
  const releaseYear = film.release_date
    ? new Date(film.release_date).getFullYear()
    : "N/A";
  const userScore = Number.isFinite(film.vote_average)
    ? Math.ceil(film.vote_average)
    : "?";
  const posterSrc = film.poster_path
    ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
    : "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";
  return (
    <section className="flex flex-col gap-16">
      <div className="flex items-center justify-between">
        <Link
          className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.45em] text-midnight shadow-soft backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:text-nebula-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nebula-500 dark:border-aurora-100/20 dark:bg-midnight/60 dark:text-aurora-100"
          to={goBackLink.current}
        >
          ← Go back
        </Link>
      </div>

      <div className="grid gap-12 lg:grid-cols-[360px_1fr]">
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/60 shadow-soft backdrop-blur-xl dark:border-aurora-100/15 dark:bg-midnight/70">
          <img
            className="h-full w-full object-cover"
            src={posterSrc}
            alt={film.title}
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />
          <span className="pointer-events-none absolute inset-0 -z-10 animate-glow-pulse rounded-3xl bg-gradient-to-br from-nebula-600/20 via-aurora-400/10 to-rose-500/20" />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.6em] text-aurora-500 dark:text-aurora-200">
              Feature dossier
            </p>
            <h1 className="text-4xl font-display font-semibold text-midnight dark:text-aurora-50">
              {film.title}{" "}
              <span className="text-lg text-midnight/60 dark:text-aurora-200/60">
                ({releaseYear || "N/A"})
              </span>
            </h1>
            <p className="text-base text-midnight/70 dark:text-aurora-200/70">
              {film.tagline ||
                "Immerse yourself in this universe's signature saga."}
            </p>
          </div>

          <div className="grid gap-4 rounded-3xl border border-white/15 bg-white/60 p-6 shadow-soft backdrop-blur-xl dark:border-aurora-100/15 dark:bg-midnight/70">
            <p className="text-sm uppercase tracking-[0.4em] text-aurora-500 dark:text-aurora-200">
              Rating
            </p>
            <p className="text-3xl font-display font-semibold text-nebula-600 dark:text-rose-400">
              {userScore} / 10
            </p>
            <p className="text-base text-midnight/70 dark:text-aurora-200/70">
              <strong className="font-semibold">Overview:</strong>{" "}
              {film.overview}
            </p>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.35em] text-midnight/60 dark:text-aurora-200/60">
              {film.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-aurora-500/10 px-3 py-1 text-aurora-600 dark:bg-rose-400/10 dark:text-rose-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <nav className="flex flex-wrap items-center gap-4 rounded-full border border-white/20 bg-white/50 px-6 py-3 shadow-soft backdrop-blur-xl dark:border-aurora-100/20 dark:bg-midnight/60">
        <NavLink className={addActive} to="cast">
          Cast
        </NavLink>
        <NavLink className={addActive} to="reviews">
          Reviews
        </NavLink>
      </nav>

      <div className="animate-slide-up">
        <Outlet />
      </div>
    </section>
  );
};

export default MovieDetailsPage;
