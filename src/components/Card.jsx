import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

export default function Card({ ...product }) {
  const dispatch = useDispatch();
  const handleAddItem = () => {
    dispatch(addItem(product));
  };

  return (
    <div className="card">
      <div className="card bg-base-100 shadow-sm rounded-lg hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer">
        <figure>
          <img src={product.image} alt={product.nome} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {product.nome}
            {product.in_evidenza && (
              <span className="badge badge-secondary">New!</span>
            )}
          </h2>
          <p>{product.descrizione}</p>
          <div className="card-actions justify-end items-center">
            <span className="font-bold text-2xl">{product.prezzo}€</span>
            <button className="btn btn-primary" onClick={handleAddItem}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
