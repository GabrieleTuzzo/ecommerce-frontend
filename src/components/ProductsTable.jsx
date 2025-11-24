import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect } from "react";
import {
  postProduct,
  fetchProducts,
  deleteProduct,
} from "../store/products/productsActions";
import Table from "./Table";

export default function ProductsTable() {
  const productsArray = useSelector((state) => state.products.productsArray);
  const refs = useRef({});
  const dispatch = useDispatch();

  const initialFields = {
    name: "name",
    description: "Item description",
    price: 0,
    available_quantity: 0,
    image_url: null,
    sku: null,
    active: true,
    featured: false,
  };

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
    <Table
      initialFields={initialFields}
      itemsArray={productsArray}
      refs={refs}
      handleDelete={handleDelete}
      handleSendItem={handleSendItem}
    />
  );
}
