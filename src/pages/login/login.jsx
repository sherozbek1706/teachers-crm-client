import "./login.css";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="Login">
      <form className="Login__form" onSubmit={handleLoginUser}>
        <h1 className="Login__header">Login</h1>
      </form>
    </div>
  );
};
