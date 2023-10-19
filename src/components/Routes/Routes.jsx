import { Navigate } from "react-router-dom";

export const ProtectedRouteElementForUnauthorizedUser = ({
  isLoggedIn,
  element,
}) => {
  return isLoggedIn ? element : <Navigate to="/" replace />;
};



// import { Navigate } from "react-router-dom";

// export const ProtectedRoute = ({
//   loggedIn,
//   element,
// }) => {
//   return loggedIn ? element : <Navigate to="/" replace />;
// };
