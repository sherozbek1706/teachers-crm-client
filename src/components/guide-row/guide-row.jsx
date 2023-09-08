import "./guide-row.css";
export const GuideRow = ({ data }) => {
  const { title, content } = data;

  const truncatedText = (text, length) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  return (
    <div className="GuideRow">
      <h3 className="GuideRow__title">{truncatedText(title, 75)}</h3>
      <p className="GuideRow__content">{truncatedText(content, 250)}</p>
    </div>
  );
};
