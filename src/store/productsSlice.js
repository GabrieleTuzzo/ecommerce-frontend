import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { showLoader, hideLoader } from "./loaderSlice";
import { setError } from "./errorHandlerSlice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const productsSlice = createSlice({
  name: "products",
  initialState: { productsArray: null },
  reducers: {
    setProducts(state, action) {
      state.productsArray = action.payload;
    },
  },
});

export const fetchProducts = () => async (dispatch) => {
  dispatch(showLoader());
  try {
    const response = await axios.get(`${BACKEND_URL}/products`);
    dispatch(setProducts(response.data));
    console.log("Fetched products:", response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
    dispatch(
      setError({
        name: error.name,
        status: error.status,
        code: error.code,
        message: error.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
