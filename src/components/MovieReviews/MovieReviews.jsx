import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { reviewsFetcher } from "../../fetcherApi";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const feedBacks = await reviewsFetcher(movieId);
        setReviews(feedBacks.data.results);
      } catch (error) {
        console.error("Failed to fetch cast:", error);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (reviews.length === 0)
    return (
      <div className="glass-panel mt-12 rounded-lg px-10 py-14 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.45em] text-aurora-500 dark:text-aurora-200">
          No reviews yet
        </p>
        <p className="mt-5 text-base text-midnight/70 dark:text-aurora-200/70">
          Be the first to share thoughts about this universe.
        </p>
      </div>
    );

  return (
    <ul className="grid gap-6">
      {reviews.map((review) => {
        return (
          <li
            key={review.id}
            className="group relative overflow-hidden rounded-lg border border-white/15 bg-white/60 p-8 shadow-soft backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1.5 dark:border-aurora-100/15 dark:bg-midnight/70"
          >
            <p className="text-xl font-display font-semibold text-midnight dark:text-aurora-50">
              {review.author}
            </p>
            <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-midnight/70 dark:text-aurora-200/70">
              {review.content}
            </p>
            <span className="pointer-events-none absolute inset-0 -z-10 animate-glow-pulse rounded-3xl bg-gradient-to-br from-nebula-600/15 via-aurora-400/10 to-rose-500/15 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          </li>
        );
      })}
    </ul>
  );
};

export default MovieReviews;
