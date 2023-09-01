import { useNavigate } from "react-router-dom";

export const Protected = ({ isLoggedIn, children }) => {
  const navigate = useNavigate();

};
