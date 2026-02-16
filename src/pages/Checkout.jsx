import { useCart } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import { CheckoutForm } from "../components/CheckoutForm";
import { CartSummary } from "../components/CartSummary";
import { Navigate } from "react-router-dom";
import { CreditCard, ShieldCheck } from "lucide-react";

export const Checkout = () => {
  const { cart } = useCart();
  const { t } = useTranslation();

  // Если корзина пуста, мягко возвращаем пользователя назад
  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0f1115] py-12 sm:py-20">
      <div className="container mx-auto px-6">
        {/* ЗАГОЛОВОК С ИКОНКОЙ */}
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
            <CreditCard
              className="text-amber-500"
              size={28}
              strokeWidth={1.5}
            />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tighter text-white uppercase">
              {t("checkout.title")}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                Secure Checkout Enabled
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ФОРМА (Слева) */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 shadow-2xl">
            <CheckoutForm />
          </div>

          {/* ИТОГО (Справа) */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="relative group">
              {/* Декоративное свечение за панелью */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-transparent blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

              <div className="relative bg-gradient-to-b from-slate-900 to-black border border-white/[0.08] rounded-[2.5rem] p-8 overflow-hidden shadow-xl">
                <CartSummary />

                {/* Дополнительный текст для доверия */}
                <div className="mt-8 pt-8 border-t border-white/5 text-center">
                  <p className="text-[11px] text-slate-500 leading-relaxed italic">
                    By clicking "Place Order", you agree to our terms of service
                    and premium delivery conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
