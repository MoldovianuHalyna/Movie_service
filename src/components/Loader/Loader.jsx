import { PacmanLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[999] grid place-items-center bg-midnight/80 backdrop-blur">
      <div className="glass-panel flex flex-col items-center justify-center gap-4 rounded-3xl px-10 py-8 text-aurora-50">
        <PacmanLoader color="#8c5bff" size={28} speedMultiplier={1.2} />
        <p className="text-sm uppercase tracking-[0.45em] text-aurora-200">
          Loading
        </p>
      </div>
    </div>
  );
};

export default Loader;
