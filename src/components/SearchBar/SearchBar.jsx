import { Field, Form, Formik } from "formik";
import { BsSearchHeart } from "react-icons/bs";

const SearchBar = ({ onSubmit }) => {
  const initialValues = {
    query: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      <Form className="group relative mx-auto mt-24 flex w-full max-w-2xl items-center overflow-hidden rounded-full border border-white/30 bg-white/70 px-4 py-3 text-base shadow-soft backdrop-blur-2xl transition-all duration-500 hover:shadow-neon focus-within:ring-2 focus-within:ring-nebula-500 dark:border-aurora-100/20 dark:bg-midnight/70">
        <Field
          className="flex-1 bg-transparent text-base font-medium text-mist placeholder:text-mist/60 outline-none transition-colors duration-300 dark:text-aurora-100 dark:placeholder:text-aurora-200/60"
          type="text"
          name="query"
          placeholder="Search for cinematic universes..."
          autoComplete="off"
        />
        <button
          className="relative grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-nebula-600 via-aurora-500 to-rose-500 text-white transition-all duration-500 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500 dark:shadow-neon"
          type="submit"
          aria-label="Search movies"
        >
          <BsSearchHeart className="text-xl" />
        </button>
        <span className="pointer-events-none absolute inset-y-0 left-0 w-24 -translate-x-10 rounded-full bg-aurora-400/20 blur-3xl transition-all duration-700 group-hover:translate-x-0" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-aurora-100/10 to-transparent opacity-0 transition-opacity duration-700 group-focus-within:opacity-100" />
      </Form>
    </Formik>
  );
};

export default SearchBar;
