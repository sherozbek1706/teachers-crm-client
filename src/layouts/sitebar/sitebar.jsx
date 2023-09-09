import { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../../shared/services/axios";
import { successNot } from "../../shared/toastfy";
import "./sitebar.css";
export const Sitebar = ({ role = localStorage.getItem("role") }) => {
  const { pathname: location } = useLocation();
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axiosInstance.get("/users/me").then(({ data: { data } }) => {
      setData(data);
    });
  };

  const handleLogOut = () => {
    localStorage.clear();
    successNot("Siz Log Out qildingiz!");
    setTimeout(() => {
      window.location.assign("/profile");
    }, 1200);
  };

  return (
    <nav className="sidebar">
      <header>
        <div className="image-text">
          <span className="image">
            <img src="../../../public/avatar.png" alt="" />
          </span>

          <div className="text logo-text">
            <span className="name">{data.first_name}</span>
            <span className="profession">{role}</span>
          </div>
        </div>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li className="nav-link">
              <Link
                to="/profile"
                className={location == "/profile" ? "active__tab" : null}
              >
                <i className="bx bx-user-circle icon"></i>
                <span className="text nav-text">Profile</span>
              </Link>
            </li>

            {role == "admin" ? (
              <Fragment>
                <li className="nav-link">
                  <Link
                    to="/users"
                    className={location == "/users" ? "active__tab" : null}
                  >
                    <i className="bx bx-group icon"></i>
                    <span className="text nav-text">Users</span>
                  </Link>
                </li>
              </Fragment>
            ) : null}

            <li className="nav-link">
              <Link
                to="/notification"
                className={location == "/notification" ? "active__tab" : null}
              >
                <i className="bx bx-bell icon"></i>
                <span className="text nav-text">Notifications</span>
              </Link>
            </li>

            <li className="nav-link">
              <Link
                to="/guides"
                className={location == "/guides" ? "active__tab" : null}
              >
                <i className="bx bx-purchase-tag icon"></i>
                <span className="text nav-text">Guides</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          <li className="" onClick={handleLogOut}>
            <a href="#">
              <i className="bx bx-log-out icon"></i>
              <span className="text nav-text">Logout</span>
            </a>
          </li>
        </div>
      </div>
    </nav>
  );
};
