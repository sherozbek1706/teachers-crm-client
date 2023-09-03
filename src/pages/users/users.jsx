import { useEffect, useState } from "react";
export const Users = () => {
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    axiosInstance.get("/users").then((res) => {
      setUsersData([res.data.data]);
    });
  }, []);

  if (!usersData.length) {
    return <Loader />;
  }

  return (
    <div className="Users__dashboard">
      <Sitebar />
      <div className="Users">
        <div className="Users__header">
          <h1 className="Users__header__title">All Users</h1>
        </div>
        <div className="Users__options"></div>
        <div className="Users__list">
        </div>
      </div>
    </div>
  );
};
