import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: { productsArray: null },
  reducers: {
    setProducts(state, action) {
      state.productsArray = action.payload;
    },
    addProduct(state, action) {
      state.productsArray.push(action.payload);
    },
    removeProduct(state, action) {
      state.productsArray = state.productsArray.filter(
        (p) => p.id !== action.payload
      );
    },
  },
});

export const { setProducts, addProduct, removeProduct } = productsSlice.actions;

export default productsSlice.reducer;
