import axios from "axios";
import { ensureArray, normalizeReview, toNumber } from "./normalize";

// Проверь этот URL в панели MockAPI, он должен быть активным
const BASE_URL = "https://6969e4093a2b2151f8467813.mockapi.io/reviews";

const normalizeReviews = (data) =>
  ensureArray(data).map((review) => normalizeReview(review));

/**
 * Получить все отзывы
 */
export const getAll = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return normalizeReviews(response.data);
  } catch (error) {
    console.error("Ошибка при получении отзывов:", error.message);
    return []; // Возвращаем пустой массив, чтобы .map() в компоненте не выдал ошибку
  }
};

/**
 * Получить конкретный отзыв
 */
export const getById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return normalizeReview(response.data);
  } catch (error) {
    console.error(`Ошибка при получении отзыва ${id}:`, error.message);
    return null;
  }
};

/**
 * Оставить новый отзыв
 */
export const create = async (reviewData) => {
  try {
    // Автоматически добавляем дату, если она не пришла с формы
    const finalReview = {
      ...reviewData,
      createdAt: new Date().toISOString(),
      rating: toNumber(reviewData.rating, 5),
    };
    const response = await axios.post(BASE_URL, finalReview);
    return normalizeReview(response.data);
  } catch (error) {
    console.error("Ошибка при создании отзыва:", error.message);
    throw error;
  }
};

/**
 * Редактировать отзыв
 */
export const update = async (id, reviewData) => {
  try {
    const payload = { ...reviewData };
    if (Object.prototype.hasOwnProperty.call(reviewData, "rating")) {
      payload.rating = toNumber(reviewData.rating, 0);
    }
    const response = await axios.put(`${BASE_URL}/${id}`, payload);
    return normalizeReview(response.data);
  } catch (error) {
    console.error(`Ошибка при обновлении отзыва ${id}:`, error.message);
    return null;
  }
};

/**
 * Удалить отзыв (например, админом)
 */
export const remove = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return normalizeReview(response.data);
  } catch (error) {
    console.error(`Ошибка при удалении отзыва ${id}:`, error.message);
    return null;
  }
};
