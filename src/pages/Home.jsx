import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../store/productsSlice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/prodotti`)
      .then((response) => {
        dispatch(setProducts(response.data));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return <h1>Home Page</h1>;
}
