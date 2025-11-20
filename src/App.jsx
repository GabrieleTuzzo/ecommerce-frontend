import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// Layout components
import Loader from "./layout/Loader";
import Header from "./layout/Header/Header";
import Error from "./layout/Error";

function App() {
  const isErrorVisible = useSelector((state) => state.errorHandler.isVisible);
  const isLoading = useSelector((state) => state.loader.isLoading);

  return (
    <>
      <Header />
      <main className="container bg-base-100 h-full mx-auto mt-20 px-4">
        {isLoading ? <Loader /> : <Outlet />}
      </main>
      {isErrorVisible && <Error />}
    </>
  );
}

export default App;
