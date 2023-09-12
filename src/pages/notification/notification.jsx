import "./notification.css";
import { Sitebar } from "../../layouts";
import { Fragment, createRef, useEffect, useState } from "react";
import { axiosInstance } from "../../shared/services/axios";
import { Loader, Pagination, UserGuide } from "../../components";
import { HandleFetchError } from "../../shared/errors/clear-account";
import { successNot } from "../../shared/toastfy";

export const Notification = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedFilter, setCompletedFilter] = useState("default");

  const [pageInfo, setPageInfo] = useState({});
  const [limit, setLimit] = useState(10);
  const [pageNums, setPageNums] = useState([]);
  const [offset, setOffset] = useState(0);

  const myRef = createRef();

  const scroll = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleResetFilters = async () => {
    setCompletedFilter("default");
    setLoading(true);
    setOffset(0);
    await fetchData();
  };

  const handleChangePages = (num) => {
    const offsetPage = limit * (num - 1);
    scroll(myRef);
    setOffset(offsetPage);
  };

  const handleChangeLimit = (e) => {
    setLimit(e.target.value);
    setOffset(0);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [completedFilter, limit, offset]);

  const handleReadNotify = (id) => {
    axiosInstance.post(`/user-guides/${id}/read`).then(({ data: { data } }) => {
      setLoading(true);
      successNot("Siz Guideni O'qidingiz!");
      fetchData();
    });
  };

  const fetchData = async () => {
    try {
      let response;
      if (completedFilter !== "default") {
        response = await axiosInstance.get(
          `/user-guides?filters[completed]=${
            completedFilter === "completed"
          }&page[offset]=${offset}&page[limit]=${limit}`
        );
      } else {
        response = await axiosInstance.get(
          `/user-guides?page[offset]=${offset}&page[limit]=${limit}`
        );
      }
      const data = await response.data;

      setData(data.data);
      setPageInfo(data.pageInfo);
      setLoading(false);
    } catch (err) {
      HandleFetchError(err);
    }
  };

  useEffect(() => {
    paginationSorting();
  }, [pageInfo]);

  const paginationSorting = () => {
    let total = pageInfo.total;
    let paginationNumber = [1];
    let pageNum = 2;

    while (total > limit) {
      total -= limit;
      paginationNumber.push(pageNum);
      pageNum++;
    }

    setPageNums(paginationNumber);
  };

  return (
    <div className="Notification__Dashboard" ref={myRef}>
      <Sitebar />
      <div className="Notification">
        <div className="Notification__header">
          <h1 className="Notification__header__title">Notifications</h1>
        </div>
        <h1 className="Notification__filters__title">
          FILTERS & PERPAGE & RESET FILTER
        </h1>
        <div className="Notification__filters">
          <select
            value={completedFilter}
            className="filters__select"
            onChange={(e) => setCompletedFilter(e.target.value)}
          >
            <option value="default">ALL</option>
            <option value="completed">COMPLETED</option>
            <option value="uncompleted">UNCOMPLETED</option>
          </select>
          <select
            value={limit}
            className="filters__select"
            onChange={(e) => handleChangeLimit(e)}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <button
            onClick={() => handleResetFilters()}
            className="reset_filters"
          >
            Reset Filters
          </button>
        </div>
        <div className="Notifications">
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              {data.length > 0 ? (
                data.map((Userguides, idx) => (
                  <UserGuide
                    key={idx}
                    data={Userguides}
                    handleReadNotify={(id) => handleReadNotify(id)}
                  />
                ))
              ) : (
                <h1>Notifications Not Found</h1>
              )}
            </Fragment>
          )}
        </div>
        <Pagination
          data={{ pageNums, limit, offset }}
          handleChangePages={(num) => handleChangePages(num)}
        />
      </div>
    </div>
  );
};
