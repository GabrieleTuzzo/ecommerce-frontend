import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef, createRef } from "react";
import { fetchProducts } from "../store/products/productsActions.js";
import { postProduct } from "../store/products/productsActions.js";

export default function Dashboard() {
  const productsArray = useSelector((state) => state.products.productsArray);
  const dispatch = useDispatch();
  const [isAddItemVisible, setIsAddItemVisible] = useState(false);

  const initialFields = {
    name: "name",
    description: null,
    price: 0,
    available_quantity: 0,
    image_url: null,
    sku: null,
    active: false,
    featured: false,
  };

  const refs = useRef({});

  useEffect(() => {
    Object.keys(initialFields).forEach((key) => {
      if (!refs.current[key]) refs.current[key] = createRef();
    });
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const headers =
    productsArray && productsArray.length > 0
      ? Object.keys(productsArray[0])
      : [];

  useEffect(() => {
    headers.forEach((h) => {
      if (!refs.current[h]) {
        refs.current[h] = createRef();
      }
    });
  }, []);

  const handleSendItem = () => {
    const item = Object.keys(initialFields).reduce((acc, key) => {
      // console.log(refs.current[key].current.type);

      switch (refs.current[key].current.type) {
        case "text":
          if (refs.current[key].current.value === "") {
            acc[key] = initialFields[key];
          } else {
            acc[key] = refs.current[key]?.current?.value ?? initialFields[key]; // fallback to default
          }
          return acc;
        case "checkbox":
          acc[key] = refs.current[key].current.checked ?? initialFields[key];
          return acc;
      }
    }, {});

    console.log(item);
    dispatch(postProduct(item));
  };

  if (!productsArray || productsArray.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <>
      <div className="flex gap-4">
        <button
          onClick={() => handleSendItem()}
          className={`btn btn-primary btn-md ${
            !isAddItemVisible ? `btn-disabled` : `btn-active`
          }`}
        >
          Send Item
        </button>
        <button
          onClick={() => setIsAddItemVisible((prev) => !prev)}
          className="btn btn-secondary btn-md"
        >
          Add Item
        </button>
      </div>
      <div className="h-full overflow-x-auto w-full">
        <table className="table table-zebra lg:table-md md:table-md sm:table-sm table-pin-rows">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th className="text-center" key={i}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isAddItemVisible && (
              <tr>
                {Object.keys(initialFields).map((key) => (
                  <td className="text-center" key={key}>
                    {typeof initialFields[key] === "boolean" ? (
                      <input
                        ref={refs.current[key]}
                        type="checkbox"
                        className="checkbox"
                      />
                    ) : (
                      <input
                        ref={refs.current[key]}
                        type="text"
                        className="input input-sm w-fit-full"
                        placeholder={`${initialFields[key]}`} // <-- default value
                      />
                    )}
                  </td>
                ))}
              </tr>
            )}
            {productsArray.map((product, i) => (
              <tr key={product.id ?? i}>
                {headers.map((h, i) => (
                  <td className="text-center text-nowrap" key={i}>
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
    </>
  );
}
