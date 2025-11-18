import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          E-Commerce
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-3">
          <li>Page 1</li>
          <li>Page 2</li>
          <li>Page 3</li>
        </ul>
      </div>
    </header>
  );
}
