import { useEffect, useState } from "react";
import { Sitebar } from "../../layouts";
import "./users.css";
import { AiFillEye } from "react-icons/ai";
import { BiEdit, BiTrash } from "react-icons/bi";
import { axiosInstance } from "../../shared/services/axios";
import { Loader } from "../../components";
import { Link, useNavigate } from "react-router-dom";

export const Users = () => {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const fetchData = () => {
    axiosInstance
      .get("/users")
      .then(({ data }) => {
        setUsersData(data.data);
        setLoading(false);
      })
      .catch(handleError);
  };

  const handleError = (err) => {
    if (
      err.response &&
      err.response.data.error === "This user is not allowed this right!"
    ) {
      navigate("/");
    }
  };

  const handleRemoveUser = (id) => {
    axiosInstance
      .delete(`/users/${id}`)
      .then(() => {
        // Remove the deleted user from the state
        setUsersData((prevUsersData) =>
          prevUsersData.filter((user) => user.id !== id)
        );
      })
      .catch(handleError)
      .finally(() => {
        // Refetch data after removal
        fetchData();
      });
  };
  return (
    <div className="Users__dashboard">
      <Sitebar />
      <div className="Users">
        <div className="Users__header">
          <h1 className="Users__header__title">All Users</h1>
        </div>
        <div className="Users__options"></div>
        <div className="Users__list">
          <div className="Users__row">
            <p className="Users__text Users__firstname">
              <b>First Name</b>
            </p>
            <p className="Users__text Users__lastname">
              <b>Last Name</b>
            </p>
            <p className="Users__text Users__role">
              <b>Role</b>
            </p>
            <p className="Users__text Users__age">
              <b>Age</b>
            </p>
            <p className="Users__text Users__username">
              <b>Username</b>
            </p>
          </div>
          {loading ? (
            <Loader />
          ) : (
            usersData.map((user) => (
              <div className="Users__row" key={user.id}>
                <p className="Users__text Users__firstname">
                  {user.first_name}
                </p>
                <p className="Users__text Users__lastname">{user.last_name}</p>
                <p className="Users__text Users__role">{user.role}</p>
                <p className="Users__text Users__age">{user.age}</p>
                <p className="Users__text Users__username">@{user.username}</p>
                <div className="Users__option">
                  <Link to={`/profile/${user.id}`}>
                    <AiFillEye className="Users__icons Users__view" />
                  </Link>
                  <BiEdit className="Users__icons Users__edit" />
                  <BiTrash
                    className="Users__icons Users__delete"
                    onClick={() => handleRemoveUser(user.id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
