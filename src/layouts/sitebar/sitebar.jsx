import { successNot } from "../../shared/toastfy";
import "./sitebar.css";
import { Link } from "react-router-dom";
export const Sitebar = ({ data = localStorage.getItem("role") }) => {
  const handleLogOut = () => {
    localStorage.clear();
    successNot("Siz Log Out qildingiz!");
    setTimeout(() => {
      window.location.assign("/profile");
    }, 1200);
  };
  return (
    <div className="Sitebar">
      <h1 className="Sitebar__title">Najot Final</h1>

      <div className="Sitebar__btns">
        <Link to="/profile" className="Sitebar__btn">
          Profile
        </Link>
        {data == "admin" ? (
          <>
            <Link to="/users" className="Sitebar__btn">
              Users
            </Link>
          </>
      </div>

      <div className="Sitebar__btns Sitebar__logout">
        <button className="Sitebar__btn" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </div>
  );
};
