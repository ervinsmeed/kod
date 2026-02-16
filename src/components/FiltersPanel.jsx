import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const FiltersPanel = ({ filters, onFilterChange, products = [] }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  // Получаем уникальные значения из товаров
  const categories = ['mountain', 'road', 'city', 'electric', 'kids', 'accessories'];
  
  // Функция перевода категорий
  const translateCategory = (category) => {
    return t(`category.${category}`);
  };

  // Функция перевода цветов
  const translateColor = (color) => {
    if (!color) return color;
    // Нормализуем строку: убираем пробелы, приводим к нижнему регистру
    const normalized = color.toLowerCase().trim().replace(/\s+/g, '');
    // Пробуем разные варианты ключей
    const keys = [
      normalized,
      normalized.replace(/[ё]/g, 'е'),
      color.toLowerCase().trim()
    ];
    
    for (const key of keys) {
      const translationKey = `color.${key}`;
      const translated = t(translationKey, { defaultValue: color });
      // Если перевод отличается от ключа, значит перевод найден
      if (translated && translated !== translationKey) {
        return translated;
      }
    }
    return color; // Если перевода нет, вернем оригинал
  };

  // Функция перевода материалов
  const translateMaterial = (material) => {
    if (!material) return material;
    // Нормализуем строку: убираем пробелы, приводим к нижнему регистру
    const normalized = material.toLowerCase().trim().replace(/\s+/g, '');
    // Пробуем разные варианты ключей
    const keys = [
      normalized,
      normalized.replace(/[ё]/g, 'е'),
      material.toLowerCase().trim()
    ];
    
    for (const key of keys) {
      const translationKey = `material.${key}`;
      const translated = t(translationKey, { defaultValue: material });
      // Если перевод отличается от ключа, значит перевод найден
      if (translated && translated !== translationKey) {
        return translated;
      }
    }
    return material; // Если перевода нет, вернем оригинал
  };
  
  const getUniqueValues = (field) => {
    const values = products
      .map(p => p[field])
      .filter(Boolean)
      .filter((v, i, arr) => arr.indexOf(v) === i);
    return values.sort();
  };

  const colors = getUniqueValues('color');
  const materials = getUniqueValues('material');

  const hasActiveFilters = filters.category || filters.color || filters.material || 
    filters.minPrice || filters.maxPrice || filters.minRating || filters.sort;

  const resetFilters = () => {
    onFilterChange('category', '');
    onFilterChange('color', '');
    onFilterChange('material', '');
    onFilterChange('minPrice', '');
    onFilterChange('maxPrice', '');
    onFilterChange('minRating', '');
    onFilterChange('sort', '');
  };

  return (
    <div className="bg-[#0f172a] p-4 sm:p-6 rounded-3xl shadow-2xl mb-8 border border-gray-700/50">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <span className="text-vibrant-orange">🔍</span>
          {t('filters.title')}
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="w-full sm:w-auto px-4 py-2 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all font-semibold"
            >
              {t('filters.reset')}
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full sm:w-auto px-4 py-2 text-sm bg-gray-800 text-white rounded-xl hover:bg-gray-700 hover:text-vibrant-orange transition-all font-semibold"
          >
            {isExpanded ? '▲' : '▼'} {t('filters.more')}
          </button>
        </div>
      </div>

      {/* Основные фильтры - всегда видимы */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            {t('filter.category')}
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full px-5 py-3 border-none rounded-2xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-vibrant-orange transition-all cursor-pointer"
          >
            <option value="" className="bg-gray-800 text-white">
              {t('filters.all')}
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-gray-800 text-white">
                {translateCategory(cat)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            {t('filter.color')}
          </label>
          <select
            value={filters.color || ''}
            onChange={(e) => onFilterChange('color', e.target.value)}
            className="w-full px-5 py-3 border-none rounded-2xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-vibrant-orange transition-all cursor-pointer"
          >
            <option value="" className="bg-gray-800 text-white">
              {t('filters.all')}
            </option>
            {colors.map((color) => (
              <option key={color} value={color} className="bg-gray-800 text-white">
                {translateColor(color)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            {t('filter.sort')}
          </label>
          <select
            value={filters.sort || ''}
            onChange={(e) => onFilterChange('sort', e.target.value)}
            className="w-full px-5 py-3 border-none rounded-2xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-vibrant-orange transition-all cursor-pointer"
          >
            <option value="" className="bg-gray-800 text-white">
              {t('filters.default')}
            </option>
            <option value="priceAsc" className="bg-gray-800 text-white">{t('filter.sortPriceAsc')}</option>
            <option value="priceDesc" className="bg-gray-800 text-white">{t('filter.sortPriceDesc')}</option>
            <option value="ratingDesc" className="bg-gray-800 text-white">{t('filter.sortRatingDesc')}</option>
            <option value="nameAsc" className="bg-gray-800 text-white">{t('filter.sortNameAsc')}</option>
          </select>
        </div>
      </div>

      {/* Расширенные фильтры - показываются при раскрытии */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-5 border-t border-gray-700/50 animate-fadeIn">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              {t('filter.material')}
            </label>
            <select
              value={filters.material || ''}
              onChange={(e) => onFilterChange('material', e.target.value)}
              className="w-full px-5 py-3 border-none rounded-2xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-vibrant-orange transition-all cursor-pointer"
            >
              <option value="" className="bg-gray-800 text-white">
                {t('filters.all')}
              </option>
              {materials.map((material) => (
                <option key={material} value={material} className="bg-gray-800 text-white">
                  {translateMaterial(material)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              {t('filter.priceRange')}
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <input
                type="number"
                placeholder={t('filter.minPrice')}
                value={filters.minPrice || ''}
                onChange={(e) => onFilterChange('minPrice', e.target.value)}
                className="w-full px-5 py-3 border-none rounded-2xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-vibrant-orange transition-all"
                min="0"
              />
              <span className="text-gray-500 dark:text-gray-400">-</span>
              <input
                type="number"
                placeholder={t('filter.maxPrice')}
                value={filters.maxPrice || ''}
                onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                className="w-full px-5 py-3 border-none rounded-2xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-vibrant-orange transition-all"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              {t('filter.minRating')}
            </label>
            <select
              value={filters.minRating || ''}
              onChange={(e) => onFilterChange('minRating', e.target.value)}
              className="w-full px-5 py-3 border-none rounded-2xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-vibrant-orange transition-all cursor-pointer"
            >
              <option value="" className="bg-gray-800 text-white">
                {t('filters.all')}
              </option>
              <option value="4.5" className="bg-gray-800 text-white">4.5+ ⭐</option>
              <option value="4.0" className="bg-gray-800 text-white">4.0+ ⭐</option>
              <option value="3.5" className="bg-gray-800 text-white">3.5+ ⭐</option>
              <option value="3.0" className="bg-gray-800 text-white">3.0+ ⭐</option>
            </select>
          </div>
        </div>
      )}

      {/* Показываем активные фильтры */}
      {hasActiveFilters && (
        <div className="mt-5 pt-5 border-t border-gray-700/50">
          <div className="flex flex-wrap gap-3">
            <span className="text-sm text-gray-400 font-semibold">
              {t('filters.active')}:
            </span>
            {filters.category && (
              <span className="px-4 py-1.5 bg-gradient-to-r from-vibrant-orange to-neon-lime text-black rounded-full text-sm font-medium">
                {t('filter.category')}: {translateCategory(filters.category)}
              </span>
            )}
            {filters.color && (
              <span className="px-4 py-1.5 bg-gradient-to-r from-vibrant-orange to-neon-lime text-black rounded-full text-sm font-medium">
                {t('filter.color')}: {translateColor(filters.color)}
              </span>
            )}
            {filters.material && (
              <span className="px-4 py-1.5 bg-gradient-to-r from-vibrant-orange to-neon-lime text-black rounded-full text-sm font-medium">
                {t('filter.material')}: {translateMaterial(filters.material)}
              </span>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <span className="px-4 py-1.5 bg-gradient-to-r from-vibrant-orange to-neon-lime text-black rounded-full text-sm font-medium">
                ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'}
              </span>
            )}
            {filters.minRating && (
              <span className="px-4 py-1.5 bg-gradient-to-r from-vibrant-orange to-neon-lime text-black rounded-full text-sm font-medium">
                ⭐ {filters.minRating}+
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
