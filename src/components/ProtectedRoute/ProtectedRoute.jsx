import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  isLoggedIn,
  element,
}) => {
  return isLoggedIn ? element : <Navigate to="/" replace />;
};