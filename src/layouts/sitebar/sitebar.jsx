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
        <Link to="" className="Sitebar__btn">
          Profile
        </Link>
        <Link to="" className="Sitebar__btn">
          Users
        </Link>
        <Link to="" className="Sitebar__btn">
          Guides
        </Link>
        <Link to="" className="Sitebar__btn">
          My Guides
        </Link>
      </div>

      <div className="Sitebar__btns Sitebar__logout">
        <button className="Sitebar__btn" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </div>
  );
};
