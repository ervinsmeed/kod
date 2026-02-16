import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AdminLayout } from "../../components/AdminLayout";
import { StatsChart } from "../../components/StatsChart";
import * as ordersAPI from "../../api/orders";
import * as productsAPI from "../../api/products";
import * as usersAPI from "../../api/users";
import {
  ShoppingCart,
  Users,
  DollarSign,
  Package,
  ArrowUpRight,
  Mail,
} from "lucide-react";

export const AdminDashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [latestOrders, setLatestOrders] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [products, orders, users] = await Promise.all([
        productsAPI.getAll(),
        ordersAPI.getAll(),
        usersAPI.getAll(),
      ]);

      const revenue = orders.reduce(
        (sum, order) => sum + (order.total || 0),
        0,
      );

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalUsers: users.length,
        totalRevenue: revenue,
      });

      const sortedOrders = [...orders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setLatestOrders(sortedOrders.slice(0, 4));
      setUsersList(users.slice(0, 3));

      // Реалистичные данные для графика (в будущем можно тянуть из API)
      setChartData([
        { name: "Jan", sales: 4200, orders: 45 },
        { name: "Feb", sales: 5900, orders: 52 },
        { name: "Mar", sales: 8000, orders: 78 },
        { name: "Apr", sales: 7780, orders: 65 },
        { name: "May", sales: 6890, orders: 48 },
        { name: "Jun", sales: 9390, orders: 72 },
      ]);
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "paid":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "shipped":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default:
        return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    }
  };

  return (
    <AdminLayout>
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-10 h-10 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-700">
          {/* СЕТКА КАРТОЧЕК СТАТИСТИКИ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title={t("admin.totalProducts")}
              value={stats.totalProducts}
              icon={<Package size={20} />}
              color="amber"
            />
            <StatCard
              title="Orders"
              value={stats.totalOrders}
              icon={<ShoppingCart size={20} />}
              color="blue"
            />
            <StatCard
              title={t("admin.totalRevenue")}
              value={`$${stats.totalRevenue.toLocaleString()}`}
              icon={<DollarSign size={20} />}
              color="emerald"
            />
            <StatCard
              title={t("admin.totalUsers")}
              value={stats.totalUsers}
              icon={<Users size={20} />}
              color="purple"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* ГРАФИК ПРОДАЖ */}
            <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-md">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-light text-white uppercase italic tracking-tighter">
                    Sales Overview
                  </h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
                    Performance Index
                  </p>
                </div>
                <ArrowUpRight className="text-emerald-500" size={24} />
              </div>
              <div className="h-[300px] w-full">
                <StatsChart data={chartData} />
              </div>
            </div>

            {/* ПОСЛЕДНИЕ ЗАКАЗЫ */}
            <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-md">
              <h3 className="text-xl font-light text-white uppercase italic tracking-tighter mb-8">
                Recent Orders
              </h3>
              <div className="space-y-4">
                {latestOrders.map((order) => (
                  <div
                    key={order.id}
                    className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-lg border text-[10px] font-bold uppercase ${getStatusStyle(order.status)}`}
                      >
                        {order.status}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">
                          #{order.id.toString().slice(-4)}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-black text-white">
                      ${order.total?.toFixed(0)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* СПИСОК ПОЛЬЗОВАТЕЛЕЙ */}
          <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-white/5">
              <h3 className="text-xl font-light text-white uppercase italic tracking-tighter">
                User Management
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/[0.02] text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  <tr>
                    <th className="px-8 py-4 font-medium">Identity</th>
                    <th className="px-8 py-4 font-medium">Contact</th>
                    <th className="px-8 py-4 font-medium">Privileges</th>
                    <th className="px-8 py-4 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {usersList.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-white/[0.01] transition-colors group"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-[10px] font-black text-black">
                            {user.fullName?.charAt(0) || "U"}
                          </div>
                          <span className="text-sm font-bold text-slate-200">
                            {user.fullName || "Anonymous"}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-400">
                        {user.email}
                      </td>
                      <td className="px-8 py-5">
                        <span
                          className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded border ${user.role === "admin" ? "text-amber-500 border-amber-500/30" : "text-slate-500 border-white/10"}`}
                        >
                          {user.role || "user"}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors">
                          <Mail size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

// Вспомогательный компонент для карточек
const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    amber:
      "from-amber-500/20 to-transparent border-amber-500/20 text-amber-500",
    blue: "from-blue-500/20 to-transparent border-blue-500/20 text-blue-500",
    emerald:
      "from-emerald-500/20 to-transparent border-emerald-500/20 text-emerald-500",
    purple:
      "from-purple-500/20 to-transparent border-purple-500/20 text-purple-500",
  };

  return (
    <div
      className={`relative overflow-hidden bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] bg-gradient-to-br ${colors[color]}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          {icon}
        </div>
        <div className="h-1 w-8 rounded-full bg-white/10" />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">
        {title}
      </p>
      <p className="text-3xl font-light tracking-tighter text-white italic">
        {value}
      </p>
    </div>
  );
};
