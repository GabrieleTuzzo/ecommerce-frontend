import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { fetchProductById } from "../store/products/productsActions.js";

export default function Detail() {
  const productId = useParams().id;
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const loadProduct = async () => {
      const product = await dispatch(fetchProductById(productId));
      console.log("Fetched product:", product);
      setProduct(product);
    };
    loadProduct();
  }, [productId]);

  return <Card {...product} />;
}
