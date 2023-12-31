import { NotDefined } from "../../components";
import { GuideRow } from "../../components/guide-row/guide-row";
import "./guide-list.css";
export const GuideList = ({ data }) => {
  if (data.length <= 0) {
    return <NotDefined msg={"Guide was not found"} />;
  }
  return (
    <div className="GuideList">
      {data.map((guide) => (
        <GuideRow data={guide} key={guide.id} />
      ))}
    </div>
  );
};
