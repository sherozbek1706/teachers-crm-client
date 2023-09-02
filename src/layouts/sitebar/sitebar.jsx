import "./sitebar.css";
import { Link } from "react-router-dom";
export const Sitebar = () => {
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
        <Link to="" className="Sitebar__btn">
          Log Out
        </Link>
      </div>
    </div>
  );
};
