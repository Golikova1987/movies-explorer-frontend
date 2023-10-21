/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import MainPage from "../../pages/MainPage";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import MoviesPage from "../../pages/MoviesPage";
import RegisterPage from "../../pages/RegisterPage";
import LoginPage from "../../pages/LoginPage";
import NotFoundPage from "../../pages/NotFoundPage";
import SavedMoviesPage from "../../pages/SavedMoviesPage";
import ProfilePage from "../../pages/ProfilePage";
import * as mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";
import {
  CONFLICT,
  SERVER_ERROR,
  UNAUTHORIZED,
  SERVER_ERROR_TEXT,
  CONFLICT_TEXT,
  UNAUTHORIZED_TEXT,
} from "../../utils/errors";
import { ProtectedRouteElementForUnauthorizedUser } from "../Routes/Routes";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSavedMovies, setIsLoadingSavedMovies] = useState(false);
  const [isStatusPopupOpen, setIsStatusPopupOpen] = useState(false);
  const [isStatus, setIsStatus] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [textPopup, setTextPopup] = useState("");
  const [status, setStatus] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(
    JSON.parse(localStorage.getItem("filteredMovies")) || []
  );
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [isSearchMovies, setIsSearchMovies] = useState(false);
  const [isSearchSavedMovies, setIsSearchSavedMovies] = useState(false);

  useEffect(() => {

    if (localStorage.token) {
      Promise.all([mainApi.getUserInfo(localStorage.token), mainApi.getMovies(localStorage.token)])
        .then(([dataInfo, dataMovies]) => {
          setCurrentUser(dataInfo);
          setSavedMovies(dataMovies);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });

    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);


  ////////////////

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    const jwt = localStorage.getItem("token");

    if (jwt)
      mainApi
        .checkUser(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((err) => console.log(`Возникла ошибка: ${err}`));
  };

  useEffect(() => {
    setIsLoadingMovies(true);
    if (isLoggedIn) {
      moviesApi.getAllMovies()
        .then((movies) => {
          setMovies(movies);
          setSavedMovies(savedMovies);
          setFilteredSavedMovies(savedMovies);
          setIsLoadingMovies(true);
        })
        .catch((err) => {
          setIsLoadingMovies(false);
          console.log(`Возникла ошибка: ${err}`);
        });
    }
  }, [isLoggedIn]);



  useEffect(() => {
    setTimeout(() => {
      setIsStatusPopupOpen(false);
    }, 2000);
  }, [isStatusPopupOpen]);

  const handleLogin = (email, password) => {
    setIsLoading(true);
    mainApi
      .login(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        localStorage.setItem("token", res.token);
        navigate("/movies");
        setIsLoading(false);
        setIsStatusPopupOpen(true);
        setIsStatus(true);
        setTextPopup("Успешный вход в аккаунт. Добро пожаловать!");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(`Возникла ошибка: ${err}`);
        if (err === UNAUTHORIZED) {
          setStatus(UNAUTHORIZED_TEXT);
        } else if (err === SERVER_ERROR) {
          setStatus(SERVER_ERROR_TEXT);
        } else {
          setStatus("При авторизации произошла ошибка.");
        }
      });
  };

  const handleRegister = (name, email, password) => {
    setIsLoading(true);
    setIsStatus(true);
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (res)
          handleLogin(email, password);
        setIsLoggedIn(false)
        setIsLoading(false);
        setIsStatusPopupOpen(true);
        setIsStatus(true);
        setTextPopup("Регистрация прошла успешно. Добро пожаловать!");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(`Возникла ошибка: ${err}`);
        if (err === CONFLICT) {
          setStatus(CONFLICT_TEXT);
        } else if (err === SERVER_ERROR) {
          setStatus(SERVER_ERROR_TEXT);
        } else {
          setStatus("При регистрации пользователя произошла ошибка.");
        }
      });
  };

  const handleUpdateUser = (data) => {
    setIsLoading(true);
    mainApi
      .editUserInfo(data, localStorage.token)
      .then((res) => {
        setCurrentUser(res);
        setIsLoading(false);
        setIsEdit(false);
        setIsStatusPopupOpen(true);
        setIsStatus(true);
        setTextPopup("Данные успешно сохранены!");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(`Возникла ошибка: ${err}`);
        if (err === CONFLICT) {
          setStatus(CONFLICT_TEXT);
        } else if (err === SERVER_ERROR) {
          setStatus(SERVER_ERROR_TEXT);
        } else {
          setStatus("При обновлении профиля произошла ошибка.");
        }
      });
  };

  const handleSignOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };


  const handleCreateMovie = (
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    setIsSave
  ) => {
    setIsLoadingMovies(true);
    mainApi
      .createMovie(
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        nameRU,
        nameEN,
        movieId,
        localStorage.token
      )
      .then((newSavedMovie) => {
        setIsLoadingMovies(true);
        setIsSave(true);
        setSavedMovies((prevState) => [...prevState, newSavedMovie]);
        setFilteredSavedMovies((prevState) => [...prevState, newSavedMovie]);
      })
      .catch((err) => {
        setIsLoadingMovies(false);
        console.log(`Возникла ошибка: ${err}`);
      });
  };

  const handleDeleteMovie = (id, setIsSave) => {
    setIsLoadingMovies(true);
    mainApi
      .deleteMovie(id, localStorage.token)
      .then(() => {
        setIsLoadingMovies(true);
        setIsSave(false);
        setSavedMovies((prevState) =>
          prevState.filter((item) => item._id !== id)
        );
        setFilteredSavedMovies((prevState) =>
          prevState.filter((item) => item._id !== id)
        );
      })
      .catch((err) => {
        setIsLoadingMovies(false);
        console.log(`Возникла ошибка: ${err}`);
      });
  };

  const closeStatusPopup = () => {
    setIsStatusPopupOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Routes>
            <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} />} />
            <Route
              path="/movies"
              element={
                <ProtectedRouteElementForUnauthorizedUser
                  isLoggedIn={isLoggedIn}
                  element={
                    <MoviesPage
                      isLoggedIn={isLoggedIn}
                      movies={movies}
                      isSearchMovies={isSearchMovies}
                      filteredMovies={filteredMovies}
                      setFilteredMovies={setFilteredMovies}
                      savedMovies={savedMovies}
                      setIsSearchMovies={setIsSearchMovies}
                      handleCreateMovie={handleCreateMovie}
                      handleDeleteMovie={handleDeleteMovie}
                      isLoading={isLoading}
                      isLoadingMovies={isLoadingMovies}
                    />
                  }
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRouteElementForUnauthorizedUser
                  isLoggedIn={isLoggedIn}
                  element={
                    <SavedMoviesPage
                      isLoggedIn={isLoggedIn}
                      filteredSavedMovies={filteredSavedMovies}
                      savedMovies={savedMovies}
                      setFilteredSavedMovies={setFilteredSavedMovies}
                      handleDeleteMovie={handleDeleteMovie}
                      isSearchSavedMovies={isSearchSavedMovies}
                      setIsSearchSavedMovies={setIsSearchSavedMovies}
                      isLoadingSavedMovies={isLoadingSavedMovies}
                      setIsLoadingSavedMovies={setIsLoadingSavedMovies}
                      isLoadingMovies={isLoadingMovies}
                    />
                  }
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteElementForUnauthorizedUser
                  isLoggedIn={isLoggedIn}
                  element={
                    <ProfilePage
                      isLoggedIn={isLoggedIn}
                      handleSignOut={handleSignOut}
                      status={status}
                      setStatus={setStatus}
                      isLoading={isLoading}
                      handleUpdateUser={handleUpdateUser}
                      isEdit={isEdit}
                      setIsEdit={setIsEdit}
                    />
                  }
                />
              }
            />
            <Route
              path="/signup"
              element={
                isLoggedIn && location.pathname === "/signup" ? (
                  navigate("/movies")
                ) : (
                  <RegisterPage
                    handleRegister={handleRegister}
                    status={status}
                    setStatus={setStatus}
                    isLoading={isLoading}
                  />
                )
              }
            />
            <Route
              path="/signin"
              element={
                isLoggedIn && location.pathname === "/signin" ? (
                  navigate("/movies")
                ) : (
                  <LoginPage
                    handleLogin={handleLogin}
                    status={status}
                    setStatus={setStatus}
                    isLoading={isLoading}
                  />
                )
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <InfoTooltip
          isOpen={isStatusPopupOpen}
          onClose={closeStatusPopup}
          isStatus={isStatus}
          status={textPopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;