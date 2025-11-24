import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";
import CartCard from "../components/CartCard";

export default function Cart() {
  const cartArray = useSelector((state) => state.cart.items);
  const cartTotal = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <div>
          <h1 className="text-3xl font-bold mb-5">My Cart</h1>
          <button
            onClick={() => dispatch(clearCart())}
            className="btn btn-primary"
          >
            Empty Cart
          </button>
        </div>
        <div className="overflow-x-auto">
          {cartArray.map((item, i) => (
            <CartCard key={i} fullSize={true} {...item} />
          ))}
        </div>
        <div className="flex justify-between text-xl">
          <span className="font-semibold">Subtotal:</span>
          <span>{cartTotal.toFixed(2)}€</span>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-5">Order section</h1>
        <button className="btn btn-primary">Order Now!</button>
      </div>
    </div>
  );
}
