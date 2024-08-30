// src/services/productsService.js
import axios from "axios";

const BASE_URL = "https://localhost:7245/api/Products";

export const getAllProducts = () => {
  return axios.get(`${BASE_URL}`);
};

export const getProductById = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};

export const createProduct = (productData) => {
  return axios.post(`${BASE_URL}`, productData);
};

export const updateProduct = (id, updatedProductData) => {
  return axios.put(`${BASE_URL}/${id}`, updatedProductData);
};

export const deleteProduct = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};
