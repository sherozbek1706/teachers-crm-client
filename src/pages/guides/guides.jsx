import { useEffect, useState } from "react";
import { GuideList, Sitebar } from "../../layouts";
import "./guides.css";
import { axiosInstance } from "../../shared/services/axios";
import { HandleFetchError } from "../../shared/errors/clear-account";
import { Loader } from "../../components";
export const Guides = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/guides")
      .then(({ data: { data: data } }) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        HandleFetchError(err);
      });
  }, []);

  return (
    <div className="Guides__dashboard">
      <Sitebar />
      <div className="Guides">
        <div className="Guides__header">
          <h1 className="Guides__header__title">All Guides</h1>
        </div>
      </div>
    </div>
  );
};
