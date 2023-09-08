import { GuideRow } from "../../components/guide-row/guide-row";
import "./guide-list.css";
export const GuideList = ({ data }) => {
  return (
    <div className="GuideList">
      {data.map((guide) => (
        <GuideRow data={guide} key={guide.id} />
      ))}
    </div>
  );
};
