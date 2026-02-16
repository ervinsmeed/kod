import { Link, useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
// Если у тебя установлена библиотека lucide-react, иконка Bike будет смотреться супер
import { Bike } from "lucide-react";

const buildAdminMenuItems = (t) => [
  { path: "/admin/products", label: t("admin.products") },
  { path: "/admin/orders", label: t("admin.orders") },
  { path: "/admin/users", label: t("admin.users") },
];

export const AdminLayout = ({ children }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Plus_Jakarta_Sans']">
      <div className="relative overflow-hidden">
        {/* Обновил цвета свечения: вместо зеленого — энергичный оранжевый */}
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-vibrant-orange/10 blur-3xl"></div>
          <div className="absolute top-24 left-10 h-72 w-72 rounded-full bg-energy-blue/10 blur-3xl"></div>
        </div>
        <div className="flex relative z-10">
          <AdminSidebar />
          <div className="flex-1 flex flex-col min-h-screen">
            <AdminHeader user={user} />
            <AdminMobileNav />
            <div className="flex-1 p-4 sm:p-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin";
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const menuItems = buildAdminMenuItems(t);

  return (
    <div className="hidden md:flex w-72 min-h-screen flex-col border-r border-slate-800 bg-slate-900/70 backdrop-blur">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          {/* Заменили 'M' на иконку или 'V' */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-slate-950 shadow-lg shadow-orange-500/20">
            <span className="font-black text-xl italic">V</span>
          </div>
          <div>
            <h2 className="text-slate-100 font-extrabold text-xl tracking-tight">
              Velogo
            </h2>
            <p className="text-orange-500 text-[10px] font-bold tracking-[0.2em] uppercase">
              Bike Expert
            </p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all border ${
              isActive(item.path)
                ? "bg-orange-500/10 text-orange-500 border-orange-500/30" // Оранжевый акцент для активного пункта
                : "text-slate-400 border-transparent hover:bg-slate-800/60 hover:text-slate-100"
            }`}
          >
            <span className="font-semibold">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export const AdminMobileNav = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const menuItems = buildAdminMenuItems(t);

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin";
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <nav className="md:hidden px-4 pb-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
              isActive(item.path)
                ? "bg-orange-500/10 text-orange-500 border-orange-500/30"
                : "text-slate-300 border-slate-800 bg-slate-900/60 hover:bg-slate-800/80"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export const AdminHeader = ({ user }) => {
  const { t } = useTranslation();
  const userLabel = user?.fullName || user?.email || "User";
  const userInitial = userLabel.trim().charAt(0).toUpperCase();

  return (
    <div className="bg-slate-900/40 border-b border-slate-800 px-4 sm:px-6 py-4 sm:py-5 backdrop-blur">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            VeloGo Admin
          </h1>
          <p className="text-sm text-slate-500 italic">
            Manage products, orders & users
          </p>
        </div>
        {user && (
          <div className="w-full sm:w-auto flex items-center justify-between gap-3 bg-slate-800/50 p-2 px-4 rounded-2xl border border-slate-700">
            <div className="text-right">
              <p className="text-sm text-slate-100 font-bold leading-tight">
                {userLabel}
              </p>
              <p className="text-[10px] text-orange-500 uppercase font-black tracking-widest">
                {user.role}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center font-bold text-xs">
              {userInitial}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
