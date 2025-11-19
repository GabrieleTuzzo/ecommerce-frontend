import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice.js";
import cartSlice from "./cartSlice.js";

const store = configureStore({
  reducer: {
    // Add your reducers here
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;