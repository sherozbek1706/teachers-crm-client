import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Loader } from "../../components";
import { Sitebar } from "../../layouts";
import "./guide.css";
import { axiosInstance } from "../../shared/services/axios";
import { HandleFetchError } from "../../shared/errors/clear-account";
export const Guide = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    axiosInstance(`/guides/${id}`)
      .then(({ data: { data } }) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status == "404") {
          navigate("/");
        }
        HandleFetchError(err);
      });
  }, []);

  return (
    <div className="Guide__dashboard">
      <Sitebar />
      <div className="Guide">
        <div className="Guide__header">
          <h1 className="Guide__header__title">
            Guide <span>#{id}</span>
          </h1>
          <div className="Guide__header__option">
            <Link to="/guides">
              <button className="Guide__header__back">Back To Guides</button>
            </Link>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="GuideInfo">
            <h1 className="GuideInfo__title">{data.title}</h1>
            <h1 className="GuideInfo__content">{data.content}</h1>
          </div>
        )}
      </div>
    </div>
  );
};
