import Header from "./layout/header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="container mx-auto mt-4 px-4">
        <Outlet />
      </main>
    </>
  );
}

export default App;
