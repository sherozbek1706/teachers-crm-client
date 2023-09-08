import { successNot } from "../../shared/toastfy";
import "./sitebar.css";
import { Link, useLocation } from "react-router-dom";
export const Sitebar = ({ data = localStorage.getItem("role") }) => {
  const { pathname: location } = useLocation();
  console.log(location);
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
        <Link
          to="/profile"
          className={`Sitebar__btn  ${
            location == "/profile" ? "active__tab" : null
          }`}
        >
          Profile
        </Link>
        {data == "admin" ? (
          <>
            <Link
              to="/users"
              className={`Sitebar__btn  ${
                location == "/users" ? "active__tab" : null
              }`}
            >
              Users
            </Link>
          </>
        ) : null}
        <Link
          to="/guides"
          className={`Sitebar__btn  ${
            location == "/guides" ? "active__tab" : null
          }`}
        >
          Guides
        </Link>
        <Link
          to="myguides"
          className={`Sitebar__btn  ${
            location == "/myguides" ? "active__tab" : null
          }`}
        >
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
