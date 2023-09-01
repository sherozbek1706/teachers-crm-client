import "./login.css";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../shared/services/axios";
import { successNot, errorNot } from "../../shared/toastfy";
import { ToastContainer } from "react-toastify";
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
        successNot("Siz login qildingiz!");
        navigate("/");
      })
      .catch((err) => {
        errorNot(err.response.data.error);
      });
  };

  return (
    <div className="Login">
      <form className="Login__form" onSubmit={handleLoginUser}>
        <h1 className="Login__header">Login</h1>
        <input
          type="text"
          id="username"
          className="Login__input"
          placeholder="Login"
          required
        />
        <input
          type="password"
          id="password"
          className="Login__input"
          placeholder="Password"
          required
        />
        <input type="submit" className="Login__submit" value={"Login"} />
      </form>
    </div>
  );
};
