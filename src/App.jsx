import { Route, Routes as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { Protected } from "./components";
import { Dashboard, Login } from "./pages";
export const App = () => {
  const token = localStorage.getItem("token") ? true : false;

  return (
    <div className="App">
      <Router>
        <Route
          exact
          path="/"
          element={
            <Protected isLoggedIn={token}>
              <Dashboard />
            </Protected>
          }
        />

        <Route path="/login" element={<Login />} />
      </Router>
    </div>
  );
};
