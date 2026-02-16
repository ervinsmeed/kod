import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as reviewsAPI from '../api/reviews';
import * as usersAPI from '../api/users';
import { RatingStars } from './RatingStars';

export const ReviewsList = ({ productId }) => {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    if (!productId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const allReviews = await reviewsAPI.getAll();
      // Используем строгое сравнение строк для ID
      const productReviews = allReviews.filter(
        (r) => String(r.productId) === String(productId)
      );
      
      // Сортируем по дате (новые сначала)
      const sortedReviews = productReviews.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
      
      let usersMap = new Map();
      try {
        const allUsers = await usersAPI.getAll();
        usersMap = new Map(allUsers.map((u) => [String(u.id), u]));
      } catch (error) {
        console.error('Error loading users:', error);
      }

      const reviewsWithUsers = sortedReviews.map((review) => {
        const user = usersMap.get(String(review.userId));
        const name = user?.fullName || user?.email || t('common.anonymous');
        return { ...review, userName: name };
      });

      setReviews(reviewsWithUsers);
    } catch (error) {
      console.error('Error loading reviews:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-gray-600 dark:text-gray-400">{t('review.loading')}</div>;
  }

  if (reviews.length === 0) {
    return <div className="text-gray-600 dark:text-gray-400">{t('empty.noReviews')}</div>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{review.userName}</p>
              <RatingStars rating={review.rating} size="sm" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{review.text}</p>
        </div>
      ))}
    </div>
  );
};
