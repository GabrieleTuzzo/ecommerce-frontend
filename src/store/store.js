import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/productsSlice.js";
import cartReducer from "./cartSlice.js";
import errorHandlerReducer from "./errorHandlerSlice.js";
import loaderReducer from "./loaderSlice.js";

const store = configureStore({
  reducer: {
    // Add your reducers here
    products: productsReducer,
    cart: cartReducer,
    errorHandler: errorHandlerReducer,
    loader: loaderReducer,
  },
});

export default store;
