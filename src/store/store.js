import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice.js";

const store = configureStore({
  reducer: {
    // Add your reducers here
    products: productsSlice.reducer,
  },
});

export default store;