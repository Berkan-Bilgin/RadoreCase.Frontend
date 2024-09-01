import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { fetchProducts } from '../thunks/productThunks';
import { fetchProductById } from '../thunks/productThunks';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    carts: [],
    favorites: [],
    single: null, // Her bir ürünün detayını tutar
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {
    AddToCart: (state, action) => {
      let { id } = action.payload;
      let sepeteEklenecekUrun = state.carts.find((item) => item.id === parseInt(id));
      if (!sepeteEklenecekUrun) {
        let item = state.products.find((item) => item.id === parseInt(id));
        if (item) {
          item.quantity = 1;
          state.carts.push(item);
          Swal.fire({
            title: 'Başarılı',
            text: 'Ürün sepete eklendi!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    },
    updateCart: (state, action) => {
      let { val, id } = action.payload;
      state.carts.forEach((item) => {
        if (item.id === parseInt(id)) {
          item.quantity = val;
        }
      });
    },
    removeCart: (state, action) => {
      let { id } = action.payload;
      state.carts = state.carts.filter((item) => item.id !== parseInt(id));
    },
    clearCart: (state) => {
      state.carts = [];
    },
    addToFavorites: (state, action) => {
      let { id } = action.payload;
      let item = state.favorites.find((item) => item.id === parseInt(id));
      if (!item) {
        let urunFavori = state.products.find((item) => item.id === parseInt(id));
        if (urunFavori) {
          urunFavori.quantity = 1;
          state.favorites.push(urunFavori);
          Swal.fire({
            title: 'Başarılı',
            text: 'İlgili ürün favorilere eklenmiştir',
            icon: 'success',
          });
        }
      } else {
        Swal.fire('Başarsız', 'İlgili ürün favorilere eklenemedi', 'warning');
      }
    },
    removeToFav: (state, action) => {
      let { id } = action.payload;
      state.favorites = state.favorites.filter((item) => item.id !== parseInt(id));
    },
    clearFav: (state) => {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload; // API'den gelen verileri state'e kaydet
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.single = action.payload; // Tek bir ürünün detaylarını state'e kaydet
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

const productsReducer = productsSlice.reducer;
export const {
  AddToCart,
  updateCart,
  removeCart,
  clearCart,
  addToFavorites,
  removeToFav,
  clearFav,
} = productsSlice.actions;
export default productsReducer;
