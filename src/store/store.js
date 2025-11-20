import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice.js";
import cartSlice from "./cartSlice.js";
import errorHandlerSlice from "./errorHandlerSlice.js";

const store = configureStore({
  reducer: {
    // Add your reducers here
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    errorHandler: errorHandlerSlice.reducer,
  },
});

export default store;