import { useEffect, useState } from "react";
import { Sitebar } from "../sitebar";
import "./profile.css";
import { axiosInstance } from "../../shared/services/axios";
import { Loader } from "../../components";

export const Profile = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    axiosInstance.get("users/me").then((res) => {
      setUserData([res.data.data]);
      localStorage.setItem("role", res.data.data.role);
    });
  }, []);

  if (!userData.length) {
    return <Loader />;
  }
  return (
    <div className="Profile__Dashboard">
      <Sitebar data={userData[0].role} />
      <div className="Profile">
        <div className="Profile__header">
          <h1 className="Profile__header__title">User Profile</h1>
        </div>
        <div className="Profile__infos">
          <div className="Profile__info">
            <p className="Profile__info__shadow">ID</p>
          </div>
          <div className="Profile__info">
            <p className="Profile__info__shadow">FIRST NAME</p>
          </div>
          <div className="Profile__info">
            <p className="Profile__info__shadow">LAST NAME</p>
          </div>
          <div className="Profile__info">
            <p className="Profile__info__shadow">USERNAME</p>
          </div>
          <div className="Profile__info">
            <p className="Profile__info__shadow">AGE</p>
          </div>
          <div className="Profile__info">
            <p className="Profile__info__shadow">ROLE</p>
          </div>
        </div>
      </div>
    </div>
  );
};
