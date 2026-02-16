import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

export const CartSummary = () => {
  const { cart, getTotal } = useCart();
  const { t } = useTranslation();
  const total = getTotal();

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('cart.total')}</h3>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Items:</span>
          <span>{cart.length}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
