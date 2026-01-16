import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { searchFilmFetcher } from "../../fetcherApi";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const MoviesPage = () => {
  const [searchedFilm, setSearchedFilm] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchFilms = async () => {
      try {
        setLoading(true);
        const results = await searchFilmFetcher(query);
        setSearchedFilm(results.data.results);
      } catch (error) {
        console.log("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, [query]);
  const handleSearchBarSubmit = ({ query }) => {
    if (!query) return;
    setSearchParams({ query });
  };

  return (
    <section className="flex flex-col gap-16">
      {loading && <Loader />}

      <div className="flex flex-col items-center gap-5 text-center">
        <h1 className="mt-10 text-3xl font-display font-semibold uppercase tracking-[0.35em] text-midnight dark:text-aurora-50">
          Discover new worlds
        </h1>
        <p className="max-w-2xl text-base text-midnight/70 dark:text-aurora-200/70">
          Search across cinematic universes to find hidden gems, iconic sagas,
          and upcoming releases.
        </p>
      </div>

      <SearchBar onSubmit={handleSearchBarSubmit} />

      {!loading && query && searchedFilm.length === 0 ? (
        <div className="animate-fade-in">
          <NotFoundPage />
        </div>
      ) : (
        <div className="animate-slide-up">
          <MovieList movies={searchedFilm} />
        </div>
      )}
    </section>
  );
};

export default MoviesPage;
