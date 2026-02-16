import axios from "axios";

const BASE_URL = "https://6985988b6964f10bf253c4da.mockapi.io/users";

export const getAll = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении пользователей:", error);
    return [];
  }
};

export const getById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении пользователя с ID ${id}:`, error);
    return null;
  }
};

export const create = async (userData) => {
  try {
    const newUser = {
      ...userData,
      role: userData.role || "user",
      createdAt: new Date().toISOString(),
    };
    const response = await axios.post(BASE_URL, newUser);
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании пользователя:", error);
    throw error;
  }
};

export const update = async (id, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при обновлении пользователя ${id}:`, error);
    return null;
  }
};

export const remove = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при удалении пользователя ${id}:`, error);
    return null;
  }
};
