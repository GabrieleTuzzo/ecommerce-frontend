import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../store/productsSlice";
// Components import
import Card from "../components/Card.jsx";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Home() {
  const dispatch = useDispatch();
  const productsArray = useSelector((state) => state.products);
  console.log("Products from Redux store:", productsArray);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/prodotti`)
      .then((response) => {
        dispatch(setProducts(response.data));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [dispatch]);

  return (
    <section>
      <h1 className="text-3xl font-bold">Home Page</h1>
      {productsArray.products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {productsArray.products.map((product) => (
            <Card key={product.id} {...product} />
          ))}
        </div>
      )}
    </section>
  );
}
