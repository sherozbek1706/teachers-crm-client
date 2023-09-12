import { Fragment } from "react";
import { MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import "./guide-row.css";
export const GuideRow = ({ data }) => {
  const role = localStorage.getItem("role") == "admin" ? true : false;
  const { title, content, id } = data;

  const truncatedText = (text, length) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  return (
    <div className="GuideRow">
      <Link className="GuideRow__link" to={`/guide/${id}`}>
        <h3 className="GuideRow__title">{truncatedText(title, 75)}</h3>
      </Link>
      <p className="GuideRow__content">{truncatedText(content, 250)}</p>
      <div className="GuideRow__options">
        <Link to={`/guide/${id}`}>
          <div className="GuideRow__options__icon">
            <MdRemoveRedEye className="icon see" />
          </div>
        </Link>
        {role ? (
          <Fragment>
            <Link to={`/edit/guide/${id}`}>
              <div className="GuideRow__options__icon">
                <MdEdit className="icon edit" />
              </div>
            </Link>
          </Fragment>
        ) : null}
      </div>
    </div>
  );
};
