import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchProducts } from "../store/products/productsActions.js";
import { resetProducts } from "../store/products/productsSlice.js";
// Components import
import Carousel from "../components/Carousel.jsx";
import Card from "../components/Card.jsx";

export default function Home() {
  const productsArray = useSelector((state) => state.products.productsArray);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    return () => dispatch(resetProducts());
  }, []);

  const newProductsArray = useMemo(
    () => productsArray?.filter((p) => p?.featured === true),
    [productsArray]
  );

  return (
    <>
      <section className="mb-5">
        <h1 className="text-3xl font-bold mb-5">Checkout our New Arrivals!</h1>
        <Carousel products={newProductsArray} />
      </section>
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
    </>
  );
}
