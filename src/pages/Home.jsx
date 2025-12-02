import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../store/products/productsActions.js";
import { resetProducts } from "../store/products/productsSlice.js";
import { fetchFilteredProducts } from "../store/user/userActions.js";
import { debounce } from "../util/debounce.js";
// Components import
import Carousel from "../components/Carousel.jsx";
import Card from "../components/Card.jsx";

export default function Home() {
  const productsArray = useSelector((state) => state.products.productsArray);
  const dispatch = useDispatch();
  const [filterQuery, setFilterQuery] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
    return () => dispatch(resetProducts());
  }, []);

  const newProductsArray = useMemo(
    () => productsArray?.filter((p) => p?.featured === true),
    [productsArray]
  );

  const handleFilter = (e) => {
    const query = e.target.value;
    setFilterQuery(query);

    if (query.trim() !== "") {
      debouncedFetch(query.trim());
    } else {
      debouncedFetch.cancel?.();
      setFilteredArray([]);
    }
  };

  const debouncedFetch = useMemo(
    () =>
      debounce(async (query) => {
        const res = await dispatch(fetchFilteredProducts(query));
        setFilteredArray(res);
      }, 300),
    []
  );

  return (
    <>
      <section className="mb-5">
        <h1 className="text-3xl font-bold mb-5">Checkout our New Arrivals!</h1>
        <Carousel products={newProductsArray} />
      </section>
      <section>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-5">Our Products</h1>
          <input
            type="text"
            className="input w-60 items-center"
            placeholder="Search..."
            value={filterQuery}
            onChange={handleFilter}
          />
        </div>
        {filterQuery && filteredArray?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArray.map((product) => (
              <Card key={product.id} {...product} />
            ))}
          </div>
        ) : productsArray && productsArray.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsArray.map((product) => (
              <Card key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <p>No Items Found</p>
        )}
      </section>
    </>
  );
}
