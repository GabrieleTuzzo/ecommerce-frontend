import { useState } from "react";
import { postLogin } from "../store/user/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    const responseMessage = await dispatch(postLogin(userData, navigate));
    setMessage(responseMessage);
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
          <form
            onKeyDown={handleKeyDown}
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <input
              className={`input mb-2 ${
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
              {message && <p className="text-error">{message}</p>}
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" disabled={!isFormValid}>
                Log-in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
