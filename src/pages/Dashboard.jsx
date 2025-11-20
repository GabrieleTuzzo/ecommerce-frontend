import { useSelector } from "react-redux";

export default function Dashboard() {
  const productsArray = useSelector((state) => state.products.productsArray);

  if (!productsArray || productsArray.length === 0) {
    return <p>No products available</p>;
  }

  const headers = Object.keys(productsArray[0]);

  return (
    <div className="h-96 overflow-x-auto">
      <table className="table table-pin-rows bg-base-200">
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
