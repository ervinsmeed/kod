import { useLanguage } from '../context/LanguageContext';

export const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <select
      value={currentLanguage}
      onChange={(e) => changeLanguage(e.target.value)}
      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-200 border-2 border-transparent hover:border-vibrant-orange dark:hover:border-neon-lime outline-none cursor-pointer font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
    >
      <option value="kg">🇰🇬 KG</option>
      <option value="ru">🇷🇺 RU</option>
      <option value="en">🇬🇧 EN</option>
    </select>
  );
};
