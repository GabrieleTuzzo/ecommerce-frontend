import { useState } from "react";
import { postLogin } from "../store/user/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleEmailInput = (e) => {
    setUserData((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const handlePasswordInput = (e) => {
    setUserData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const handleLogin = () => {
    dispatch(postLogin(userData, navigate));
  };

  // Validation rules
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email);
  const isPasswordValid = userData.password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  return (
    <div className="flex justify-center">
      <div className="card card-border bg-base-100 w-100">
        <div className="card-body gap-5">
          <h2 className="card-title text-2xl">Log in</h2>
          <input
            className={`input ${
              touched.email
                ? isEmailValid
                  ? "input-success"
                  : "input-error"
                : ""
            }`}
            type="email"
            required
            placeholder="mail@site.com"
            value={userData.email}
            onChange={handleEmailInput}
            onBlur={() => handleBlur("email")}
          />
          <div>
            <input
              type="password"
              className={`input ${
                touched.password
                  ? isPasswordValid
                    ? "input-success"
                    : "input-error"
                  : ""
              }`}
              required
              placeholder="Password"
              minLength="6"
              pattern="^.{6,}$"
              title="Must be at least 6 characters"
              value={userData.password}
              onChange={handlePasswordInput}
              onBlur={() => handleBlur("password")}
            />
            <p className="invisible">Must be at least 6 characters</p>
          </div>
          <div className="card-actions justify-end">
            <button
              onClick={handleLogin}
              className="btn btn-primary"
              disabled={!isFormValid}
            >
              Log-in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
