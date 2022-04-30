import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../Context/LoginContext";
export const ProtectedRoute = ({ children }) => {
  const contextData = useContext(authContext);
  if (contextData.authStatus === true) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};
