import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Sitebar } from "../../layouts";
import { HandleFetchError } from "../../shared/errors/clear-account";
import { axiosInstance } from "../../shared/services/axios";
import jwt_decode from "jwt-decode";
import { errorNot, successNot } from "../../shared/toastfy";
import "./add-user.css";

export const AddUser = () => {
  const [usernameError, setUsernameError] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [age, setAge] = useState(0);
  const [role, setRole] = useState("employee");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { pathname: location } = useLocation();
  let id;
  let userId;
  let params = useParams();
  if (location == "/edit/user/me") {
    let token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    userId = decoded.user.id;
    id = "me";
  } else {
    id = params.id;
  }
  console.log(id);
  const navigate = useNavigate();
  const roleUser = localStorage.getItem("role") == "admin" ? true : false;
  const editAction = id ? true : false;

  useEffect(() => {
    if (editAction) {
      axiosInstance
        .get(`/users/${id}`)
        .then(({ data: { data } }) => {
          setFirst_name(data.first_name);
          setLast_name(data.last_name);
          setAge(data.age);
          setRole(data.role);
          setUsername(data.username);
          setPassword("");
        })
        .catch((err) => {
          if (err.response.status === 404) {
            navigate("/");
          }
          HandleFetchError(err);
        });
    }
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    const usernameValue = e.target.value;
    const startsWithLetter = /^[a-zA-Z]/.test(usernameValue);

    if (!startsWithLetter) {
      setUsernameError("Username faqat harf bilan boshlanishi kerak");
    } else {
      setUsernameError("");
    }
  };

  const handleEditUserFunc = (e) => {
    e.preventDefault();
    let editingUser;
    if (password) {
      editingUser = {
        first_name,
        last_name,
        age,
        role,
        username,
        password,
      };
    } else {
      editingUser = {
        first_name,
        last_name,
        age,
        role,
        username,
      };
    }

    axiosInstance
      .patch(`/users/${id}`, editingUser)
      .then(({ data: { data: data } }) => {
        successNot("User O'zgartirildi!");
        navigate(`/profile/${id}`);
      })
      .catch((err) => {
        HandleFetchError(err);
      });
  };

  const handleAddUserFunc = (e) => {
    e.preventDefault();

    const newUser = {
      first_name,
      last_name,
      age,
      role,
      username,
      password,
    };
    if (usernameError) {
      errorNot(usernameError);
    } else {
      axiosInstance
        .post("/users", newUser)
        .then(({ data: { data } }) => {
          e.target.reset();
          successNot("User qo'shildi!");
          navigate("/users");
        })
        .catch((err) => {
          HandleFetchError(err);
        });
    }
  };

  return (
    <div className="AddUser__dashboard">
      <Sitebar />
      <div className="AddUser">
        <div className="AddUser__header">
          <h1 className="AddUser__header__title">
            {editAction ? (
              <>
                Edit User <span>#{userId ? userId : id}</span>
              </>
            ) : (
              "Add User"
            )}
          </h1>
          <div className="AddUser__header__option">
            <Link to="/users">
              <button className="AddUser__header__back">Back to Users</button>
            </Link>
          </div>
        </div>
        <form
          className="AddUserForm"
          onSubmit={editAction ? handleEditUserFunc : handleAddUserFunc}
        >
          <h1 className="AddUserForm__title">
            {editAction ? "Edit User Form" : "Add User Form"}
          </h1>
          <div className="AddUserForm__place">
            <p className="AddUserForm__holder">First Name</p>
            <input
              type="text"
              placeholder="First Name"
              className="AddUserForm__input"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              id="first_name"
              required
            />
          </div>
          <div className="AddUserForm__place">
            <p className="AddUserForm__holder">Last Name</p>
            <input
              type="text"
              value={last_name}
              placeholder="Last Name"
              className="AddUserForm__input"
              onChange={(e) => setLast_name(e.target.value)}
              id="last_name"
              required
            />
          </div>
          <div className="AddUserForm__place">
            <p className="AddUserForm__holder">Age</p>
            <input
              type="number"
              min={0}
              max={150}
              placeholder="Age"
              className="AddUserForm__input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              id="age"
              required
            />
          </div>
          <div className="AddUserForm__place">
            <p className="AddUserForm__holder">Role</p>
            <select
              className="AddUserForm__select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={!roleUser || (id == "me" ? true : false)}
              id="role"
            >
              <option value="admin">ADMIN</option>
              <option value="employee">EMPLOYEE</option>
            </select>
          </div>
          <div className="AddUserForm__place">
            <p className="AddUserForm__holder">Username</p>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => handleUsernameChange(e)}
              className="AddUserForm__input _textdef"
              value={username}
              id="username"
              required
            />
          </div>
          <div className="AddUserForm__place">
            <p className="AddUserForm__holder">Password</p>
            <input
              type="password"
              placeholder="Password"
              className="AddUserForm__input _textdef"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              disabled={!roleUser}
              required={!editAction}
            />
          </div>
          <button className="AddUserForm__submit">
            {editAction ? "Edit User" : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
};
