const Container = ({ children }) => {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-28 lg:px-12">
      {children}
    </div>
  );
};

export default Container;
