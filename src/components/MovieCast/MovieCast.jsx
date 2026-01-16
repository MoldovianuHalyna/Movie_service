import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { castFetcher } from "../../fetcherApi";
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCast = async () => {
      try {
        const actors = await castFetcher(movieId);
        setCast(actors.data.cast);
      } catch (error) {
        console.error("Failed to fetch cast:", error);
      } finally {
        setLoading(false);
      }
    };
    getCast();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (!cast.length) {
    return (
      <div className="glass-panel mt-12 rounded-3xl px-10 py-14 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.45em] text-aurora-500 dark:text-aurora-200">
          No stellar cast yet
        </p>
        <p className="mt-5 text-base text-midnight/70 dark:text-aurora-200/70">
          We couldn’t find cast details for this universe. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
      {cast.map((castItem) => {
        return (
          <li
            key={castItem.id}
            className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/60 p-6 shadow-soft backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1.5 dark:border-aurora-100/15 dark:bg-midnight/70"
          >
            <div className="flex items-center gap-5">
              <div className="relative h-20 w-20 overflow-hidden rounded-2xl">
                <img
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={
                    castItem.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${castItem.profile_path}`
                      : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  }
                  alt={castItem.name}
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nebula-600/30 via-transparent to-rose-500/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-display font-semibold text-midnight dark:text-aurora-50">
                  {castItem.name}
                </p>
                <p className="text-sm uppercase tracking-[0.25em] text-midnight/60 dark:text-aurora-200/60">
                  {castItem.character || "Unknown role"}
                </p>
              </div>
            </div>
            <span className="pointer-events-none absolute inset-0 -z-10 animate-glow-pulse rounded-3xl bg-gradient-to-br from-nebula-600/20 via-aurora-400/10 to-rose-500/20 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          </li>
        );
      })}
    </ul>
  );
};

export default MovieCast;
