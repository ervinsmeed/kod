import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

export const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const title =
    item[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`] ||
    item.titleKg;
  const price = Number.isFinite(Number(item.price)) ? Number(item.price) : 0;

  const productHref = `/product/${item.uid || item.id}`;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <Link to={productHref} className="shrink-0">
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
          {item.cover ? (
            <img src={item.cover} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">{t('product.noImage') || 'No Image'}</div>
          )}
        </div>
      </Link>
      <div className="flex-1 w-full">
        <Link to={productHref}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-vibrant-orange dark:hover:text-neon-lime">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-400">
          ${price.toFixed(2)}
        </p>

        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.uid || item.id, item.quantity - 1)}
              className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              -
            </button>
            <span className="w-12 text-center text-gray-900 dark:text-white">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.uid || item.id, item.quantity + 1)}
              className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              +
            </button>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              ${(price * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => removeFromCart(item.uid || item.id)}
              className="text-red-600 hover:text-red-700 text-sm mt-1"
            >
              {t('cart.remove')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
