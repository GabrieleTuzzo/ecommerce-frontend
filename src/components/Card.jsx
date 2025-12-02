import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Card({ detail, ...product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddItem = (e) => {
    e.stopPropagation();
    dispatch(addItem(cleanItem(product)));
  };

  const navigateDetail = () => navigate(`/product/${product.id}`);

  return (
    <div
      onClick={() => !detail && navigateDetail()}
      role="button"
      className={`card ${
        !detail && `hover:cursor-pointer`
      } card-sm card-side max-h-60 bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300`}
    >
      <figure>
        <img
          className="w-full h-full object-cover"
          src={product.image_url ?? "https://placehold.co/800x800"}
          alt={product.name}
        />
      </figure>
      <div className="card-body relative">
        {product.featured && (
          <span className="badge badge-secondary badge-sm absolute top-0.5 right-1">
            New!
          </span>
        )}
        <h2 className="card-title ">{product.name}</h2>

        <p>{product.description}</p>
        <div className="card-actions justify-end items-center">
          <span className="font-bold text-xl">{product.price}€</span>
          <button className="btn btn-primary btn-sm" onClick={handleAddItem}>
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
