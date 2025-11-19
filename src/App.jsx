import Header from "./layout/header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="container bg-base-100 mx-auto mt-20 px-4">
        <Outlet />
      </main>
    </>
  );
}

export default App;
