import { Link } from "react-router-dom";
import "./user-row.css";
import { AiFillEye } from "react-icons/ai";
import { BiEdit, BiTrash } from "react-icons/bi";
import { axiosInstance } from "../../shared/services/axios";
import { HandleFetchError } from "../../shared/errors/clear-account";
import { Fragment } from "react";
export const UserRow = ({ data }) => {
  const handleRemoveUser = (id) => {
    axiosInstance.delete(`/users/${id}`).catch((err) => {
      HandleFetchError(err);
    });
  };

  return (
    <Fragment>
      {data.map((user) => (
        <div className="Users__row" key={user.id}>
          <p className="Users__text Users__firstname">{user.first_name}</p>
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
      ))}
    </Fragment>
  );
};