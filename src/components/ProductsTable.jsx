import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect, createRef } from "react";
import {
  postProduct,
  fetchProducts,
  deleteProduct,
} from "../store/products/productsActions";

export default function ProductsTable() {
  const productsArray = useSelector((state) => state.products.productsArray);
  const refs = useRef({});
  const dispatch = useDispatch();

  const initialFields = {
    name: "name",
    description: null,
    price: 0,
    available_quantity: 0,
    image_url: null,
    sku: null,
    active: true,
    featured: false,
  };

  useEffect(() => {
    Object.keys(initialFields).forEach((key) => {
      if (!refs.current[key]) refs.current[key] = createRef();
    });
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

  useEffect(() => {
    dispatch(fetchProducts());
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

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  if (!productsArray || productsArray.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <table className="table table-pin-rows table-zebra lg:table-md md:table-md sm:table-sm table-pin-rows">
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th className="text-center" key={i}>
              {h}
            </th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
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
          <td
            className="text-center"
            colSpan={Math.max(
              0,
              headers.length - Object.keys(initialFields).length
            )}
          ></td>
          <td>
            <button
              onClick={() => handleSendItem()}
              className={"btn btn-primary btn-md w-full"}
            >
              Send Item
            </button>
          </td>
        </tr>

        {productsArray.map((product, i) => (
          <tr key={product.id ?? i}>
            {headers.map((h, i) => (
              <td className="text-center text-nowrap" key={i}>
                {product[h] !== undefined && product[h] !== null
                  ? String(product[h])
                  : ""}
              </td>
            ))}

            <td className="gap-1 flex">
              <button className="btn btn-sm btn-primary">Edit</button>
              <button
                onClick={() => handleDelete(product.id)}
                className="btn btn-sm btn-secondary"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
