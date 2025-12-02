import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginStorage } from "./store/user/userSlice.js";
// Layout components
import Loader from "./layout/Loader";
import Header from "./layout/Header/Header";
import Error from "./layout/Error";
import { checkToken } from "./store/user/userActions.js";

function App() {
  const isErrorVisible = useSelector((state) => state.errorHandler.isVisible);
  const isLoading = useSelector((state) => state.loader.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      (async () => {
        await dispatch(
          checkToken(token, navigate, () => {
            dispatch(loginStorage(token));
          })
        );
      })();
    }
  }, []);

  return (
    <>
      <Header />
      <main className="container bg-base-100 h-full mx-auto mt-20 mb-10 px-4 [&>*:not(:last-child)]:mb-5">
        {isLoading && <Loader />}
        <Outlet />
      </main>
      {isErrorVisible && <Error />}
    </>
  );
}

export default App;
