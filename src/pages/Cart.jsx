import { useCart } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import { CartItem } from "../components/CartItem";
import { EmptyState } from "../components/EmptyState";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft } from "lucide-react"; // Добавили иконки

export const Cart = () => {
  const { cart } = useCart();
  const { t } = useTranslation();

  // Состояние пустой корзины
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center container mx-auto px-6 py-20">
        <div className="p-8 rounded-[3rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl text-center shadow-2xl">
          <EmptyState
            message={t("cart.empty")}
            icon={
              <ShoppingBag
                size={64}
                className="text-slate-700 mb-4"
                strokeWidth={1}
              />
            }
          />
          <div className="mt-10">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-full hover:bg-white transition-all duration-500 shadow-xl shadow-amber-500/10"
            >
              <ArrowLeft size={16} />
              {t("nav.catalog")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1115] py-12 sm:py-20">
      <div className="container mx-auto px-6">
        {/* ЗАГОЛОВОК КОРЗИНЫ */}
        <div className="flex flex-col mb-12">
          <h1 className="text-4xl sm:text-5xl font-light tracking-tighter text-white uppercase italic">
            {t("cart.title")}
          </h1>
          <div className="h-1 w-20 bg-amber-500 mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 gap-10 items-start">
          {/* СПИСОК ТОВАРОВ (Слева - 8 колонок) */}
          <div className="space-y-6">
            <div className="bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-[2.5rem] overflow-hidden p-2 sm:p-6">
              {cart.map((item) => (
                <CartItem key={item.uid || item.id} item={item} />
              ))}
            </div>

            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-500 text-[10px] font-bold uppercase tracking-widest transition-colors ml-6"
            >
              <ArrowLeft size={14} />
              {t("cart.continueShopping") || "Continue Shopping"}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
