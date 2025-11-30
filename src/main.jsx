import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { decodeToken } from "./util/decodeToken.js";
// Pages import
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Detail from "./pages/Detail.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";

async function authMiddleware({ next }) {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("redirecting...");
    throw redirect("/");
  }
  return next;
}

async function authAdminMiddleware({ next }) {
  const token = localStorage.getItem("token");
  const decoded = decodeToken(token);
  if (decoded?.role !== "admin") {
    throw redirect("/");
  }
  return next;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "user",
        middleware: [authMiddleware],
        children: [
          {
            path: "profile",
            element: <h1>Profile</h1>,
          },
          {
            path: "payment-success",
            element: <PaymentPage />,
          },
          {
            path: "payment-cancel",
            element: <PaymentPage />,
          },
          {
            path: "dashboard",
            middleware: [authAdminMiddleware],
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "product/:id",
        element: <Detail />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "auth",
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
