import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SlidersHorizontal, X } from "lucide-react";
import * as productsAPI from "../api/products";
import { ProductGrid } from "../components/ProductGrid";
import { SearchBar } from "../components/SearchBar";
import { Pagination } from "../components/Pagination";
import { RatingStars } from "../components/RatingStars";

export const Catalog = () => {
  const { t, i18n } = useTranslation();
  const [params] = useSearchParams();
  const lang = i18n.language;

  // State
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    cat: "",
    color: "",
    mats: [],
    min: "",
    max: "",
    rate: "",
    sort: "",
  });
  const [draft, setDraft] = useState(filters);

  const PER_PAGE = 12;

  // Load products
  useEffect(() => {
    productsAPI
      .getAll()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  // URL category
  useEffect(() => {
    const cat = params.get("category") || "";
    setFilters((f) => ({ ...f, cat: cat.toLowerCase().trim() }));
    setPage(1);
  }, [params]);

  // Filter logic
  useEffect(() => {
    let res = [...products];

    // Search
    if (search) {
      const q = search.toLowerCase();
      res = res.filter((p) => {
        const title = (p[`title${lang}`] || p.titleKg || "").toLowerCase();
        const desc = (
          p[`description${lang}`] ||
          p.descriptionKg ||
          ""
        ).toLowerCase();
        return title.includes(q) || desc.includes(q);
      });
    }

    // Category
    if (filters.cat) {
      res = res.filter((p) => p.category?.toLowerCase().trim() === filters.cat);
    }

    // Color
    if (filters.color) {
      res = res.filter((p) =>
        p.color?.toLowerCase().includes(filters.color.toLowerCase()),
      );
    }

    // Materials
    if (filters.mats.length) {
      res = res.filter(
        (p) =>
          p.material &&
          filters.mats.some(
            (m) => p.material.toLowerCase() === m.toLowerCase(),
          ),
      );
    }

    // Price
    if (filters.min !== "")
      res = res.filter((p) => p.price >= Number(filters.min));
    if (filters.max !== "")
      res = res.filter((p) => p.price <= Number(filters.max));

    // Rating
    if (filters.rate)
      res = res.filter((p) => (p.ratingAvg || 0) >= Number(filters.rate));

    // Sort
    if (filters.sort === "asc")
      res.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (filters.sort === "desc")
      res.sort((a, b) => (b.price || 0) - (a.price || 0));
    if (filters.sort === "rating")
      res.sort((a, b) => (b.ratingAvg || 0) - (a.ratingAvg || 0));
    if (filters.sort === "name") {
      res.sort((a, b) => {
        const ta = (a[`title${lang}`] || a.titleKg || "").toLowerCase();
        const tb = (b[`title${lang}`] || b.titleKg || "").toLowerCase();
        return ta.localeCompare(tb);
      });
    }

    setFiltered(res);
  }, [products, filters, search, lang]);

  // Helpers
  const getUniq = (field) =>
    [...new Set(products.map((p) => p[field]).filter(Boolean))].sort();

  const colors = getUniq("color");
  const materials = getUniq("material");

  const prices = products.map((p) => Number(p.price)).filter(Boolean);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 1000;

  const activeCount = [
    filters.cat,
    filters.color,
    ...filters.mats,
    filters.min || filters.max ? "price" : null,
    filters.rate,
    filters.sort,
  ].filter(Boolean).length;

  // Pagination
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Filter Modal
  const FilterModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => setShowFilters(false)}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-800">
          <h2 className="text-2xl font-semibold">{t("filters.title")}</h2>
          <button
            onClick={() => setShowFilters(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {t("filter.category")}
            </label>
            <select
              value={draft.cat}
              onChange={(e) => setDraft({ ...draft, cat: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            >
              <option value="">{t("filters.all")}</option>
              {[
                ...new Set(products.map((p) => p.category).filter(Boolean)),
              ].map((cat) => (
                <option key={cat} value={cat.toLowerCase().trim()}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {t("filter.color")}
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setDraft({ ...draft, color: "" })}
                className={`px-4 py-2 rounded-xl border text-sm transition ${
                  !draft.color
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border-gray-200 dark:border-gray-700 hover:border-blue-500"
                }`}
              >
                {t("filters.all")}
              </button>
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() =>
                    setDraft({
                      ...draft,
                      color: draft.color === color ? "" : color,
                    })
                  }
                  className={`px-4 py-2 rounded-xl border text-sm transition ${
                    draft.color === color
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-500"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Material */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {t("filter.material")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {materials.map((mat) => (
                <label
                  key={mat}
                  className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${
                    draft.mats.includes(mat)
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-500"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={draft.mats.includes(mat)}
                    onChange={(e) => {
                      setDraft({
                        ...draft,
                        mats: e.target.checked
                          ? [...draft.mats, mat]
                          : draft.mats.filter((m) => m !== mat),
                      });
                    }}
                    className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm">{mat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {t("filter.priceRange")}
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder={`Min $${minPrice}`}
                  value={draft.min}
                  onChange={(e) => setDraft({ ...draft, min: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder={`Max $${maxPrice}`}
                  value={draft.max}
                  onChange={(e) => setDraft({ ...draft, max: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {t("filter.minRating")}
            </label>
            <div className="flex gap-2">
              {[4.5, 4, 3.5, 3].map((r) => (
                <button
                  key={r}
                  onClick={() =>
                    setDraft({ ...draft, rate: draft.rate === r ? "" : r })
                  }
                  className={`flex-1 px-4 py-2 rounded-xl border text-sm transition ${
                    draft.rate === r
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-500"
                  }`}
                >
                  <RatingStars rating={r} size="sm" />+
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {t("filter.sort")}
            </label>
            <select
              value={draft.sort}
              onChange={(e) => setDraft({ ...draft, sort: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            >
              <option value="">{t("filters.default")}</option>
              <option value="asc">{t("filter.sortPriceAsc")}</option>
              <option value="desc">{t("filter.sortPriceDesc")}</option>
              <option value="rating">{t("filter.sortRatingDesc")}</option>
              <option value="name">{t("filter.sortNameAsc")}</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t dark:border-gray-800">
          <button
            onClick={() =>
              setDraft({
                cat: "",
                color: "",
                mats: [],
                min: "",
                max: "",
                rate: "",
                sort: "",
              })
            }
            className="flex-1 px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            {t("filters.reset")}
          </button>
          <button
            onClick={() => {
              setFilters(draft);
              setPage(1);
              setShowFilters(false);
            }}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition shadow-lg shadow-blue-500/25"
          >
            {t("filters.apply")}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              {t("nav.catalog")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t("catalog.discover")}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <SearchBar onSearch={setSearch} />
            </div>
            <button
              onClick={() => {
                setDraft(filters);
                setShowFilters(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition shadow-lg shadow-blue-500/25"
            >
              <SlidersHorizontal size={18} />
              <span className="hidden sm:inline">{t("filters.title")}</span>
              {activeCount > 0 && (
                <span className="w-5 h-5 bg-white text-blue-500 rounded-full text-xs font-bold flex items-center justify-center">
                  {activeCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        {!loading && (
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
              {filtered.length === 0
                ? t("filters.noResults")
                : `${t("filters.found")} ${filtered.length} ${t("filters.products")}`}
            </span>
          </div>
        )}

        {/* Products */}
        <ProductGrid products={paginated} loading={loading} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      {/* Filter Modal */}
      {showFilters && <FilterModal />}
    </div>
  );
};
