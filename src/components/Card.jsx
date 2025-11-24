import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Card({ ...product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddItem = (e) => {
    e.stopPropagation();
    dispatch(addItem(cleanItem(product)));
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      role="button"
      className="card hover:cursor-pointer xl:card-xl lg:card-lg md:card-md sm:card-sm bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
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
  );
}

const cleanItem = (item) => ({
  id: item.id,
  name: item.name,
  price: item.price,
  quantity: 1,
});
