import { FaRegFaceSadTear } from "react-icons/fa6";

const NotFoundPage = () => {
  return (
    <div className="glass-panel mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-3xl px-10 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-aurora-500/15 text-aurora-500 dark:bg-rose-400/20 dark:text-rose-300">
        <FaRegFaceSadTear className="text-3xl" />
      </span>
      <h1 className="text-2xl font-display font-semibold uppercase tracking-[0.35em] text-midnight dark:text-aurora-50">
        Page not found
      </h1>
      <p className="max-w-xl text-base text-midnight/70 dark:text-aurora-200/70">
        Please adjust your search query or try again later to explore more
        cinematic adventures.
      </p>
    </div>
  );
};

export default NotFoundPage;
