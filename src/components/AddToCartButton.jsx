import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

export const AddToCartButton = ({ product }) => {
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const handleAdd = () => {
    addToCart(product);
  };

  return (
    <button
      onClick={handleAdd}
      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-energy-blue to-vibrant-orange text-white rounded-lg font-semibold hover:from-vibrant-orange hover:to-energy-blue transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
    >
      <span className="relative z-10">{t('product.addToCart')}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-vibrant-orange to-neon-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </button>
  );
};
