import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import * as ordersAPI from "../api/orders";
import { OrdersList } from "../components/OrdersList";
import { EmptyState } from "../components/EmptyState";
import { SkeletonList } from "../components/SkeletonList";
import { Package, Clock, History } from "lucide-react";

export const Orders = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadOrders();
  }, [user]);

  const loadOrders = async () => {
    try {
      const allOrders = await ordersAPI.getAll();
      const userOrders = allOrders.filter(
        (order) => String(order.userId) === String(user?.id),
      );
      // Сортируем: новые заказы сверху
      setOrders(
        userOrders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        ),
      );
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1115] py-12 sm:py-20">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* ХЕДЕР СТРАНИЦЫ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-500 mb-2">
              <History size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Purchase History
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tighter text-white uppercase italic">
              {t("orders.title")}
            </h1>
          </div>

          {/* СТАТИСТИКА ЗАКАЗОВ */}
          {!loading && orders.length > 0 && (
            <div className="flex gap-8 border-l border-white/5 pl-8">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-white">{orders.length}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                  Status
                </p>
                <p className="text-2xl font-bold text-amber-500 underline decoration-amber-500/30 underline-offset-4">
                  Active
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ОСНОВНОЙ КОНТЕНТ */}
        <div className="relative">
          {loading ? (
            <div className="space-y-6">
              <SkeletonList count={3} />
            </div>
          ) : orders.length === 0 ? (
            <div className="py-20 bg-white/[0.02] border border-white/[0.05] rounded-[3rem] backdrop-blur-xl">
              <EmptyState
                message={t("orders.empty")}
                icon={
                  <Package
                    size={48}
                    strokeWidth={1}
                    className="text-slate-600 mb-4"
                  />
                }
              />
            </div>
          ) : (
            <div className="space-y-8">
              <OrdersList orders={orders} />
            </div>
          )}
        </div>

        {/* ФУТЕР СТРАНИЦЫ */}
        <div className="mt-20 flex items-center justify-center gap-4 py-8 border-t border-white/5">
          <Clock size={16} className="text-slate-700" />
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};
