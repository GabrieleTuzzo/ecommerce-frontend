import axios from "axios";
import { showLoader, hideLoader } from "../loaderSlice";
import { setError } from "../errorHandlerSlice";
import { setProducts } from "./productsSlice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

export const fetchProductById = (id) => async (dispatch) => {
  dispatch(showLoader());
  try {
    const response = await axios.get(`${BACKEND_URL}/products/${id}`);
    return response.data;
  } catch (error) {
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

export const postProduct = (product) => async (dispatch) => {
  dispatch(showLoader());
  try {
    const response = await axios.post(`${BACKEND_URL}/products`, product);
    return response.data;
  } catch (error) {
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
