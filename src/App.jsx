import { Route, Routes as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { Protected } from "./components";
import {
  AddGuide,
  AddUser,
  Guide,
  Guides,
  Login,
  NotFound,
  Notification,
  Users,
} from "./pages";
import { Profile } from "./layouts";
import { MyContext } from "./shared/context";
export const App = () => {
  const token = localStorage.getItem("token") ? true : false;
  const role = localStorage.getItem("role") == "admin";

  return (
    <MyContext.Provider value={role}>
      <div className="App">
        <Router>
          <Route
            exact
            path="/profile"
            element={
              <Protected isLoggedIn={token}>
                <Profile />
              </Protected>
            }
          />

          <Route
            exact
            path="/users"
            element={
              <Protected isLoggedIn={token}>
                <Users />
              </Protected>
            }
          />

          <Route
            exact
            path="/profile/:id"
            element={
              <Protected isLoggedIn={token}>
                <Profile />
              </Protected>
            }
          />

          <Route
            path="/guides"
            element={
              <Protected isLoggedIn={token}>
                <Guides />
              </Protected>
            }
          />

          <Route
            path="/add/guides"
            element={
              <Protected isLoggedIn={token}>
                <AddGuide />
              </Protected>
            }
          />

          <Route
            path="/guide/:id"
            element={
              <Protected isLoggedIn={token}>
                <Guide />
              </Protected>
            }
          />

          <Route
            path="/edit/guide/:id"
            element={
              <Protected isLoggedIn={token}>
                <AddGuide />
              </Protected>
            }
          />

          <Route
            path="/add/user"
            element={
              <Protected isLoggedIn={token}>
                <AddUser />
              </Protected>
            }
          />

          <Route
            path="/notification"
            element={
              <Protected isLoggedIn={token}>
                <Notification />
              </Protected>
            }
          />

          <Route
            path="*"
            element={
              <Protected isLoggedIn={token}>
                <NotFound />
              </Protected>
            }
          />

          <Route path="/login" element={<Login />} />
        </Router>

        {/* TOASTIFY */}

        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </MyContext.Provider>
  );
};
