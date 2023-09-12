import { Link } from "react-router-dom";
import "./user-guide.css";
import { MdRemoveRedEye } from "react-icons/md";
import { axiosInstance } from "../../shared/services/axios";
export const UserGuide = ({ data, handleReadNotify }) => {
  const {
    _id,
    guide_id,
    completed,
    guide: { title, content, _id: id },
  } = data;

  const handleReadGuides = (id) => {
    handleReadNotify(id);
  };

  return (
    <div className={`UserGuide ${completed ? "UserGuideRead" : null}`}>
      <p className="UserGuide__title">{title.slice(0, 100)}</p>
      <div className="UserGuide__option">
        <Link to={`/guide/${guide_id}`}>
          <div className="option__icon">
            <MdRemoveRedEye className="icon" />
          </div>
        </Link>
        {completed ? (
          <button className="UserGuide__option__read tick">Completed</button>
        ) : (
          <button
            className="UserGuide__option__read"
            onClick={() => handleReadGuides(_id)}
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
};
