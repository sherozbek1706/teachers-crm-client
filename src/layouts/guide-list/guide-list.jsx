import "./guide-list.css";
export const GuideList = ({ data }) => {
  return (
    <div className="GuideList">
      {data.map((guide) => (
        <div className="GuideList__row" key={guide.id}>
          <h1>{guide.title}</h1>
          <p>{guide.content}</p>
        </div>
      ))}
    </div>
  );
};
