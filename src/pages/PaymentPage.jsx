import Payment from "../components/Payment";
import { useLocation } from "react-router-dom";

export default function PaymentPage() {
  const location = useLocation();
  const pathname = location.pathname;

  const isSuccess = pathname.includes("success");

  return (
    <div className="flex justify-center">
      <div className="card w-96 bg-base-100 card-md shadow-sm">
        <div className="card-body">
          <Payment success={isSuccess} />
        </div>
      </div>
    </div>
  );
}
