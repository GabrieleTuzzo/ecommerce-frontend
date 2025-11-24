import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";
import CartCard from "../../components/CartCard";

export default function HeaderCart() {
  const cartItemCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + (item.quantity ?? 1), 0)
  );

  const cartTotal = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  const handleEmptyCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>

          {cartItemCount > 0 && (
            <span className="badge badge-secondary badge-sm indicator-item">
              {cartItemCount}
            </span>
          )}
        </div>
      </div>
      <div
        tabIndex={0}
        className="card dropdown-content bg-base-100 z-1 mt-3 min-w-max shadow"
      >
        <div className="card-body">
          <CartCard />
          <span className="text-info">Subtotal: {cartTotal.toFixed(2)}€</span>
          <div className="card-actions flex-row align-center justify-between">
            <button className="btn btn-primary btn-block">View cart</button>
            <button
              className="btn btn-secondary btn-block"
              onClick={handleEmptyCart}
            >
              Empty cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
