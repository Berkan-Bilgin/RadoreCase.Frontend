// thunks/productThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsApi, fetchProductByIdApi } from '../api/productsApi';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  return await fetchProductsApi();
});

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, thunkAPI) => {
    try {
      return await fetchProductByIdApi(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
