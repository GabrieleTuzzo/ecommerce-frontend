import Header from "./layout/Header";
import Error from "./layout/Error";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function App() {
  const isErrorVisible = useSelector((state) => state.errorHandler.isVisible);

  return (
    <>
      <Header />
      <main className="container bg-base-100 mx-auto mt-20 px-4">
        <Outlet />
      </main>
      {isErrorVisible && <Error />}
    </>
  );
}

export default App;
