import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import {
  ProtectedRouteAuthorized,
  ProtectedRouteUnauthorized,
} from "../ProtectedRoute/ProtectedRoute";

import MainPage from "../../pages/Main";
import MoviesPage from "../../pages/Movies";
import SavedMoviesPage from "../../pages/SavedMovies";
import LoginPage from "../../pages/Login";
import RegisterPage from "../../pages/Register";
import ProfilePage from "../../pages/Profile";
import NotFound from "../../pages/NotFound";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="page__container">
      <Routes>
        <Route path="/" element={<MainPage loggedIn={loggedIn} />} />
        <Route
          path="/movies"
          element={
            <ProtectedRouteUnauthorized
              loggedIn={loggedIn}
              element={<MoviesPage loggedIn={loggedIn} />}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRouteUnauthorized
              loggedIn={loggedIn}
              element={<SavedMoviesPage loggedIn={loggedIn} />}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRouteAuthorized
              loggedIn={loggedIn}
              element={<RegisterPage />}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <ProtectedRouteAuthorized
              loggedIn={loggedIn}
              element={<LoginPage setLoggedIn={setLoggedIn} />}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteUnauthorized
              loggedIn={loggedIn}
              element={
                <ProfilePage
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn} 
                />
              }
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
