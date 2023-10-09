import { Navigate } from "react-router-dom";

export const ProtectedRouteAuthorized = ({
  loggedIn,
  element,
}) => {
  return !loggedIn ? element : <Navigate to="/movies" replace />;
};

export const ProtectedRouteUnauthorized = ({
  loggedIn,
  element,
}) => {
  return loggedIn ? element : <Navigate to="/" replace />;
};
