import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  FaBicycle,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";

export const VeloGoFooter = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.catalog"), path: "/catalog" },
    { name: t("nav.cart"), path: "/cart" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0f1115] pt-20 pb-10 border-t border-white/5 overflow-hidden">
      {/* Декоративный градиент на фоне */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-amber-500/5 blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Section (5 колонок) */}
          <div className="md:col-span-5 space-y-6">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="p-3 rounded-2xl bg-amber-500 text-black transform group-hover:rotate-12 transition-transform duration-500">
                <FaBicycle size={24} />
              </div>
              <span className="text-3xl font-light tracking-tighter text-white uppercase italic">
                Velo<span className="text-amber-500">Go</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-light">
              Ваш премиальный маркетплейс велосипедов. Мы объединяем технологии,
              дизайн и страсть к движению в каждой детали. Откройте новый
              уровень свободы.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-4">
              {[FaFacebook, FaInstagram, FaTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links (3 колонки) */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-500 mb-8">
              Навигация
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-amber-500 group-hover:w-4 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info (4 колонки) */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-500 mb-8">
              Контакты
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 group-hover:border-amber-500/50 transition-colors">
                  <FaPhone size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                    Телефон
                  </p>
                  <p className="text-white text-sm font-medium">
                    +996 (501) 701-846
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 group-hover:border-amber-500/50 transition-colors">
                  <FaMapMarkerAlt size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                    Адрес
                  </p>
                  <p className="text-white text-sm font-medium">
                    Кыргызстан, г. Бишкек
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-[11px] uppercase tracking-widest">
            &copy; {new Date().getFullYear()} VeloGo. Все права защищены.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-amber-500 transition-colors group"
          >
            Вверх
            <FaArrowUp className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
