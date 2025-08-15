import BASE_URL from './api';

const API_URL = `${BASE_URL}Produto`;

export const getAllProducts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Falha em getAllProducts:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    console.log(`${API_URL}/${id}`)
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Produto não encontrado.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Falha em getProductById para o id ${id}:`, error);
    throw error;
  }
};
