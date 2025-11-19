import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        console.log("Products fetched:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return <h1>Home Page</h1>;
}
