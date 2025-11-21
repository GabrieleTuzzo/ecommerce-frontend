import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../store/products/productsActions.js";

export default function Dashboard() {
  const productsArray = useSelector((state) => state.products.productsArray);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (!productsArray || productsArray.length === 0) {
    return <p>No products available</p>;
  }

  const headers = Object.keys(productsArray[0]);

  return (
    <div className="h-full overflow-x-auto w-full">
      <table className="table table-zebra lg:table-md md:table-md sm:table-sm table-pin-rows">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productsArray.map((product, i) => (
            <tr key={product.id ?? i}>
              {headers.map((h) => (
                <td key={h}>
                  {product[h] !== undefined && product[h] !== null
                    ? String(product[h])
                    : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
