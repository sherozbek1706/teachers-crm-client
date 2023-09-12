import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectRoute = ({ children }) => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const role = decoded.user.role;
      setRole(role);
    } catch (error) {
      console.error("Error decoding JWT:", error);
    }
  }, []);

  if (role != "admin") {
    return navigate("/");
  }
  return children;
};
