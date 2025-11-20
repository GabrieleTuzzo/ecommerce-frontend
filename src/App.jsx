import { Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideLoader, showLoader } from "./store/loaderSlice";
import { setProducts } from "./store/productsSlice";
import { setError } from "./store/errorHandlerSlice";
// Layout components
import Loader from "./layout/Loader";
import Header from "./layout/Header/Header";
import Error from "./layout/Error";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const isErrorVisible = useSelector((state) => state.errorHandler.isVisible);
  const isLoading = useSelector((state) => state.loader.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showLoader());

    axios
      .get(`${BACKEND_URL}/products`)
      .then((response) => {
        dispatch(setProducts(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        dispatch(
          setError({
            name: error.name,
            status: error.status,
            code: error.code,
            message: error.message,
          })
        );
      })
      .finally(() => {
        dispatch(hideLoader());
      });
  }, []);

  return (
    <>
      <Header />
      <main className="container bg-base-100 h-full mx-auto mt-20 px-4">
        {isLoading ? <Loader /> : <Outlet />}
      </main>
      {isErrorVisible && <Error />}
    </>
  );
}

export default App;
