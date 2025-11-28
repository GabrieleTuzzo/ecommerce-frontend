import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../store/errorHandlerSlice";
import { postOrder } from "../store/user/userActions";

export default function OrderForm() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const initialFields = {
    shipping_address: "",
    shipping_city: "",
    shipping_postal_code: "",
    shipping_state: "",
    shipping_country: "Italy",
    notes: "",
    discount_code: "",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    // Grab all values from the form
    const formData = new FormData(formRef.current);
    const payload = Object.fromEntries(formData.entries());

    if (cartItems?.length === 0) {
      dispatch(
        setError({
          name: "Empty Cart",
          message: "Can't order an empty Cart!",
        })
      );
      return;
    }

    const updatedCartItems = cartItems.map(({ id, name, price, ...rest }) => ({
      product_id: id,
      ...rest,
    }));

    const paymentData = await dispatch(
      postOrder({
        items: updatedCartItems,
        ...payload,
      })
    );

    console.log(paymentData);
    if (paymentData) window.location.href = `${paymentData.checkout_url}`;
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Order Section</h1>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-4 max-w-lg mx-auto p-6 bg-base-200 rounded-lg shadow"
      >
        {/* Shipping Address */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Shipping Address</span>
          </label>
          <input
            type="text"
            name="shipping_address"
            defaultValue={initialFields.shipping_address}
            placeholder="Enter your address"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* City */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">City</span>
          </label>
          <input
            type="text"
            name="shipping_city"
            defaultValue={initialFields.shipping_city}
            placeholder="Enter your city"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Postal Code */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Postal Code</span>
          </label>
          <input
            type="text"
            name="shipping_postal_code"
            defaultValue={initialFields.shipping_postal_code}
            placeholder="Enter postal code"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* State */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">State</span>
          </label>
          <input
            type="text"
            name="shipping_state"
            defaultValue={initialFields.shipping_state}
            placeholder="Enter state"
            className="input input-bordered w-full"
          />
        </div>

        {/* Country */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Country</span>
          </label>
          <input
            type="text"
            name="shipping_country"
            defaultValue={initialFields.shipping_country}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        {/* Notes */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Notes</span>
          </label>
          <textarea
            name="notes"
            defaultValue={initialFields.notes}
            placeholder="Additional notes"
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* Discount Code */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Discount Code</span>
          </label>
          <input
            type="text"
            name="discount_code"
            defaultValue={initialFields.discount_code}
            placeholder="Enter discount code"
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary w-full">
            Order Now!
          </button>
        </div>
      </form>
    </>
  );
}
