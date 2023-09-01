import "./login.css";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
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
