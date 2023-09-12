import { useNavigate } from "react-router-dom";
import { HandleFetchError } from "../../shared/errors/clear-account";
import { axiosInstance } from "../../shared/services/axios";
import { successNot } from "../../shared/toastfy";
import "./login.css";
export const Login = () => {
  const navigate = useNavigate();
  const handleLoginUser = (e) => {
    e.preventDefault();

    const {
      username: { value: username },
      password: { value: password },
    } = e.target.elements;

    const loggedUser = {
      username,
      password,
    };

    axiosInstance
      .post("/users/login", loggedUser)
      .then((data) => {
        localStorage.setItem("token", data.data.data.token);
        setTimeout(() => {
          window.location.assign("/profile");
        }, 1200);
        successNot("Siz login qildingiz!");
      })
      .catch((err) => {
        HandleFetchError(err);
      });
  };

  return (
    <div className="login__page container flex">
      <div className="facebook-page flex">
        <div className="text">
          <h1>NAJOT FINAL</h1>
          <p>Tizimga kiring va qoidalardan o'z</p>
          <p>vaqtida xabardor bo'ling!</p>
        </div>
        <form onSubmit={handleLoginUser}>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
          />
          <div className="link">
            <button type="submit" className="login">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
