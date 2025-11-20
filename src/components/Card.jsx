import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

export default function Card({ ...product }) {
  const dispatch = useDispatch();
  const handleAddItem = () => {
    dispatch(addItem(product));
  };

  return (
    <div className="card xl:card-xl lg:card-lg md:card-md sm:card-sm bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="card bg-base-100 shadow-sm rounded-lg hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer">
        <figure className="w-full">
          <img
            className="w-full h-48 object-cover"
            src={product.image_url ?? "https://placehold.co/500x300"}
            alt={product.name}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {product.name}
            {product.featured && (
              <span className="badge badge-secondary">New!</span>
            )}
          </h2>
          <p>{product.description}</p>
          <div className="card-actions justify-end items-center">
            <span className="font-bold text-2xl">{product.price}€</span>
            <button className="btn btn-primary" onClick={handleAddItem}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
