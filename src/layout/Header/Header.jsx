import { Link } from "react-router-dom";
import HeaderUser from "./HeaderUser";
import HeaderCart from "./HeaderCart";

export default function Header() {
  return (
    <header className="navbar glass fixed top-0 z-10 px-4">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          E-Commerce
        </Link>
      </div>
      <div className="flex-none">
        <HeaderCart />
        <HeaderUser />
      </div>
    </header>
  );
}
