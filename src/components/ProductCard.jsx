import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RatingStars } from "./RatingStars";
import { FavoriteButton } from "./FavoriteButton";
import { AddToCartButton } from "./AddToCartButton";

export const ProductCard = ({ product }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const title =
    product[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`] ||
    product.titleKg;
  const price = product.price || 0;

  const productHref = `/product/${product.id}`;

  return (
    <div className="group bg-transparent rounded-3xl shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 overflow-hidden animate-fadeIn">
      <Link to={productHref} className="block">
        <div className="h-56 sm:h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden relative rounded-t-3xl">
          {product.cover ? (
            <img
              src={product.cover}
              alt={title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
              {t("product.noImage") || "No Image"}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>
      <div className="p-6 rounded-b-3xl bg-white/90 dark:bg-[#0f172a]">
        <Link to={productHref}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-vibrant-orange transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
        </Link>
        <div className="flex items-center justify-between mb-4">
          <RatingStars rating={product.ratingAvg || 0} size="sm" />
          <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
            ${price.toFixed(2)}
          </span>
        </div>
        <div
          className="flex items-center gap-3 mt-4"
          onClick={(e) => e.stopPropagation()}
        >
          <AddToCartButton product={product} />
          <FavoriteButton productId={product.id} />
        </div>
      </div>
    </div>
  );
};
