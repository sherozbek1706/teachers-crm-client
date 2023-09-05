import { useEffect, useState } from "react";
import { Sitebar } from "../../layouts";
import "./users.css";
import { axiosInstance } from "../../shared/services/axios";
import { Loader } from "../../components";
import { useNavigate } from "react-router-dom";
export const Users = () => {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/users")
      .then((res) => {
        setUsersData([res.data.data]);
      })
      .catch((err) => {
        if (err.response.data.error == "This user is not allowed this right!") {
          navigate("/");
        }
      });
  }, []);

  if (!usersData.length) {
    return <Loader />;
  }

  return (
    <div className="Users__dashboard">
      <Sitebar />
      <div className="Users">
        <div className="Users__header">
          <h1 className="Users__header__title">All Users</h1>
        </div>
        <div className="Users__options"></div>
        <div className="Users__list">
          {usersData[0].map((user) => (
            <div className="Users__row"></div>
          ))}
        </div>
      </div>
    </div>
  );
};
