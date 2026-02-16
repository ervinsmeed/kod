import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { FaBicycle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const VeloGoHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const { cart } = useCart();
  const { currentLanguage, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const toggleLanguage = () => {
    // Cycle through available languages: kg -> en -> ru -> kg
    let newLang;
    if (currentLanguage === 'kg') {
      newLang = 'en';
    } else if (currentLanguage === 'en') {
      newLang = 'ru';
    } else {
      newLang = 'kg';
    }
    changeLanguage(newLang);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.catalog'), href: '/catalog' },
    { name: t('nav.cart'), href: '/cart' },
    { name: t('nav.booking'), href: '/booking', className: 'ml-6' },
  ];

  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-300 bg-[#0f172a]/80 backdrop-blur-md border-b border-gray-700/50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo Section - Left */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-neon-lime to-vibrant-orange transition-all duration-300">
                <FaBicycle className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-jakarta bg-gradient-to-r from-neon-lime to-vibrant-orange bg-clip-text text-transparent">
                VeloGo
              </span>
            </Link>
          </div>

          {/* Centered Navigation Links - Desktop */}
          <div className="hidden lg:flex flex-1 justify-center min-w-0">
            <div className="flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-medium text-white hover:text-vibrant-orange transition-all duration-300 relative pb-1 ${link.className || ''}`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-lime to-vibrant-orange transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Cart Link */}
            <Link 
              to="/cart" 
              className="p-3 rounded-xl hover:bg-gray-800/50 transition-all duration-300 relative group"
            >
              <FiShoppingCart className="h-5 w-5 text-white group-hover:text-vibrant-orange" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-neon-lime to-vibrant-orange text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-gray-800/50 text-white hover:bg-gray-700/50 hover:text-vibrant-orange transition-all duration-300 font-medium"
            >
              {currentLanguage.toUpperCase()}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="hidden sm:inline-flex p-3 rounded-xl bg-gray-800/50 text-white hover:bg-gray-700/50 hover:text-vibrant-orange transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <FiSun className="h-5 w-5" />
              ) : (
                <FiMoon className="h-5 w-5" />
              )}
            </button>

            {/* Authentication Links */}
            {user ? (
              // User is logged in - show profile links
              <>
                <Link
                  to="/profile"
                  className="hidden md:inline-block px-5 py-2 rounded-xl text-white hover:bg-gray-800/50 hover:text-vibrant-orange transition-all duration-300 font-medium"
                >
                  {user.name || t('nav.profile')}
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin/products"
                    className="hidden md:inline-block px-5 py-2 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-neon-lime to-vibrant-orange text-black"
                  >
                    {t('nav.admin')}
                  </Link>
                )}
              </>
            ) : (
              // User is not logged in - show login/register links
              <>
                <Link
                  to="/login"
                  className="hidden md:inline-block px-5 py-2 rounded-xl text-white hover:bg-gray-800/50 hover:text-vibrant-orange transition-all duration-300 font-medium"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="hidden md:inline-block px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-neon-lime to-vibrant-orange text-black shadow-lg shadow-vibrant-orange/20"
                >
                  {t('nav.register')}
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl text-white hover:bg-gray-800/50 hover:text-vibrant-orange transition-all duration-300"
            >
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0f172a]/95 rounded-xl mt-3 p-5 backdrop-blur-lg border border-gray-700/50">
            <div className="flex flex-col space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-medium py-3 px-4 rounded-xl text-white hover:bg-gray-800/50 hover:text-vibrant-orange transition-all duration-300"
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                // User is logged in - show profile links
                <>
                  <Link
                    to="/profile"
                    className="font-medium py-3 px-4 rounded-xl text-white hover:bg-gray-800/50 hover:text-vibrant-orange transition-all duration-300"
                  >
                    {user.name || t('nav.profile')}
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin/products"
                      className="font-medium py-3 px-4 rounded-xl transition-all duration-300 bg-gradient-to-r from-neon-lime to-vibrant-orange text-black"
                    >
                      {t('nav.admin')}
                    </Link>
                  )}
                </>
              ) : (
                // User is not logged in - show login/register links
                <>
                  <Link
                    to="/login"
                    className="font-medium py-3 px-4 rounded-xl text-white hover:bg-gray-800/50 hover:text-vibrant-orange transition-all duration-300"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    className="font-medium py-3 px-4 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-neon-lime to-vibrant-orange text-black"
                  >
                    {t('nav.register')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default VeloGoHeader;
