import { useDispatch } from "react-redux";
import { addItem, removeItem, removeAllItem } from "../store/cartSlice";

export default function CartCard({ fullSize = false, ...item }) {
  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = () => {
    dispatch(removeItem(item));
  };

  const handleRemoveAllItem = () => {
    dispatch(removeAllItem(item));
  };

  if (fullSize) {
    return (
      <div className="card card-lg bg-base-100">
        <div className="card-body">
          <div className="card-title flex justify-between">
            <h2>{item.name}</h2>
            {item.quantity > 1 && (
              <div className="text-center">x{item.quantity}</div>
            )}
          </div>
          <div className="card-actions justify-between items-center">
            <p className="font-semibold text-xl">{item.price}€</p>

            <div className="gap-1 flex">
              <button
                onClick={handleRemoveAllItem}
                className="btn btn-secondary"
              >
                Remove All
              </button>
              <button onClick={handleRemoveItem} className="btn btn-secondary">
                -
              </button>
              <button onClick={handleAddItem} className="btn btn-secondary">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card card-xs bg-base-100">
      <div className="card-body">
        <div className="card-title flex justify-between">
          <h2>{item.name}</h2>
          {item.quantity > 1 && (
            <div className="text-center">x{item.quantity}</div>
          )}
        </div>
        <div className="card-actions items-center">
          <button
            onClick={handleRemoveAllItem}
            className="btn btn-sm btn-secondary flex1"
          >
            Remove All
          </button>
          <button
            onClick={handleRemoveItem}
            className="btn btn-sm btn-secondary flex-1"
          >
            -
          </button>
          <button
            onClick={handleAddItem}
            className="btn btn-sm btn-secondary flex-1"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
