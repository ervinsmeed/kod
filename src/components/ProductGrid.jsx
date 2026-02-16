import { useTranslation } from "react-i18next";
import { ProductCard } from "./ProductCard";
import { SkeletonList } from "./SkeletonList";
import { EmptyState } from "./EmptyState";

export const ProductGrid = ({ products, loading }) => {
  const { t } = useTranslation();

  if (loading) {
    return <SkeletonList />;
  }

  if (products.length === 0) {
    return <EmptyState message={t("empty.noProducts")} icon="📦" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.uid || product.id} product={product} />
      ))}
    </div>
  );
};
