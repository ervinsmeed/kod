import { useTranslation } from "react-i18next";
import { memo } from "react";

export const Footer = memo(() => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: "📘",
      href: "https://facebook.com",
      label: "Facebook",
      gradient: "from-energy-blue to-vibrant-orange",
    },
    {
      icon: "📷",
      href: "https://instagram.com",
      label: "Instagram",
      gradient: "from-vibrant-orange to-neon-lime",
    },
    {
      icon: "🐦",
      href: "https://twitter.com",
      label: "Twitter",
      gradient: "from-energy-blue to-neon-lime",
    },
  ];

  const quickLinks = [
    { key: "nav.catalog", href: "/catalog" },
    { key: "footer.about", href: "/about" },
    { key: "footer.contact", href: "/contact" },
    { key: "footer.privacy", href: "/privacy" },
    { key: "footer.terms", href: "/terms" },
  ];

  return (
    <footer className="bg-gradient-to-r from-custom-dark via-slate-900 to-custom-dark text-white py-12 mt-auto border-t border-gray-700/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1 animate-fadeIn">
            <h3 className="text-3xl font-extrabold mb-4 gradient-text bg-gradient-to-r from-energy-blue to-vibrant-orange bg-clip-text text-transparent">
              {t("footer.brandName", "YourBrand")}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fadeIn" style={{ animationDelay: "0.1s" }}>
            <h4 className="text-lg font-bold mb-4 text-white border-b-2 border-energy-blue/30 pb-2 inline-block">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block relative group"
                  >
                    <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-energy-blue">
                      →
                    </span>
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fadeIn" style={{ animationDelay: "0.15s" }}>
            <h4 className="text-lg font-bold mb-4 text-white border-b-2 border-vibrant-orange/30 pb-2 inline-block">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2 hover:text-white transition-colors duration-300">
                <span className="text-energy-blue">📍</span>
                <span>{t("footer.address", "123 Business St, City")}</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors duration-300">
                <span className="text-vibrant-orange">📧</span>
                <a href="mailto:info@example.com" className="hover:text-white">
                  info@example.com
                </a>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors duration-300">
                <span className="text-neon-lime">📞</span>
                <a href="tel:+996501701846" className="hover:text-white">
                  +996 (501) 701-846
                </a>
              </li>
            </ul>
          </div>

          <div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <h4 className="text-lg font-bold mb-4 text-white border-b-2 border-neon-lime/30 pb-2 inline-block">
              {t("footer.followUs")}
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group relative"
                >
                  <div
                    className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center
                                hover:bg-gradient-to-r hover:from-energy-blue hover:to-vibrant-orange
                                transform hover:scale-110 hover:rotate-6 transition-all duration-300
                                border border-gray-600 hover:border-transparent"
                  >
                    <span className="text-xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                  </div>
                  <span
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2
                                 text-xs bg-gray-800 text-white px-2 py-1 rounded
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                 whitespace-nowrap pointer-events-none"
                  >
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700/50 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm order-2 md:order-1">
              &copy; {currentYear} {t("footer.rights")}.
              <span className="block md:inline md:ml-2 text-gray-500">
                {t("footer.allRightsReserved", "All rights reserved.")}
              </span>
            </p>

            <div className="flex gap-6 order-1 md:order-2">
              <a
                href="/privacy"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                {t("footer.privacy")}
              </a>
              <a
                href="/terms"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                {t("footer.terms")}
              </a>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-1 group"
              >
                <span>{t("footer.backToTop", "Back to top")}</span>
                <span className="transform group-hover:-translate-y-1 transition-transform duration-300">
                  ↑
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
