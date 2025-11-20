import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
// Components import
import Card from "../components/Card.jsx";

export default function Home() {
  const productsArray = useSelector((state) => state.products.productsArray);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <section>
      <h1 className="text-3xl font-bold mb-5">Our Products</h1>
      {productsArray?.length === 0 || !productsArray ? (
        <p>No Items Found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsArray.map((product) => (
            <Card key={product.id} {...product} />
          ))}
        </div>
      )}
    </section>
  );
}
