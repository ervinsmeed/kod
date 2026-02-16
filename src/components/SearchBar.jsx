import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const SearchBar = ({ onSearch, className = "" }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-2xl mx-auto ${className}`}
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search.placeholder")}
          className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-12 sm:pl-14 pr-24 sm:pr-32 rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-vibrant-orange dark:focus:border-neon-lime focus:ring-4 focus:ring-energy-blue/20 transition-all duration-300 shadow-lg hover:shadow-xl"
        />
        <span className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 text-2xl">
          🔍
        </span>
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              onSearch("");
            }}
            className="absolute right-20 sm:right-24 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl transition-all"
            title={t("search.clear")}
          >
            ✕
          </button>
        )}
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 sm:px-6 py-2 bg-gradient-to-r from-energy-blue to-vibrant-orange text-white rounded-xl font-semibold text-sm sm:text-base hover:from-vibrant-orange hover:to-energy-blue transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
        >
          {t("search.button")}
        </button>
      </div>
    </form>
  );
};
