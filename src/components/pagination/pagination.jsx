import { errorNot } from "../../shared/toastfy";
import "./pagination.css";
export const Pagination = ({
  data: { pageNums: data, limit, offset },
  handleChangePages,
}) => {
  const handleChangePrev = (action) => {
    let pageNum;
    if (action == "prev") {
      pageNum = offset / limit;
      if (pageNum <= 0) {
        errorNot("Siz eng birinchi page'da turibsiz!");
      } else {
        handleChangePages(pageNum);
      }
    } else if (action == "next") {
      const latestValue = data.at(-1);
      pageNum = offset / limit + 2;
      if (latestValue == pageNum - 1) {
        errorNot("Siz eng oxirgi page'da turibsiz!");
      } else {
        handleChangePages(pageNum);
      }
    }
  };

  const handleChangePage = (num) => {
    handleChangePages(num);
  };
  return (
    <div className="Pagination">
      <p
        className="Pagination__number"
        onClick={() => handleChangePrev("prev")}
      >
        prev
      </p>
      {data.map((num, idx) => (
        <p
          key={idx}
          className={`Pagination__number number ${
            num == offset / limit + 1 ? "active_page" : ""
          }`}
          onClick={() => handleChangePage(num)}
        >
          {num}
        </p>
      ))}
      <p
        className="Pagination__number"
        onClick={() => handleChangePrev("next")}
      >
        next
      </p>
    </div>
  );
};
