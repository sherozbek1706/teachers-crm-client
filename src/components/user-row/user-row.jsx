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
      {data.map((user, idx) => (
        <tr key={idx}>
          <td>{idx + 1}</td>

          <td>{user.first_name}</td>

          <td>{user.last_name}</td>

          <td>{user.age}</td>

          <td>{user.role}</td>

          <td>@{user.username}</td>
          <td>
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
          </td>
        </tr>
      ))}
    </Fragment>
  );
};
