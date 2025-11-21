import { useState } from "react";
// Tables Imports
import ProductsTable from "../components/ProductsTable.jsx";
import UsersTable from "../components/UsersTable.jsx";

export default function Dashboard() {
  const [tableView, setTableView] = useState({
    states: ["products", "users"],
    active: "products",
  });

  const tableComponents = {
    products: <ProductsTable />,
    users: <UsersTable />,
  };

  const switchTableView = (newState) => {
    setTableView((prev) => ({
      ...prev,
      active: newState,
    }));
  };

  return (
    <>
      <div className="h-full overflow-x-auto w-full">
        <div className="flex gap-2">
          {tableView.states.map((state, i) => (
            <button
              key={i}
              onClick={() => switchTableView(state)}
              className="btn btn-primary btn-mb"
            >
              {state}
            </button>
          ))}
        </div>
        {tableComponents[tableView.active] || <p>No table available</p>}
      </div>
    </>
  );
}
