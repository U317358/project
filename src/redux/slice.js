
import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    filteredItems: [],
    filter: '',
    itemDetails: null, 
    detailsStatus: 'idle',
    detailsError: null,
    cart: []
  },


  reducers: {
    fetchDataStart(state) {
      state.status = 'loading';
    },
    fetchDataSuccess(state, action) {
      state.status = 'succeeded';
      state.items = action.payload;
    },
    fetchDataFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },

    setFilter(state, action) {
        state.filter = action.payload;
        state.filteredItems = state.items.filter(item =>
          item.name.toLowerCase().includes(action.payload.toLowerCase())
        );
      },
      fetchItemDetailsStart(state) {
        state.detailsStatus = 'loading';
      },
      fetchItemDetailsSuccess(state, action) {
        state.detailsStatus = 'succeeded';
        state.itemDetails = action.payload;
      },
      fetchItemDetailsFailure(state, action) {
        state.detailsStatus = 'failed';
        state.detailsError = action.payload;
      },
      clearItemDetails(state) {
        state.itemDetails = null;
        state.detailsStatus = 'idle';
        state.detailsError = null;
      },
      addtocart(state, action) {
        const item = action.payload;
        const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
          existingItem.quantity += 1; // Increase quantity if item already in cart
        } else {
          state.cart.push({ ...item, quantity: 1 }); // Add new item to cart with quantity 1
        }
      },
      removeItemFromCart(state, { payload }) {
        state.cart = state.cart.filter(item => item.id !== payload);
      },
      clearCart(state) {
        state.cart = [];
      },
    },
  });

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure, setFilter, fetchItemDetailsStart,fetchItemDetailsSuccess,fetchItemDetailsFailure,  clearItemDetails ,addtocart,
  removeItemFromCart,
  clearCart,} = dataSlice.actions;

export default dataSlice.reducer;
