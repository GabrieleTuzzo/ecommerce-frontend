import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { confirmOrder } from "../store/user/userActions";

export default function Payment({ success }) {
  // session_id=cs_test_a1tZJlQ0XatKQ2IcGU3TnTHVOwRrRKONMgoSpVH2Gfeq8alX3p0QC4gCCh&order_id=21
  const [searchParams] = useSearchParams();

  const token = useSelector((state) => state.user.token);
  const session_id = searchParams.get("session_id");
  const order_id = searchParams.get("order_id");

  const dispatch = useDispatch();

  useEffect(() => {
    async function confOrder() {
      await dispatch(confirmOrder(token, session_id, order_id));
    }
    // console.log(session_id, order_id);
    if (session_id && order_id && token) {
      confOrder();
    }
  }, [token]);

  return (
    <>
      {success ? (
        <>
          <h2 className="card-title">Payment is successful</h2>
          <p>Your payment has been processed successfully</p>
          <Link className="text-secondary underline" to={"/"}>
            Return to Home
          </Link>
        </>
      ) : (
        <>
          <h2 className="card-title">Payment is cancelled</h2>
          <p>Your payment has been cancelled</p>
          <Link className="text-secondary underline" to={"/"}>
            Return to Home
          </Link>
        </>
      )}
    </>
  );
}
