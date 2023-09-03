import "./profile.css";
export const Profile = () => {
  return (
    <div className="Profile__Dashboard">
      <div className="Profile">
        <div className="Profile__header">
          <h1 className="Profile__header__title">User Profile</h1>
        </div>
        <div className="Profile__infos">
          <div className="Profile__info">
            <p className="Profile__info__shadow">ID</p>
          </div>
          <div className="Profile__info">
            <p className="Profile__info__shadow">FIRST NAME</p>
          </div>
          <div className="Profile__info">
            <p className="Profile__info__shadow">LAST NAME</p>
          </div>
          <div className="Profile__info">
            <p className="Profile__info__shadow">USERNAME</p>
          </div>
          <div className="Profile__info">
            <p className="Profile__info__shadow">AGE</p>
          </div>
          <div className="Profile__info">
            <p className="Profile__info__shadow">ROLE</p>
          </div>
        </div>
      </div>
    </div>
  );
};
