import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./App.jsx", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        sans: ["'Inter Tight'", "system-ui", "sans-serif"],
      },
      colors: {
        "aurora-50": "#f0f7ff",
        "aurora-100": "#dcecfe",
        "aurora-200": "#b7dbfd",
        "aurora-300": "#82c1fb",
        "aurora-400": "#4ca4f5",
        "aurora-500": "#1a89eb",
        "aurora-600": "#0f6dcb",
        "aurora-700": "#1155a1",
        "aurora-800": "#144681",
        "aurora-900": "#133d6b",
        "nebula-500": "#8c5bff",
        "nebula-600": "#6f41f2",
        "nebula-700": "#5530c9",
        "rose-500": "#ff6fa8",
        midnight: "#050b1a",
        "midnight-2": "#071025",
        mist: "#0f172a",
        glow: "#1b2a4b",
      },
      backgroundImage: {
        "aurora-gradient":
          "radial-gradient(circle at 20% 20%, rgba(140,91,255,0.3), transparent 60%), radial-gradient(circle at 80% 0%, rgba(76,164,245,0.4), transparent 55%), linear-gradient(145deg, rgba(5,11,26,0.98) 0%, rgba(7,16,37,0.92) 40%, rgba(20,38,79,0.95) 100%)",
        "aurora-gradient-light":
          "radial-gradient(circle at 10% 20%, rgba(76,164,245,0.35), transparent 55%), radial-gradient(circle at 90% 10%, rgba(255,111,168,0.25), transparent 50%), linear-gradient(135deg, #f8fbff 0%, #eef3ff 45%, #e3e6ff 100%)",
      },
      boxShadow: {
        neon: "0 10px 45px rgba(76, 164, 245, 0.35)",
        "neon-rose": "0 10px 45px rgba(255, 111, 168, 0.35)",
        soft: "0 20px 60px rgba(7, 16, 37, 0.35)",
      },
      animation: {
        "fade-in": "fadeIn 0.9s ease forwards",
        "slide-up": "slideUp 0.8s ease forwards",
        "glow-pulse": "glowPulse 5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 30px rgba(140, 91, 255, 0.45)" },
          "50%": { boxShadow: "0 0 55px rgba(76, 164, 245, 0.55)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(-6px)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
