import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import * as favoritesAPI from '../api/favorites';

export const FavoriteButton = ({ productId }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && productId) {
      checkFavorite();
    } else {
      setIsFavorite(false);
    }
  }, [user, productId]);

  const checkFavorite = async () => {
    if (!user || !productId) {
      setIsFavorite(false);
      return;
    }
    
    try {
      const allFavorites = await favoritesAPI.getAll();
      const userIdStr = String(user.id);
      const productIdStr = String(productId);
      
      const favorite = allFavorites.find(
        (f) => String(f.userId) === userIdStr && String(f.productId) === productIdStr
      );
      
      setIsFavorite(!!favorite);
    } catch (error) {
      console.error('Error checking favorite:', error);
      setIsFavorite(false);
    }
  };

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      alert('Please login to add favorites');
      return;
    }

    setLoading(true);
    try {
      const allFavorites = await favoritesAPI.getAll();
      const existing = allFavorites.find(
        (f) => String(f.userId) === String(user.id) && String(f.productId) === String(productId)
      );

      if (existing) {
        await favoritesAPI.remove(existing.id);
        setIsFavorite(false);
      } else {
        await favoritesAPI.create({ 
          userId: String(user.id), 
          productId: String(productId) 
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Error updating favorite. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`p-2.5 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95 ${
        isFavorite
          ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl animate-bounce-in'
          : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 hover:shadow-md'
      }`}
    >
      <span className={`text-xl ${isFavorite ? 'animate-pulse' : ''}`}>
        {isFavorite ? '❤️' : '🤍'}
      </span>
    </button>
  );
};
