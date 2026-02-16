import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{t('notfound.title')}</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-energy-blue text-white rounded-lg hover:bg-vibrant-orange transition-colors"
        >
          {t('nav.home')}
        </Link>
      </div>
    </div>
  );
};
