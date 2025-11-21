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
  },
});

export const { setProducts, addProduct } = productsSlice.actions;

export default productsSlice.reducer;
