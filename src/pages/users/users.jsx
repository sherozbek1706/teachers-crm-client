import React, { createRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader, NotDefined, Pagination, UserRow } from "../../components";
import { Sitebar } from "../../layouts";
import { HandleFetchError } from "../../shared/errors/clear-account";
import { axiosInstance } from "../../shared/services/axios";
import "./users.css";

export const Users = () => {
  const [state, setState] = useState({
    usersData: [],
    loading: true,
    by: "id",
    order: "desc",
    filter: "all",
    search: "",
    isChange: false,
    pageInfo: {},
    limit: 10,
    pageNums: [],
    offset: 0,
  });

  const myRef = createRef();

  const scroll = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleChangePages = (num) => {
    const offsetPage = state.limit * (num - 1);

    setState((prevState) => ({
      ...prevState,
      isChange: true,
      offset: offsetPage,
    }));

    scroll(myRef);
    handleSearchUsers();
  };

  const handleChangeSearch = (e) => {
    setState((prevState) => ({
      ...prevState,
      search: e.target.value,
      isChange: true,
      offset: 0,
    }));
  };

  const handleChangeSortedUser = (e) => {
    const filterOption = e.target.value.split(":");
    setState((prevState) => ({
      ...prevState,
      isChange: true,
      by: filterOption[0],
      order: filterOption[1],
    }));
  };

  const handleChangeFilterUser = (e) => {
    setState((prevState) => ({
      ...prevState,
      isChange: true,
      filter: e.target.value,
    }));
  };

  const handleSearchUsers = () => {
    setState((prevState) => ({
      ...prevState,
      isChange: false,
      loading: true,
    }));
    fetchData();
  };

  const handleChangeLimit = (e) => {
    setState((prevState) => ({
      ...prevState,
      limit: e.target.value,
      isChange: true,
      offset: 0,
    }));
  };

  useEffect(() => {
    paginationSorting();
    fetchData();
  }, [state.usersData, state.filter, state.limit, state.offset]);

  const fetchData = async () => {
    try {
      const filters =
        state.filter !== "all" ? `&filters[role]=${state.filter}` : "";
      const response = await axiosInstance.get(
        `/users?q=${state.search}&sort[by]=${state.by}&sort[order]=${state.order}&page[offset]=${state.offset}&page[limit]=${state.limit}${filters}`
      );

      const data = response.data.data;
      const pageInfo = response.data.pageInfo;

      setState((prevState) => ({
        ...prevState,
        usersData: data,
        pageInfo: pageInfo,
        loading: false,
      }));
    } catch (err) {
      HandleFetchError(err);
    }
  };

  useEffect(() => {
    paginationSorting();
  }, [state.pageInfo]);

  const paginationSorting = () => {
    let total = state.pageInfo.total;
    let paginationNumber = [1];
    let pageNum = 2;

    while (total > state.limit) {
      total -= state.limit;
      paginationNumber.push(pageNum);
      pageNum++;
    }

    setState((prevState) => ({
      ...prevState,
      pageNums: paginationNumber,
    }));
  };

  return (
    <div className="Users__dashboard" ref={myRef}>
      <Sitebar />
      <div className="Users">
        <div className="Users__header">
          <h1 className="Users__header__title">All Users</h1>
          <div className="AddUser__header__option">
            <Link to="/add/user">
              <button className="AddUser__header__btn">Add User</button>
            </Link>
          </div>
        </div>
        <h1 className="Notification__filters__title">
          Sorting & Search & PerPage
        </h1>
        <div className="Notification__filters">
          <select
            className="filters__select"
            value={state.filter}
            onChange={(e) => handleChangeFilterUser(e)}
          >
            <option value="all">ALL</option>
            <option value="employee">EMPLOYEE</option>
            <option value="admin">ADMIN</option>
          </select>

          <select
            className="filters__select"
            value={state.limit}
            onChange={(e) => handleChangeLimit(e)}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>

          <input
            type="text"
            value={state.search}
            onChange={(e) => handleChangeSearch(e)}
            className="filters__input"
            placeholder="search..."
          />

          <select
            className="filters__select"
            value={`${state.by}:${state.order}`}
            onChange={(e) => handleChangeSortedUser(e)}
          >
            <option value="age:desc">Katta Yoshlilar</option>
            <option value="age:asc">Kichik Yoshlilar</option>
            <option value="id:desc">So'ngi Qo'shilgan</option>
            <option value="id:asc">Birinchi Qo'shilgan</option>
          </select>

          <button
            className={`reset_filters ${
              !state.isChange ? "disable_filtersBtn" : ""
            }`}
            onClick={handleSearchUsers}
            disabled={!state.isChange}
          >
            SEARCH
          </button>
        </div>
        <div className="Table__users">
          <table>
            <tr>
              <th>ID</th>

              <th>First Name</th>

              <th>Last Name</th>

              <th>Age</th>

              <th>Role</th>

              <th>Username</th>

              <th>Option</th>
            </tr>
            {state.loading ? (
              <Loader />
            ) : state.usersData.length > 0 ? (
              <UserRow data={state.usersData} />
            ) : (
              ""
            )}
          </table>
          {state.usersData.length > 0 ? (
            ""
          ) : (
            <>
              <NotDefined msg={"User was Not Found"} />
            </>
          )}
        </div>
        <Pagination
          data={{
            pageNums: state.pageNums,
            limit: state.limit,
            offset: state.offset,
          }}
          handleChangePages={(num) => handleChangePages(num)}
        />
      </div>
    </div>
  );
};
