import { useEffect, useMemo, useState } from "react";
import { PiMoonStarsBold, PiSunHorizonBold } from "react-icons/pi";

const resolveInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  const storedTheme = window.localStorage.getItem("theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

const ThemeToggle = ({ className = "" }) => {
  const [theme, setTheme] = useState(resolveInitialTheme);
  const [userSelected, setUserSelected] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("theme") !== null;
  });

  const isDark = useMemo(() => theme === "dark", [theme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const { body } = document;
    body.classList.toggle("dark", isDark);
    if (userSelected) {
      window.localStorage.setItem("theme", theme);
    } else {
      window.localStorage.removeItem("theme");
    }
  }, [isDark, theme, userSelected]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = (event) => {
      if (!userSelected) {
        setTheme(event.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", updateTheme);
    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, [userSelected]);

  const handleToggle = () => {
    setUserSelected(true);
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      type="button"
      aria-label={`Activate ${isDark ? "light" : "dark"} mode`}
      onClick={handleToggle}
      className={`relative inline-flex h-11 w-20 items-center overflow-hidden rounded-full border border-white/30 bg-white/40 p-1 text-white shadow-neon transition-all duration-500 ease-out hover:shadow-neon-rose focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500 dark:border-aurora-100/20 dark:bg-midnight/60 ${className}`}
    >
      <span
        className={`relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-nebula-600 via-aurora-500 to-rose-500 text-xl transition-all duration-500 ${
          isDark ? "translate-x-9" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <PiMoonStarsBold className="text-aurora-50" />
        ) : (
          <PiSunHorizonBold className="text-aurora-50" />
        )}
      </span>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-aurora-500/20 via-nebula-500/10 to-rose-500/20 opacity-0 transition-opacity duration-500 hover:opacity-100" />
    </button>
  );
};

export default ThemeToggle;
