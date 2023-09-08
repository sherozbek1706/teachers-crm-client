import { Fragment, useEffect, useState } from "react";
import { Loader } from "../../components";
import { GuideList, Sitebar } from "../../layouts";
import { HandleFetchError } from "../../shared/errors/clear-account";
import { axiosInstance } from "../../shared/services/axios";
import { Link } from "react-router-dom";
import "./guides.css";

export const Guides = () => {
  const role = localStorage.getItem("role") == "admin";
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
          <div className="Guides__header__option">
            {role ? (
              <Fragment>
                <Link to="/add/guides">
                  <button className="Guides__header__create">Add Guide</button>
                </Link>
              </Fragment>
            ) : null}
          </div>
        </div>
        {loading ? <Loader /> : <GuideList data={data} />}
      </div>
    </div>
  );
};
