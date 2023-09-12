import React, { createRef, useEffect, useState } from "react";
import { Sitebar } from "../../layouts";
import "./users.css";
import { AiFillEye } from "react-icons/ai";
import { BiEdit, BiTrash } from "react-icons/bi";
import { axiosInstance } from "../../shared/services/axios";
import { Loader, Pagination } from "../../components";
import { Link } from "react-router-dom";
import { HandleFetchError } from "../../shared/errors/clear-account";

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
  }, [state.filter, state.limit, state.offset]);

  const fetchData = async () => {
    console.log("FETCH");
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

  const handleRemoveUser = (id) => {
    axiosInstance
      .delete(`/users/${id}`)
      .then(() => {
        setState((prevState) => ({
          ...prevState,
          usersData: prevState.usersData.filter((user) => user.id !== id),
        }));
      })
      .catch((err) => {
        HandleFetchError(err);
      })
      .finally(() => {
        fetchData();
      });
  };

  return (
    <div className="Users__dashboard" ref={myRef}>
      <Sitebar />
      <div className="Users">
        <div className="Users__header">
          <h1 className="Users__header__title">All Users</h1>
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
        <div className="Users__list">
          <div className="Users__row">
            <p className="Users__text Users__firstname">
              <b>First Name</b>
            </p>
            <p className="Users__text Users__lastname">
              <b>Last Name</b>
            </p>
            <p className="Users__text Users__role">
              <b>Role</b>
            </p>
            <p className="Users__text Users__age">
              <b>Age</b>
            </p>
            <p className="Users__text Users__username">
              <b>Username</b>
            </p>
          </div>

          {state.loading ? (
            <Loader />
          ) : state.usersData.length > 0 ? (
            state.usersData.map((user) => (
              <div className="Users__row" key={user.id}>
                <p className="Users__text Users__firstname">
                  {user.first_name}
                </p>
                <p className="Users__text Users__lastname">{user.last_name}</p>
                <p className="Users__text Users__role">{user.role}</p>
                <p className="Users__text Users__age">{user.age}</p>
                <p className="Users__text Users__username">@{user.username}</p>
                <div className="Users__option">
                  <Link to={`/profile/${user.id}`}>
                    <AiFillEye className="Users__icons Users__view" />
                  </Link>
                  <BiEdit className="Users__icons Users__edit" />
                  <BiTrash
                    className="Users__icons Users__delete"
                    onClick={() => handleRemoveUser(user.id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <h1>Not Found User</h1>
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
