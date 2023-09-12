import { Fragment, createRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader, Pagination } from "../../components";
import { GuideList, Sitebar } from "../../layouts";
import { HandleFetchError } from "../../shared/errors/clear-account";
import { axiosInstance } from "../../shared/services/axios";
import "./guides.css";

export const Guides = () => {
  const [data, setData] = useState([]);

  const [pageInfo, setPageInfo] = useState({});
  const [limit, setLimit] = useState(10);
  const [pageNums, setPageNums] = useState([]);
  const [offset, setOffset] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const [sorted, setSorted] = useState("desc");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role") == "admin";

  const myRef = createRef();

  const scroll = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleChangePages = (num) => {
    let offsetPage = limit * (num - 1);
    scroll(myRef);
    setOffset(offsetPage);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    setOffset(0);
  };

  const handleChangeSorting = (e) => {
    setSorted(e.target.value);
  };

  const handleChangeLimit = (e) => {
    setLimit(e.target.value);
    setOffset(0);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    paginationSorting();
  }, [sorted, limit, offset, search, refresh]);

  // Pagination uchun
  const paginationSorting = () => {
    let total = pageInfo.total;
    if (!total && total != 0) {
      setRefresh((prev) => !prev);
    }
    let paginationNumber = [1];
    let pageNum = 2;
    while (total > limit) {
      total -= limit;
      paginationNumber.push(pageNum);
      pageNum++;
    }
    setPageNums(paginationNumber);
  };

  // Malumotlarni Fetch qilish
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/guides?q=${search}&sort[by]=id&sort[order]=${sorted}&page[offset]=${offset}&page[limit]=${limit}
        `
      );
      const data = await response.data;
      setPageInfo(data.pageInfo);
      setData(data.data);
      setLoading(false);
    } catch (err) {
      HandleFetchError(err);
    }
  };

  return (
    <div className="Guides__dashboard" ref={myRef}>
      <Sitebar />
      <div className="Guides">
        <div className="Guides__header">
          <h1 className="Guides__header__title">All Guides</h1>
          <div className="Guides__header__option">
            {role ? (
              <Fragment>
                <Link to="/add/guides">
                  <button className="Guides__header__create">Add Guide</button>
                </Link>
              </Fragment>
            ) : null}
          </div>
        </div>
        <h1 className="Guides__filters__title">Sorting & Search & PerPage</h1>
        <div className="Guides__filters">
          <select
            value={sorted}
            className="filters__select"
            onChange={(e) => handleChangeSorting(e)}
          >
            <option value="desc">Latest Guides</option>
            <option value="asc">Oldest Guides</option>
          </select>

          <input
            type="text"
            className="filters__input"
            value={search}
            placeholder="search..."
            onChange={(e) => handleChangeSearch(e)}
          />

          <select
            value={limit}
            className="filters__select"
            onChange={(e) => handleChangeLimit(e)}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <GuideList data={data} />
            <Pagination
              data={{ pageNums, limit, offset }}
              handleChangePages={(num) => handleChangePages(num)}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};
