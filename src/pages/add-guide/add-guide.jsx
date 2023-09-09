import { Link, useNavigate } from "react-router-dom";
import { Sitebar } from "../../layouts";
import "./add-guide.css";
import { useState } from "react";
import { axiosInstance } from "../../shared/services/axios";
import { HandleFetchError } from "../../shared/errors/clear-account";
import { successNot } from "../../shared/toastfy";

export const AddGuide = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();
  const handleContentChange = (e) => {
    const text = e.target.value;

    if (text.length <= 1000) {
      setContent(text);
    }
  };

  const handleTitleChange = (e) => {
    const text = e.target.value;

    if (text.length <= 200) {
      setTitle(text);
    }
  };

  const handleChecked = () => {
    setChecked((pre) => !pre);
  };

  const handleCreateGuide = (e) => {
    e.preventDefault();
    const guideObj = {
      title,
      content,
      notify: checked,
    };

    axiosInstance
      .post("/guides", guideObj)
      .then(({ data: { data: data } }) => {
        successNot("Yangi Guide Yaratildi!");
        navigate("/guides");
      })
      .catch((err) => {
        HandleFetchError(err);
      });
  };

  return (
    <div className="AddGuide__dashboard">
      <Sitebar />
      <div className="AddGuide">
        <div className="AddGuide__header">
          <h1 className="AddGuide__header__title">Add Guide</h1>
          <div className="AddGuide__header__option">
            <Link to="/guides">
              <button className="AddGuide__header__back">Back to Guides</button>
            </Link>
          </div>
        </div>
        <form className="AddGuideForm" onSubmit={handleCreateGuide}>
          <h1 className="AddGuideForm__title">Add Guide Form</h1>

          <div className="AddGuideForm__place">
            <p className="AddGuideForm__holder">Title</p>
            <textarea
              className="AddGuideForm__area _title"
              value={title}
              onChange={handleTitleChange}
              required
            ></textarea>
            <p className="AddGuideForm__charCount">
              {title.length}&nbsp;/&nbsp;200
            </p>
          </div>
          <div className="AddGuideForm__place">
            <p className="AddGuideForm__holder">Content</p>
            <textarea
              className="AddGuideForm__area _content"
              value={content}
              onChange={handleContentChange}
              required
            ></textarea>
            <p className="AddGuideForm__charCount">
              {content.length}&nbsp;/&nbsp;1000
            </p>
          </div>
          <div className="AddGuideForm__place">
            <div className="AddGuideForm__checking">
              <input
                type="checkbox"
                onChange={handleChecked}
                className="AddGuideForm__checkbox"
              />
              <p className="AddGuideForm__checking__reason">
                Hamma Foydalanuvchilarga Birdaniga Xabar Yuborish{" "}
              </p>
            </div>
          </div>
          <button className="AddGuideForm__submit">Add Guide</button>
        </form>
      </div>
    </div>
  );
};