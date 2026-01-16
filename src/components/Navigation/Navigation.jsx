import { NavLink } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navigation = () => {
  const getLinkClasses = ({ isActive }) => {
    const base =
      "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-midnight transition-all duration-300 hover:text-nebula-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-nebula-500 dark:text-aurora-100 dark:hover:text-rose-400";
    const active =
      "text-nebula-600 shadow-neon dark:text-rose-400 dark:shadow-neon";
    return `${base} ${isActive ? active : ""}`;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/50 backdrop-blur-xl transition-colors duration-500 ease-out dark:bg-midnight/70">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 lg:px-12">
        <span className="text-xs font-semibold uppercase tracking-[0.6em] text-aurora-600 dark:text-aurora-200">
          Cinematic Universe
        </span>
        <ul className="flex items-center gap-6 rounded-full bg-white/40 px-4 py-2 shadow-soft backdrop-blur-xl dark:bg-midnight/60">
          <li>
            <NavLink className={getLinkClasses} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={getLinkClasses} to="/movies">
              Movies
            </NavLink>
          </li>
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Navigation;
