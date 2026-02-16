import axios from "axios";
import { ensureArray, normalizeOrder, toNumber } from "./normalize";

const BASE_URL = "https://6969e5563a2b2151f8467c2f.mockapi.io/orders";

const normalizeOrders = (data) =>
  ensureArray(data).map((order) => normalizeOrder(order));

export const getAll = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return normalizeOrders(response.data);
  } catch (error) {
    console.error("Ошибка при получении заказов:", error.message);
    return [];
  }
};

export const getById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return normalizeOrder(response.data);
  } catch (error) {
    console.error(`Ошибка при получении заказа ${id}:`, error.message);
    return null;
  }
};

export const create = async (orderData) => {
  try {
    const items = Array.isArray(orderData.items) ? orderData.items : [];
    const fallbackTotal = items.reduce(
      (sum, item) => sum + toNumber(item.price, 0) * toNumber(item.quantity, 1),
      0,
    );
    const total = toNumber(
      orderData.total ?? orderData.totalPrice ?? fallbackTotal,
      fallbackTotal,
    );

    const finalOrder = {
      ...orderData,
      status: orderData.status || "pending",
      createdAt: new Date().toISOString(),

      total,
      totalPrice: total,
    };

    const response = await axios.post(BASE_URL, finalOrder);
    return normalizeOrder(response.data);
  } catch (error) {
    console.error("Ошибка при оформлении заказа:", error.message);
    throw error;
  }
};

export const update = async (id, orderData) => {
  try {
    const hasTotal =
      orderData.total !== undefined || orderData.totalPrice !== undefined;
    const totalValue = orderData.total ?? orderData.totalPrice;
    const payload = {
      ...orderData,
      ...(hasTotal
        ? {
            total: toNumber(totalValue, 0),
            totalPrice: toNumber(totalValue, 0),
          }
        : {}),
    };
    const response = await axios.put(`${BASE_URL}/${id}`, payload);
    return normalizeOrder(response.data);
  } catch (error) {
    console.error(`Ошибка при обновлении заказа ${id}:`, error.message);
    return null;
  }
};

export const remove = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return normalizeOrder(response.data);
  } catch (error) {
    console.error(`Ошибка при удалении заказа ${id}:`, error.message);
    return null;
  }
};
