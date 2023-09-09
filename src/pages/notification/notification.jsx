import "./notification.css";
import { Sitebar } from "../../layouts";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../shared/services/axios";
import { Loader, UserGuide } from "../../components";
import { HandleFetchError } from "../../shared/errors/clear-account";
import { successNot } from "../../shared/toastfy";
export const Notification = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const handleReadNotify = (id) => {
    axiosInstance.post(`/user-guides/${id}/read`).then(({ data: { data } }) => {
      setLoading(true);
      successNot("Siz Guideni O'qidingiz!");
      fetchData();
    });
  };

  const fetchData = () => {
    axiosInstance
      .get("/user-guides")
      .then(({ data: { data } }) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        HandleFetchError(err);
      });
  };
  return (
    <div className="Notification__Dashboard">
      <Sitebar />
      <div className="Notification">
        <div className="Notification__header">
          <h1 className="Notification__header__title">Notifications</h1>
        </div>
        <div className="Notifications">
          {loading ? (
            <Loader />
          ) : (
            data.map((Userguides, idx) => (
              <UserGuide
                key={idx}
                data={Userguides}
                handleReadNotify={(id) => handleReadNotify(id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
