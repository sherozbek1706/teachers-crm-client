import { Link } from "react-router-dom";
import "./not-found.css";
export const NotFound = () => {
  return (
    <div className="NotFound">
      <h1 className="number">404</h1>
      <h1 className="title">Not Found</h1>
      <Link to="/profile">
        <button className="return">Profile</button>
      </Link>
    </div>
  );
};
