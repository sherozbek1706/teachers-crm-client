import { Fragment } from "react";
import { AiFillEye } from "react-icons/ai";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { HandleFetchError } from "../../shared/errors/clear-account";
import { axiosInstance } from "../../shared/services/axios";
import { successNot } from "../../shared/toastfy";
import "./user-row.css";
export const UserRow = ({ data }) => {
  const handleRemoveUser = (id) => {
    axiosInstance
      .delete(`/users/${id}`)
      .then(() => {
        successNot("User o'chirildi!");
      })
      .catch((err) => {
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
            <Link to={`/edit/user/${user.id}`}>
              <BiEdit className="Users__icons Users__edit" />
            </Link>
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
