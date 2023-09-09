import "./notification.css";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../shared/services/axios";
import { Loader, UserGuide } from "../../components";
import { HandleFetchError } from "../../shared/errors/clear-account";
import { successNot } from "../../shared/toastfy";
export const Notification = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

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
  );
};
