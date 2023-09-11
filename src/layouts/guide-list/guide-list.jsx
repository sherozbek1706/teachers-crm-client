import { GuideRow } from "../../components/guide-row/guide-row";
import "./guide-list.css";
export const GuideList = ({ data }) => {
  if (data.length <= 0) {
    return "Guide Not Found!";
  }
  return (
    <div className="GuideList">
      {data.map((guide) => (
        <GuideRow data={guide} key={guide.id} />
      ))}
    </div>
  );
};
