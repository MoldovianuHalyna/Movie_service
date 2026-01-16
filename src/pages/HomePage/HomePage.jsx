import { useEffect, useState } from "react";
import { filmsFetcher } from "../../fetcherApi";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await filmsFetcher();
        setMovies(response.data.results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    getMovies();
  }, []);

  return (
    <section className="flex flex-col gap-16">
      <div className="animate-fade-in text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.7em] text-aurora-500 dark:text-aurora-200">
          Featured spotlight
        </p>
        <h1 className="mt-6 text-3xl font-display font-semibold uppercase tracking-[0.35em] text-midnight dark:text-aurora-50 sm:text-4xl">
          Trending today
        </h1>
        <p className="mt-4 text-base text-midnight/70 dark:text-aurora-200/70">
          Explore the cinematic universes capturing imaginations right now.
        </p>
      </div>
      <MovieList movies={movies} />
    </section>
  );
};

export default HomePage;
