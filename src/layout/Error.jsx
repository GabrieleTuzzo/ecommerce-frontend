import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearError } from "../store/errorHandlerSlice";

export default function Error() {
  const error = useSelector((state) => state.errorHandler.error);
  const dispatch = useDispatch();

  const handleErrorClick = () => {
    dispatch(clearError());
  };

  return (
    <div
      onClick={handleErrorClick}
      className="hover:cursor-pointer fixed bottom-5 right-5 bg-error text-error-content rounded-lg p-4"
    >
      <h1 className="text-lg font-bold">
        {error.name} {error.status}: {error.code}
      </h1>
      <p>{error.message}</p>
    </div>
  );
}
