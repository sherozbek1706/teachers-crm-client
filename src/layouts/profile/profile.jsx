import { useEffect, useState } from "react";
import { Sitebar } from "../sitebar";
import "./profile.css";
import { axiosInstance } from "../../shared/services/axios";
import { Loader } from "../../components";
import { useParams } from "react-router-dom";
import { HandleFetchError } from "../../shared/errors/clear-account";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();
  const { id = "me" } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axiosInstance
      .get(`users/${id}`)
      .then((res) => {
        const data = res.data.data;
        setUserData(data);
        if (data.role && id == "me") {
          localStorage.setItem("role", data.role);
        }
      })
      .catch((err) => {
        if (err.response.status == "404") {
          navigate("/");
        }
        HandleFetchError(err);
      });
  }, [id]);

  const { _id, first_name, last_name, username, age, role } = userData;

  return (
    <div className="Profile__Dashboard">
      <Sitebar data={id == "me" ? role : "admin"} />
      <div className="Profile">
        <div className="Profile__header">
          <h1 className="Profile__header__title">User Profile</h1>
        </div>
        {!userData._id ? (
          <Loader />
        ) : (
          <div className="Profile__infos">
            <div className="Profile__info">
              <p className="Profile__info__shadow">ID</p>
              <p className="Profile__info__text">{_id}</p>
            </div>
            <div className="Profile__info">
              <p className="Profile__info__shadow">FIRST NAME</p>
              <p className="Profile__info__text">{first_name}</p>
            </div>
            <div className="Profile__info">
              <p className="Profile__info__shadow">LAST NAME</p>
              <p className="Profile__info__text">{last_name}</p>
            </div>
            <div className="Profile__info">
              <p className="Profile__info__shadow">USERNAME</p>
              <p className="Profile__info__text">{username}</p>
            </div>
            <div className="Profile__info">
              <p className="Profile__info__shadow">AGE</p>
              <p className="Profile__info__text">{age}</p>
            </div>
            <div className="Profile__info">
              <p className="Profile__info__shadow">ROLE</p>
              <p className="Profile__info__text">{role}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
