import "./guide-row.css";
import { axiosInstance } from "../../shared/services/axios";
import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
export const GuideRow = ({ data }) => {
  const { title, content, id } = data;

  const truncatedText = (text, length) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  return (
    <div className="GuideRow">
      <h3 className="GuideRow__title">{truncatedText(title, 75)}</h3>
      <p className="GuideRow__content">{truncatedText(content, 250)}</p>
      <div className="GuideRow__options">
        <div className="GuideRow__options__icon">
          <MdRemoveRedEye className="icon see" />
        </div>
        <div className="GuideRow__options__icon">
          <MdEdit className="icon edit" />
        </div>
      </div>
    </div>
  );
};
