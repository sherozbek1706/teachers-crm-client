import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components";
import { Sitebar } from "../../layouts";
import { HandleFetchError } from "../../shared/errors/clear-account";
import { axiosInstance } from "../../shared/services/axios";
import { successNot } from "../../shared/toastfy";
import "./guide.css";

export const Guide = () => {
  const role = localStorage.getItem("role") == "admin" ? true : false;
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [detect, setDetect] = useState(false);

  const handleChangeSelect = (e, userId) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedUsers((prevUsers) => [...prevUsers, userId]);
    } else {
      setSelectedUsers((prevUsers) =>
        prevUsers.filter((selectedUserId) => selectedUserId !== userId)
      );
    }
  };

  useEffect(() => {
    fetchData();
    if (selectedUsers.length > 0) {
      setDetect(true);
    } else {
      setDetect(false);
    }
  }, [selectedUsers]);

  const fetchData = () => {
    axiosInstance(`/guides/${id}`)
      .then(({ data: { data } }) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          navigate("/");
        }
        HandleFetchError(err);
      });

    if (role) {
      axiosInstance
        .get("/users?page[limit]=5000")
        .then(({ data: { data } }) => {
          setUsers(data);
        })
        .catch((err) => {
          HandleFetchError(err);
        });
    }
  };

  const handleCreateBulk = () => {
    const newBulk = {
      guide_id: id,
      user_ids: selectedUsers,
    };

    axiosInstance
      .post("/user-guides/bulk", newBulk)
      .then(({ data: { data } }) => {
        successNot(`${selectedUsers.length} ta user Ogohlantirildi!`);
      });

    handleActionModal();
    fetchData();
    setSelectedUsers([]);
  };

  const handleActionModal = () => {
    const modal = document.querySelector(".GuideModal");
    modal.classList.toggle("sticky");
  };

  return (
    <div className="Guide__dashboard">
      <Sitebar />

      {/* MODAL:: */}
      {role ? (
        <div className="GuideModal">
          <div className="GuideModal__header">
            <h1 className="GuideModal__title">Guide</h1>
            <i
              className="fa-solid fa-circle-xmark GuideModal__icon"
              onClick={handleActionModal}
            ></i>
          </div>
          <div className="GuideModal__users">
            {users.map((user, idx) => (
              <div className="GuideModalUser" key={idx}>
                <Fragment>
                  <div className="GuideModalUser__info">
                    <h1 className="GuideModalUser__idx">{idx + 1}</h1>
                    <h1 className="GuideModalUser__name">
                      {user.first_name} {user.last_name}
                    </h1>
                  </div>
                </Fragment>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={(e) => handleChangeSelect(e, user.id)}
                  className="GuideModalUser__checkbox"
                />
              </div>
            ))}
          </div>
          <div className="GuideModal__submit">
            <button onClick={handleCreateBulk} disabled={!detect}>
              ADD GUIDE THIS USERS
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* MODAL:: */}

      <div className="Guide">
        <div className="Guide__header">
          <h1 className="Guide__header__title">
            Guide <span>#{id}</span>
          </h1>
          <div className="Guide__header__option">
            {role ? (
              <button
                className="Guide__header__back"
                onClick={handleActionModal}
              >
                Create Guide of Selected Users
              </button>
            ) : (
              ""
            )}
            <Link to="/guides">
              <button className="Guide__header__back">Back To Guides</button>
            </Link>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="GuideInfo">
            <p className="GuideInfo__revision">REVISION: {data.revision}</p>
            <h1 className="GuideInfo__title">{data.title}</h1>
            <h1 className="GuideInfo__content">{data.content}</h1>
          </div>
        )}
      </div>
    </div>
  );
};
