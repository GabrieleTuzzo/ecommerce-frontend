import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/user/userSlice";

export default function HeaderUser() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isAuthorized);
  const role = useSelector((state) => state.user.user?.role);
  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu 2xl:menu-xl lg:menu-lg md:menu-md sm:menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        <li>
          {role === "admin" && <Link to={"/user/dashboard"}>Dashboard</Link>}
        </li>
        <li>
          {isLoggedIn ? (
            <button onClick={handleLogOut}>Log out</button>
          ) : (
            <Link to={"/auth/login"}>Log in</Link>
          )}
        </li>
      </ul>
    </div>
  );
}
