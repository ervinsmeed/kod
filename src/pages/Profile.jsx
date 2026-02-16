import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import * as usersAPI from "../api/users";
import * as favoritesAPI from "../api/favorites";
import * as ordersAPI from "../api/orders";
import * as productsAPI from "../api/products";
import { Link } from "react-router-dom";

export const Profile = () => {
  const { user, login, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        avatar: user.avatar || "",
      });
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    setLoadingData(true);
    try {
      // Load favorites
      const allFavorites = await favoritesAPI.getAll();
      const userFavorites = allFavorites.filter(
        (f) => String(f.userId) === String(user.id),
      );

      // Get product details for favorites
      const favoriteProducts = await Promise.all(
        userFavorites.slice(0, 5).map(async (fav) => {
          try {
            const product = await productsAPI.getById(fav.productId);
            return product;
          } catch (error) {
            return null;
          }
        }),
      );
      setFavoriteItems(favoriteProducts.filter(Boolean));

      // Load recent orders
      const allOrders = await ordersAPI.getAll();
      const userOrders = allOrders
        .filter((order) => String(order.userId) === String(user.id))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentOrders(userOrders);

      // Load users list (for admin)
      if (user.role === "admin") {
        const allUsers = await usersAPI.getAll();
        setUsersList(allUsers.slice(0, 5));
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const updatedUser = await usersAPI.update(user.id, {
        ...user,
        fullName: formData.fullName,
        email: formData.email,
        avatar: formData.avatar,
      });

      // Update auth context
      login(updatedUser, localStorage.getItem("token"));

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "text-energy-yellow",
      processing: "text-energy-blue",
      shipped: "text-neon-lime",
      delivered: "text-neon-lime",
      cancelled: "text-red-600",
    };
    return colors[status] || "text-gray-600";
  };

  const getStatusIcon = (status) => {
    if (status === "shipped" || status === "delivered") return 'a?"?';
    if (status === "processing") return "a?>'";
    return 'a?"?';
  };

  if (!user) {
    return null;
  }
  const avatarUrl =
    formData.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || "User")}&background=6366f1&color=fff&size=200`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl"></div>
          <div className="absolute top-20 left-10 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 py-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl shadow-2xl p-8 backdrop-blur">
                {/* User Header */}
                <div className="relative rounded-2xl overflow-hidden mb-10 border border-slate-800">
                  <div className="h-28 bg-gradient-to-r from-amber-500/30 via-orange-400/20 to-cyan-400/30"></div>
                  <div className="px-6 pb-6">
                    <div className="-mt-12 flex flex-col md:flex-row md:items-end gap-4">
                      <img
                        src={avatarUrl}
                        alt={user.fullName}
                        className="w-24 h-24 rounded-2xl object-cover border-4 border-slate-900 ring-2 ring-amber-400/40"
                      />
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-slate-100">
                          {user.fullName}
                        </h2>
                        <div className="flex items-center gap-2 text-slate-300 mt-1">
                          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
                          <span className="capitalize">
                            {user.role === "admin"
                              ? t("profile.admin")
                              : t("profile.user")}
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm">{user.email}</p>
                      </div>
                      <button
                        type="button"
                        onClick={logout}
                        className="px-5 py-2 bg-transparent border border-rose-400/50 text-rose-200 rounded-lg font-semibold hover:bg-rose-500/10 transition-all"
                      >
                        {t("nav.logout")}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Edit Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {success && (
                    <div className="p-4 bg-emerald-500/10 text-emerald-300 rounded-lg border border-emerald-500/20">
                      {t("profile.saved")}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      {t("profile.fullName")}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-slate-700 rounded-xl bg-slate-900/60 text-slate-100 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      {t("profile.emailAddress")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-slate-700 rounded-xl bg-slate-900/60 text-slate-100 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      {t("profile.avatar")}
                    </label>
                    <div className="flex items-center gap-4">
                      <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-16 h-16 rounded-xl object-cover border border-slate-700"
                      />
                      <label className="px-4 py-2.5 bg-slate-800 text-slate-100 rounded-xl cursor-pointer hover:bg-slate-700 transition-all font-semibold border border-slate-700">
                        {t("profile.uploadNewImage")}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-semibold disabled:opacity-50 transition-all transform hover:scale-[1.02] active:scale-[0.99]"
                  >
                    {loading ? t("common.loading") : t("profile.saveChanges")}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column - Dashboard Widgets */}
            <div className="space-y-6">
              {/* Favorite Items */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl shadow-2xl p-6 backdrop-blur">
                <h3 className="text-lg font-bold text-slate-100 mb-4">
                  {t("profile.favoriteItems")}
                </h3>
                {loadingData ? (
                  <div className="text-slate-400">{t("common.loading")}</div>
                ) : favoriteItems.length === 0 ? (
                  <div className="text-sm text-slate-400">
                    {t("profile.noFavorites")}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {favoriteItems.map((product) => {
                      const title =
                        product[
                          `title${lang.charAt(0).toUpperCase() + lang.slice(1)}`
                        ] || product.titleKg;
                      const productHref = `/product/${product.uid || product.id}`;
                      return (
                        <Link
                          key={product.uid || product.id}
                          to={productHref}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-700"
                        >
                          <img
                            src={
                              product.cover || "https://via.placeholder.com/60"
                            }
                            alt={title}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-700"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-100 truncate">
                              {title}
                            </p>
                            <p className="text-sm font-semibold text-amber-400">
                              ${product.price?.toFixed(2) || "0.00"}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Recent Orders */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl shadow-2xl p-6 backdrop-blur">
                <h3 className="text-lg font-bold text-slate-100 mb-4">
                  {t("profile.recentOrders")}
                </h3>
                {loadingData ? (
                  <div className="text-slate-400">{t("common.loading")}</div>
                ) : recentOrders.length === 0 ? (
                  <div className="text-sm text-slate-400">
                    {t("profile.noOrders")}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-3 bg-slate-800/70 rounded-xl border border-slate-700"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">
                            {getStatusIcon(order.status)}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-slate-100">
                              {t("orders.orderNumber")} #{order.id}
                            </p>
                            {order.status && (
                              <p
                                className={`text-xs ${getStatusColor(order.status)}`}
                              >
                                {order.status}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-100">
                            ${order.total?.toFixed(2) || "0.00"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Users List (Admin only) */}
              {user.role === "admin" && (
                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl shadow-2xl p-6 backdrop-blur">
                  <h3 className="text-lg font-bold text-slate-100 mb-4">
                    {t("profile.usersList")}
                  </h3>
                  {loadingData ? (
                    <div className="text-slate-400">{t("common.loading")}</div>
                  ) : usersList.length === 0 ? (
                    <div className="text-sm text-slate-400">
                      {t("profile.noUsers")}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {usersList.map((u) => (
                        <div
                          key={u.id}
                          className="flex items-center gap-3 p-3 bg-slate-800/70 rounded-xl border border-slate-700"
                        >
                          <span className="text-xl">a?'y</span>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-100">
                              {u.fullName || "N/A"}
                            </p>
                            <p className="text-xs text-slate-400">{u.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
