import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import * as productsAPI from "../api/products";
import { ProductGallery } from "../components/ProductGallery";
import { RatingStars } from "../components/RatingStars";
import { AddToCartButton } from "../components/AddToCartButton";
import { FavoriteButton } from "../components/FavoriteButton";
import { ModalConfirm } from "../components/ModalConfirm";
import { ReviewsList } from "../components/ReviewsList";
import { ReviewForm } from "../components/ReviewForm";
import { SkeletonCard } from "../components/SkeletonCard";
import { ShieldCheck, Zap, Trash2 } from "lucide-react";
import axios from "axios";

export const ProductDetails = () => {
  const { id } = useParams(); // Берем ID напрямую из URL
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const lang = i18n.language;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  // Ключ для принудительного обновления списка отзывов
  const [reviewKey, setReviewKey] = useState(0);

  // Стандартный запрос данных
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await axios.get(
          `https://6985988b6964f10bf253c4da.mockapi.io/tovar/${id}`,
        );
        setProduct(data.data);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!product?.id) return;
    try {
      await productsAPI.remove(product.id);
      navigate("/catalog");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(t("common.error"));
    } finally {
      setDeleteOpen(false);
    }
  };

  const onReviewAdded = () => {
    // Просто обновляем список отзывов, не пересчитывая рейтинг вручную
    setReviewKey((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1115] p-10">
        <SkeletonCard />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0f1115] flex items-center justify-center text-white">
        {t("product.notFound")}
      </div>
    );
  }

  // Локализация полей
  const title =
    product[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`] ||
    product.titleKg ||
    product.title;

  const description =
    product[`description${lang.charAt(0).toUpperCase() + lang.slice(1)}`] ||
    product.descriptionKg ||
    product.description;

  const isBikeCategory = ["mountain", "road", "city", "electric", "kids"].includes(
    String(product.category || "").toLowerCase(),
  );

  const weightValue = product.weight || product.weightKg || product.specs?.weight;
  const handlebarValue = product.handlebar || product.specs?.handlebar;
  const brakesValue = product.brakes || product.specs?.brakes;
  const forkValue = product.fork || product.specs?.fork;

  const detailBullets = [
    product.material ? `${t("product.material")}: ${product.material}` : null,
    product.color ? `${t("product.color")}: ${product.color}` : null,
  ].filter(Boolean);

  if (isBikeCategory) {
    const weightText = weightValue ? `${weightValue}` : "13,9 кг";
    const handlebarText =
      handlebarValue || "алюминиевый, 720 мм, подъем 15 мм";
    const brakesText = brakesValue || "гидравлические";
    const forkText = forkValue || "гидравлическая";

    detailBullets.push(
      `Вес — ${weightText} (типично для алюминиевой рамы этого уровня).`,
      `Руль — ${handlebarText} (современный стандарт для XC/trail).`,
      `Гидравлика — уточнено: тормоза ${brakesText}, вилка ${forkText}.`,
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1115] pb-20">
      {/* ДЕКОРАТИВНЫЙ ФОНОВЫЙ ГРАДИЕНТ */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-amber-500/5 blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ГАЛЕРЕЯ (7 колонок) */}
          <div className="lg:col-span-7">
            <div className="sticky top-32">
              <div className="relative group">
                <div className="absolute -inset-4 bg-amber-500/5 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                <ProductGallery product={product} />
              </div>
            </div>
          </div>

          {/* ИНФО (5 колонок) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  {product.category}
                </span>
                <RatingStars rating={product.ratingAvg || 0} size="sm" />
              </div>

              <h1 className="text-3xl sm:text-5xl font-light tracking-tighter text-white uppercase italic leading-none">
                {title}
              </h1>

              <p className="text-4xl font-bold text-white tracking-tight">
                ${Number(product.price)?.toLocaleString() || "0.00"}
              </p>
            </div>

            {/* ХАРАКТЕРИСТИКИ */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                  {t("product.material")}
                </p>
                <p className="text-sm font-bold text-slate-200">
                  {product.material || "Carbon Fiber"}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                  {t("product.color")}
                </p>
                <p className="text-sm font-bold text-slate-200">
                  {product.color || "Deep Matte"}
                </p>
              </div>
            </div>

            {/* КНОПКИ ДЕЙСТВИЯ */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex-grow scale-110 origin-left">
                <AddToCartButton product={product} />
              </div>
              <div className="p-4 rounded-full bg-white/[0.03] border border-white/[0.05] hover:bg-white/10 transition-colors">
                <FavoriteButton productId={product.id} />
              </div>
              {user?.role === "admin" && (
                <button
                  onClick={() => setDeleteOpen(true)}
                  className="p-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>

            {/* ОПИСАНИЕ */}
            <div className="pt-8 border-t border-white/5 space-y-4">
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-500">
                {t("product.description")}
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm font-light">
                {description || t("product.noDescription")}
              </p>
              {detailBullets.length > 0 && (
                <ul className="space-y-2 text-sm text-slate-300">
                  {detailBullets.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-amber-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ТЕГИ ДОВЕРИЯ */}
            <div className="flex items-center justify-between py-6 px-8 rounded-3xl bg-gradient-to-r from-amber-500/10 to-transparent border-l-2 border-amber-500">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-amber-500" size={20} />
                <span className="text-[10px] text-white uppercase font-bold tracking-widest">
                  Lifetime Warranty
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="text-amber-500" size={20} />
                <span className="text-[10px] text-white uppercase font-bold tracking-widest">
                  Free Shipping
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* СЕКЦИЯ ОТЗЫВОВ */}
        <div className="mt-32 pt-20 border-t border-white/5">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-light tracking-tighter text-white uppercase italic">
              {t("product.reviews")}{" "}
              <span className="text-amber-500 ml-2">/</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <ReviewForm
                productId={String(product.id)}
                onReviewAdded={onReviewAdded}
              />
            </div>
            <div className="lg:col-span-8" key={reviewKey}>
              <ReviewsList productId={String(product.id)} />
            </div>
          </div>
        </div>
      </div>

      <ModalConfirm
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title={t("admin.deleteProduct")}
        message={t("admin.confirmDelete")}
      />
    </div>
  );
};
