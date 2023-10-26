/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "./App.css";

import MainPage from "../../pages/MainPage";
import MoviesPage from "../../pages/MoviesPage";
import RegisterPage from "../../pages/RegisterPage";
import LoginPage from "../../pages/LoginPage";
import NotFoundPage from "../../pages/NotFoundPage";
import SavedMoviesPage from "../../pages/SavedMoviesPage";
import ProfilePage from "../../pages/ProfilePage";
import InfoPopup from "../InfoPopup/InfoPopup";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import * as mainApi from "../../utils/MainApi";
// import * as moviesApi from "../../utils/MoviesApi";

import {
  UNAUTHORIZED,
  UNAUTHORIZED_TEXT,
  CONFLICT,
  CONFLICT_TEXT,
  SERVER_ERROR,
  SERVER_ERROR_TEXT,
} from "../../utils/errors";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(true); //состояние авторизации пользователя
  const [isLoading, setIsLoading] = useState(false); //индикатор загрузки профиль логин регист
  // const [isLoadingSavedMovies, setIsLoadingSavedMovies] = useState(false); //индикатор загрузки сохраненных фильмов
//  const [isLoadingMovies, setIsLoadingMovies] = useState(false); //индикатор загрузки фильмов
  const [isSuccessPopup, setIsSuccessPopup] = useState(false); //попап успеха сохранения данных
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);//отрисовка кнопки редакт сохран
  const [successPopupText, setSuccessPopupText] = useState("");// текст попапа успешного сохранения и изменения
  const [currentUser, setCurrentUser] = useState({}); //получение данных
 // const [movies, setMovies] = useState([]);//массив с фильмами
  const [savedMovies, setSavedMovies] = useState([]); //массив сохраненных фильмов
  // const [isSearchMovies, setIsSearchMovies] = useState(false);
  // const [isSearchSavedMovies, setIsSearchSavedMovies] = useState(false);
  // const [filteredMovies, setFilteredMovies] = useState(
  //   JSON.parse(localStorage.getItem("filteredMovies")) || []
  // );//отрисовывает фильмы
 // const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  // загрузка сохраненных фильмов и профиля пользователя
  useEffect(() => {
    if (localStorage.token) {
      Promise.all([
        mainApi.getUserInfo(localStorage.token),
        mainApi.getSavedMovies(localStorage.token),
      ])
        .then(([userInfo, dataMovies]) => {
          setCurrentUser(userInfo);
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

  //проверка токена каждый раз при открытии страницы
  useEffect(() => {
    handleCheckUser();
  }, []);

  //проверка токена пользователя
  function handleCheckUser() {
    const jwt = localStorage.getItem("token");

    if (jwt)
      mainApi
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((err) => console.log(`Ошибка при проверке токена: ${err}`));
  };

  

  useEffect(() => {
    setTimeout(() => {
      setIsSuccessPopup(false);
    }, 2000);
  }, [isSuccessPopup]);

  function handleLogin(email, password) {
    setIsLoading(true);
    mainApi
      .login(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        localStorage.setItem("token", res.token);
        navigate("/movies");
        setIsLoading(false);
        setIsSuccessPopup(true);
        setIsError(true);
        setSuccessPopupText("Успешный вход в аккаунт. Добро пожаловать!");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(`Возникла ошибка: ${err}`);
        if (err === UNAUTHORIZED) {
          setError(UNAUTHORIZED_TEXT);
        } else if (err === SERVER_ERROR) {
          setError(SERVER_ERROR_TEXT);
        } else {
          setError("При авторизации произошла ошибка.");
        }
      });
  };

  function handleRegister(name, email, password) {
    setIsLoading(true);
    setIsError(true);
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (res) handleLogin(email, password);
        setIsLoggedIn(false);
        setIsLoading(false);
        setIsSuccessPopup(true);
        setIsError(true);
        setSuccessPopupText("Регистрация прошла успешно. Добро пожаловать!");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(`Возникла ошибка: ${err}`);
        if (err === CONFLICT) {
          setError(CONFLICT_TEXT);
        } else if (err === SERVER_ERROR) {
          setError(SERVER_ERROR_TEXT);
        } else {
          setError("При регистрации пользователя произошла ошибка.");
        }
      });
  };

  // обновление информации о пользователе
  function handleUpdateUser(data) {
    setIsLoading(true);
    mainApi
      .editUserInfo(data, localStorage.token)
      .then((res) => {
        setCurrentUser(res);
        setIsLoading(false);
        setIsEdit(false);
        setIsSuccessPopup(true);
        setIsError(true);
        setSuccessPopupText("Данные успешно сохранены!");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(`Возникла ошибка: ${err}`);
        if (err === CONFLICT) {
          setError(CONFLICT_TEXT);
        } else if (err === SERVER_ERROR) {
          setError(SERVER_ERROR_TEXT);
        } else {
          setError("При обновлении данных произошла ошибка.");
        }
      });
  };

  //выход из аккаунта
  function handleLogout() {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  
 /* function handleCreateMovie (
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
  ) {
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

  //удаление карточки с фильмом
  function handleDeleteMovie(id, setIsSave) {
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
        console.log(`Ошибка при удалении фильма: ${err}`);
      });
  };*/


//Обработчик удаления своей карточки
function handleDeleteMovie(film) {
  mainApi.deleteMovie(film, localStorage.token)
    .then(() => {
      setSavedMovies(savedMovies.filter((movie) => { return movie._id !== film }));
    })
    .catch((err) => { console.log(`Ошибка при удалении фильма ${err}`) });
}

/////////////////////////////////////////////

function handleCreateMovie(movie) {
  const isLikeMovie = savedMovies.some(element => movie.id === element.movieId);

  const clickFilm = savedMovies.filter((film) => {
    return film.movieId === movie.id
  })

  if (isLikeMovie) {
    handleDeleteMovie(clickFilm[0]._id)
  } else {
    mainApi.createMovie(movie, localStorage.token)
      .then(res => {
        setSavedMovies([res, ...savedMovies])
      })

      .catch((err) => { console.log(`Ошибка при установке лайка ${err}`) });
  }
}



  // закрытие попапов успешного сохранения, редактирования
  function closePopupSuccess() {
    setIsSuccessPopup(false);
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
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={
                    <MoviesPage
                      isLoggedIn={isLoggedIn}
                      isLoading={isLoading}
                    //  isLoadingMovies={isLoadingMovies}
                     // movies={movies}
                      savedMovies={savedMovies}
                      // setIsSearchMovies={setIsSearchMovies}
                      // isSearchMovies={isSearchMovies}
                      // filteredMovies={filteredMovies}
                      // setFilteredMovies={setFilteredMovies}
                      handleCreateMovie={handleCreateMovie}
                     // handleDeleteMovie={handleDeleteMovie}
                    />
                  }
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={
                    <SavedMoviesPage
                      isLoggedIn={isLoggedIn}
                      handleDeleteMovie={handleDeleteMovie}
                      // isSearchSavedMovies={isSearchSavedMovies}
                      // setIsSearchSavedMovies={setIsSearchSavedMovies}
                   //   filteredSavedMovies={filteredSavedMovies}
                      savedMovies={savedMovies}
                    //  setFilteredSavedMovies={setFilteredSavedMovies}
                      // isLoadingSavedMovies={isLoadingSavedMovies}
                      // setIsLoadingSavedMovies={setIsLoadingSavedMovies}
                     // isLoadingMovies={isLoadingMovies}
                    />
                  }
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={
                    <ProfilePage
                      isLoggedIn={isLoggedIn}
                      isLoading={isLoading}
                      handleUpdateUser={handleUpdateUser}
                      isEdit={isEdit}
                      setIsEdit={setIsEdit}
                      handleLogout={handleLogout}
                      error={error}
                      setError={setError}
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
                    isLoading={isLoading}
                    error={error}
                    setError={setError}
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
                    isLoading={isLoading}
                    error={error}
                    setError={setError}
                  />
                )
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <InfoPopup
          isOpen={isSuccessPopup}
          onClose={closePopupSuccess}
          isError={isError}
          error={successPopupText}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}







/////////////////////////////////////////////////
// /* eslint-disable react-hooks/exhaustive-deps */
// import { useState, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./App.css";

// import MainPage from "../../pages/MainPage";
// import MoviesPage from "../../pages/MoviesPage";
// import RegisterPage from "../../pages/RegisterPage";
// import LoginPage from "../../pages/LoginPage";
// import NotFoundPage from "../../pages/NotFoundPage";
// import SavedMoviesPage from "../../pages/SavedMoviesPage";
// import ProfilePage from "../../pages/ProfilePage";
// import InfoPopup from "../InfoPopup/InfoPopup";

// import CurrentUserContext from "../../contexts/CurrentUserContext";
// import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
// import * as mainApi from "../../utils/MainApi";
// import * as moviesApi from "../../utils/MoviesApi";

// import {
//   UNAUTHORIZED,
//   UNAUTHORIZED_TEXT,
//   CONFLICT,
//   CONFLICT_TEXT,
//   SERVER_ERROR,
//   SERVER_ERROR_TEXT,
// } from "../../utils/errors";

// export default function App() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isLoggedIn, setIsLoggedIn] = useState(true); //состояние авторизации пользователя
//   const [isLoading, setIsLoading] = useState(false); //индикатор загрузки профиль логин регист
//   // const [isLoadingSavedMovies, setIsLoadingSavedMovies] = useState(false); //индикатор загрузки сохраненных фильмов
//   const [isLoadingMovies, setIsLoadingMovies] = useState(false); //индикатор загрузки фильмов
//   const [isSuccessPopup, setIsSuccessPopup] = useState(false); //попап успеха сохранения данных
//   const [isError, setIsError] = useState(false);
//   const [error, setError] = useState("");
//   const [isEdit, setIsEdit] = useState(false);//отрисовка кнопки редакт сохран
//   const [successPopupText, setSuccessPopupText] = useState("");// текст попапа успешного сохранения и изменения
//   const [currentUser, setCurrentUser] = useState({}); //получение данных
//   const [movies, setMovies] = useState([]);//массив с фильмами
//   const [savedMovies, setSavedMovies] = useState([]); //массив сохраненных фильмов
//   // const [isSearchMovies, setIsSearchMovies] = useState(false);
//   // const [isSearchSavedMovies, setIsSearchSavedMovies] = useState(false);
//   // const [filteredMovies, setFilteredMovies] = useState(
//   //   JSON.parse(localStorage.getItem("filteredMovies")) || []
//   // );//отрисовывает фильмы
//   const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

//   // загрузка сохраненных фильмов и профиля пользователя
//   useEffect(() => {
//     if (localStorage.token) {
//       Promise.all([
//         mainApi.getUserInfo(localStorage.token),
//         mainApi.getSavedMovies(localStorage.token),
//       ])
//         .then(([userInfo, dataMovies]) => {
//           setCurrentUser(userInfo);
//           setSavedMovies(dataMovies);
//           setIsLoggedIn(true);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, [isLoggedIn]);

//   //проверка токена каждый раз при открытии страницы
//   useEffect(() => {
//     handleCheckUser();
//   }, []);

//   //проверка токена пользователя
//   function handleCheckUser() {
//     const jwt = localStorage.getItem("token");

//     if (jwt)
//       mainApi
//         .checkToken(jwt)
//         .then((res) => {
//           if (res) {
//             setIsLoggedIn(true);
//             setCurrentUser(res);
//           } else {
//             setIsLoggedIn(false);
//           }
//         })
//         .catch((err) => console.log(`Ошибка при проверке токена: ${err}`));
//   };

//   useEffect(() => {
//     setIsLoadingMovies(true);
//     if (isLoggedIn) {
//       moviesApi
//         .getAllMovies()
//         .then((movies) => {
//           setMovies(movies);
//           setSavedMovies(savedMovies);
//           setFilteredSavedMovies(savedMovies);
//           setIsLoadingMovies(true);
//         })
//         .catch((err) => {
//           setIsLoadingMovies(false);
//           console.log(`Возникла ошибка: ${err}`);
//         });
//     }
//   }, [isLoggedIn]);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsSuccessPopup(false);
//     }, 2000);
//   }, [isSuccessPopup]);

//   function handleLogin(email, password) {
//     setIsLoading(true);
//     mainApi
//       .login(email, password)
//       .then((res) => {
//         setIsLoggedIn(true);
//         localStorage.setItem("token", res.token);
//         navigate("/movies");
//         setIsLoading(false);
//         setIsSuccessPopup(true);
//         setIsError(true);
//         setSuccessPopupText("Успешный вход в аккаунт. Добро пожаловать!");
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         console.log(`Возникла ошибка: ${err}`);
//         if (err === UNAUTHORIZED) {
//           setError(UNAUTHORIZED_TEXT);
//         } else if (err === SERVER_ERROR) {
//           setError(SERVER_ERROR_TEXT);
//         } else {
//           setError("При авторизации произошла ошибка.");
//         }
//       });
//   };

//   function handleRegister(name, email, password) {
//     setIsLoading(true);
//     setIsError(true);
//     mainApi
//       .register(name, email, password)
//       .then((res) => {
//         if (res) handleLogin(email, password);
//         setIsLoggedIn(false);
//         setIsLoading(false);
//         setIsSuccessPopup(true);
//         setIsError(true);
//         setSuccessPopupText("Регистрация прошла успешно. Добро пожаловать!");
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         console.log(`Возникла ошибка: ${err}`);
//         if (err === CONFLICT) {
//           setError(CONFLICT_TEXT);
//         } else if (err === SERVER_ERROR) {
//           setError(SERVER_ERROR_TEXT);
//         } else {
//           setError("При регистрации пользователя произошла ошибка.");
//         }
//       });
//   };

//   // обновление информации о пользователе
//   function handleUpdateUser(data) {
//     setIsLoading(true);
//     mainApi
//       .editUserInfo(data, localStorage.token)
//       .then((res) => {
//         setCurrentUser(res);
//         setIsLoading(false);
//         setIsEdit(false);
//         setIsSuccessPopup(true);
//         setIsError(true);
//         setSuccessPopupText("Данные успешно сохранены!");
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         console.log(`Возникла ошибка: ${err}`);
//         if (err === CONFLICT) {
//           setError(CONFLICT_TEXT);
//         } else if (err === SERVER_ERROR) {
//           setError(SERVER_ERROR_TEXT);
//         } else {
//           setError("При обновлении данных произошла ошибка.");
//         }
//       });
//   };

//   //выход из аккаунта
//   function handleLogout() {
//     localStorage.clear();
//     setIsLoggedIn(false);
//     navigate("/");
//   };

  
//   function handleCreateMovie (
//     country,
//     director,
//     duration,
//     year,
//     description,
//     image,
//     trailerLink,
//     thumbnail,
//     nameRU,
//     nameEN,
//     movieId,
//     setIsSave
//   ) {
//     setIsLoadingMovies(true);
//     mainApi
//       .createMovie(
//         country,
//         director,
//         duration,
//         year,
//         description,
//         image,
//         trailerLink,
//         thumbnail,
//         nameRU,
//         nameEN,
//         movieId,
//         localStorage.token
//       )
//       .then((newSavedMovie) => {
//         setIsLoadingMovies(true);
//         setIsSave(true);
//         setSavedMovies((prevState) => [...prevState, newSavedMovie]);
//         setFilteredSavedMovies((prevState) => [...prevState, newSavedMovie]);
//       })
//       .catch((err) => {
//         setIsLoadingMovies(false);
//         console.log(`Возникла ошибка: ${err}`);
//       });
//   };

//   //удаление карточки с фильмом
//   function handleDeleteMovie(id, setIsSave) {
//     setIsLoadingMovies(true);
//     mainApi
//       .deleteMovie(id, localStorage.token)
//       .then(() => {
//         setIsLoadingMovies(true);
//         setIsSave(false);
//         setSavedMovies((prevState) =>
//           prevState.filter((item) => item._id !== id)
//         );
//         setFilteredSavedMovies((prevState) =>
//           prevState.filter((item) => item._id !== id)
//         );
//       })
//       .catch((err) => {
//         setIsLoadingMovies(false);
//         console.log(`Ошибка при удалении фильма: ${err}`);
//       });
//   };

//   // закрытие попапов успешного сохранения, редактирования
//   function closePopupSuccess() {
//     setIsSuccessPopup(false);
//   };

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="body">
//         <div className="page">
//           <Routes>
//             <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} />} />
//             <Route
//               path="/movies"
//               element={
//                 <ProtectedRoute
//                   isLoggedIn={isLoggedIn}
//                   element={
//                     <MoviesPage
//                       isLoggedIn={isLoggedIn}
//                       isLoading={isLoading}
//                       isLoadingMovies={isLoadingMovies}
//                       movies={movies}
//                       savedMovies={savedMovies}
//                       // setIsSearchMovies={setIsSearchMovies}
//                       // isSearchMovies={isSearchMovies}
//                       // filteredMovies={filteredMovies}
//                       // setFilteredMovies={setFilteredMovies}
//                       handleCreateMovie={handleCreateMovie}
//                       handleDeleteMovie={handleDeleteMovie}
//                     />
//                   }
//                 />
//               }
//             />
//             <Route
//               path="/saved-movies"
//               element={
//                 <ProtectedRoute
//                   isLoggedIn={isLoggedIn}
//                   element={
//                     <SavedMoviesPage
//                       isLoggedIn={isLoggedIn}
//                       handleDeleteMovie={handleDeleteMovie}
//                       // isSearchSavedMovies={isSearchSavedMovies}
//                       // setIsSearchSavedMovies={setIsSearchSavedMovies}
//                       filteredSavedMovies={filteredSavedMovies}
//                       savedMovies={savedMovies}
//                       setFilteredSavedMovies={setFilteredSavedMovies}
//                       // isLoadingSavedMovies={isLoadingSavedMovies}
//                       // setIsLoadingSavedMovies={setIsLoadingSavedMovies}
//                       isLoadingMovies={isLoadingMovies}
//                     />
//                   }
//                 />
//               }
//             />
//             <Route
//               path="/profile"
//               element={
//                 <ProtectedRoute
//                   isLoggedIn={isLoggedIn}
//                   element={
//                     <ProfilePage
//                       isLoggedIn={isLoggedIn}
//                       isLoading={isLoading}
//                       handleUpdateUser={handleUpdateUser}
//                       isEdit={isEdit}
//                       setIsEdit={setIsEdit}
//                       handleLogout={handleLogout}
//                       error={error}
//                       setError={setError}
//                     />
//                   }
//                 />
//               }
//             />
//             <Route
//               path="/signup"
//               element={
//                 isLoggedIn && location.pathname === "/signup" ? (
//                   navigate("/movies")
//                 ) : (
//                   <RegisterPage
//                     handleRegister={handleRegister}
//                     isLoading={isLoading}
//                     error={error}
//                     setError={setError}
//                   />
//                 )
//               }
//             />
//             <Route
//               path="/signin"
//               element={
//                 isLoggedIn && location.pathname === "/signin" ? (
//                   navigate("/movies")
//                 ) : (
//                   <LoginPage
//                     handleLogin={handleLogin}
//                     isLoading={isLoading}
//                     error={error}
//                     setError={setError}
//                   />
//                 )
//               }
//             />
//             <Route path="*" element={<NotFoundPage />} />
//           </Routes>
//         </div>
//         <InfoPopup
//           isOpen={isSuccessPopup}
//           onClose={closePopupSuccess}
//           isError={isError}
//           error={successPopupText}
//         />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }





// /* eslint-disable react-hooks/exhaustive-deps */
// import { useState, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./App.css";

// import MainPage from "../../pages/MainPage";
// import MoviesPage from "../../pages/MoviesPage";
// import RegisterPage from "../../pages/RegisterPage";
// import LoginPage from "../../pages/LoginPage";
// import NotFoundPage from "../../pages/NotFoundPage";
// import SavedMoviesPage from "../../pages/SavedMoviesPage";
// import ProfilePage from "../../pages/ProfilePage";
// import InfoPopup from "../InfoPopup/InfoPopup";

// import CurrentUserContext from "../../contexts/CurrentUserContext";
// import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
// import * as mainApi from "../../utils/MainApi";
// import * as moviesApi from "../../utils/MoviesApi";

// import {
//   UNAUTHORIZED,
//   UNAUTHORIZED_TEXT,
//   CONFLICT,
//   CONFLICT_TEXT,
//   SERVER_ERROR,
//   SERVER_ERROR_TEXT,
// } from "../../utils/errors";

// export default function App() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isLoggedIn, setIsLoggedIn] = useState(true); //состояние авторизации пользователя
//   const [isLoading, setIsLoading] = useState(false); //индикатор загрузки профиль логин регист
//   const [isLoadingSavedMovies, setIsLoadingSavedMovies] = useState(false); //индикатор загрузки сохраненных фильмов
//   const [isLoadingMovies, setIsLoadingMovies] = useState(false); //индикатор загрузки фильмов
//   const [isSuccessPopup, setIsSuccessPopup] = useState(false); //попап успеха сохранения данных
//   const [isError, setIsError] = useState(false);
//   const [error, setError] = useState("");
//   const [isEdit, setIsEdit] = useState(false);//отрисовка кнопки редакт сохран
//   const [successPopupText, setSuccessPopupText] = useState("");// текст попапа успешного сохранения и изменения
//   const [currentUser, setCurrentUser] = useState({}); //получение данных
//   const [movies, setMovies] = useState([]);//массив с фильмами
//   const [savedMovies, setSavedMovies] = useState([]); //массив сохраненных фильмов
//   const [isSearchMovies, setIsSearchMovies] = useState(false);
//   const [isSearchSavedMovies, setIsSearchSavedMovies] = useState(false);
//   const [filteredMovies, setFilteredMovies] = useState(
//     JSON.parse(localStorage.getItem("filteredMovies")) || []
//   );//отрисовывает фильмы
//   const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

//   // загрузка сохраненных фильмов и профиля пользователя
//   useEffect(() => {
//     if (localStorage.token) {
//       Promise.all([
//         mainApi.getUserInfo(localStorage.token),
//         mainApi.getSavedMovies(localStorage.token),
//       ])
//         .then(([userInfo, dataMovies]) => {
//           setCurrentUser(userInfo);
//           setSavedMovies(dataMovies);
//           setIsLoggedIn(true);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, [isLoggedIn]);

//   //проверка токена каждый раз при открытии страницы
//   useEffect(() => {
//     handleCheckUser();
//   }, []);

//   //проверка токена пользователя
//   function handleCheckUser() {
//     const jwt = localStorage.getItem("token");

//     if (jwt)
//       mainApi
//         .checkToken(jwt)
//         .then((res) => {
//           if (res) {
//             setIsLoggedIn(true);
//             setCurrentUser(res);
//           } else {
//             setIsLoggedIn(false);
//           }
//         })
//         .catch((err) => console.log(`Ошибка при проверке токена: ${err}`));
//   };

//   useEffect(() => {
//     setIsLoadingMovies(true);
//     if (isLoggedIn) {
//       moviesApi
//         .getAllMovies()
//         .then((movies) => {
//           setMovies(movies);
//           setSavedMovies(savedMovies);
//           setFilteredSavedMovies(savedMovies);
//           setIsLoadingMovies(true);
//         })
//         .catch((err) => {
//           setIsLoadingMovies(false);
//           console.log(`Возникла ошибка: ${err}`);
//         });
//     }
//   }, [isLoggedIn]);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsSuccessPopup(false);
//     }, 2000);
//   }, [isSuccessPopup]);

//   function handleLogin(email, password) {
//     setIsLoading(true);
//     mainApi
//       .login(email, password)
//       .then((res) => {
//         setIsLoggedIn(true);
//         localStorage.setItem("token", res.token);
//         navigate("/movies");
//         setIsLoading(false);
//         setIsSuccessPopup(true);
//         setIsError(true);
//         setSuccessPopupText("Успешный вход в аккаунт. Добро пожаловать!");
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         console.log(`Возникла ошибка: ${err}`);
//         if (err === UNAUTHORIZED) {
//           setError(UNAUTHORIZED_TEXT);
//         } else if (err === SERVER_ERROR) {
//           setError(SERVER_ERROR_TEXT);
//         } else {
//           setError("При авторизации произошла ошибка.");
//         }
//       });
//   };

//   function handleRegister(name, email, password) {
//     setIsLoading(true);
//     setIsError(true);
//     mainApi
//       .register(name, email, password)
//       .then((res) => {
//         if (res) handleLogin(email, password);
//         setIsLoggedIn(false);
//         setIsLoading(false);
//         setIsSuccessPopup(true);
//         setIsError(true);
//         setSuccessPopupText("Регистрация прошла успешно. Добро пожаловать!");
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         console.log(`Возникла ошибка: ${err}`);
//         if (err === CONFLICT) {
//           setError(CONFLICT_TEXT);
//         } else if (err === SERVER_ERROR) {
//           setError(SERVER_ERROR_TEXT);
//         } else {
//           setError("При регистрации пользователя произошла ошибка.");
//         }
//       });
//   };

//   // обновление информации о пользователе
//   function handleUpdateUser(data) {
//     setIsLoading(true);
//     mainApi
//       .editUserInfo(data, localStorage.token)
//       .then((res) => {
//         setCurrentUser(res);
//         setIsLoading(false);
//         setIsEdit(false);
//         setIsSuccessPopup(true);
//         setIsError(true);
//         setSuccessPopupText("Данные успешно сохранены!");
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         console.log(`Возникла ошибка: ${err}`);
//         if (err === CONFLICT) {
//           setError(CONFLICT_TEXT);
//         } else if (err === SERVER_ERROR) {
//           setError(SERVER_ERROR_TEXT);
//         } else {
//           setError("При обновлении данных произошла ошибка.");
//         }
//       });
//   };

//   //выход из аккаунта
//   function handleLogout() {
//     localStorage.clear();
//     setIsLoggedIn(false);
//     navigate("/");
//   };

  
//   function handleCreateMovie (
//     country,
//     director,
//     duration,
//     year,
//     description,
//     image,
//     trailerLink,
//     thumbnail,
//     nameRU,
//     nameEN,
//     movieId,
//     setIsSave
//   ) {
//     setIsLoadingMovies(true);
//     mainApi
//       .createMovie(
//         country,
//         director,
//         duration,
//         year,
//         description,
//         image,
//         trailerLink,
//         thumbnail,
//         nameRU,
//         nameEN,
//         movieId,
//         localStorage.token
//       )
//       .then((newSavedMovie) => {
//         setIsLoadingMovies(true);
//         setIsSave(true);
//         setSavedMovies((prevState) => [...prevState, newSavedMovie]);
//         setFilteredSavedMovies((prevState) => [...prevState, newSavedMovie]);
//       })
//       .catch((err) => {
//         setIsLoadingMovies(false);
//         console.log(`Возникла ошибка: ${err}`);
//       });
//   };

//   //удаление карточки с фильмом
//   function handleDeleteMovie(id, setIsSave) {
//     setIsLoadingMovies(true);
//     mainApi
//       .deleteMovie(id, localStorage.token)
//       .then(() => {
//         setIsLoadingMovies(true);
//         setIsSave(false);
//         setSavedMovies((prevState) =>
//           prevState.filter((item) => item._id !== id)
//         );
//         setFilteredSavedMovies((prevState) =>
//           prevState.filter((item) => item._id !== id)
//         );
//       })
//       .catch((err) => {
//         setIsLoadingMovies(false);
//         console.log(`Ошибка при удалении фильма: ${err}`);
//       });
//   };

//   // закрытие попапов успешного сохранения, редактирования
//   function closePopupSuccess() {
//     setIsSuccessPopup(false);
//   };

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="body">
//         <div className="page">
//           <Routes>
//             <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} />} />
//             <Route
//               path="/movies"
//               element={
//                 <ProtectedRoute
//                   isLoggedIn={isLoggedIn}
//                   element={
//                     <MoviesPage
//                       isLoggedIn={isLoggedIn}
//                       isLoading={isLoading}
//                       isLoadingMovies={isLoadingMovies}
//                       movies={movies}
//                       savedMovies={savedMovies}
//                       setIsSearchMovies={setIsSearchMovies}
//                       isSearchMovies={isSearchMovies}
//                       filteredMovies={filteredMovies}
//                       setFilteredMovies={setFilteredMovies}
//                       handleCreateMovie={handleCreateMovie}
//                       handleDeleteMovie={handleDeleteMovie}
//                     />
//                   }
//                 />
//               }
//             />
//             <Route
//               path="/saved-movies"
//               element={
//                 <ProtectedRoute
//                   isLoggedIn={isLoggedIn}
//                   element={
//                     <SavedMoviesPage
//                       isLoggedIn={isLoggedIn}
//                       handleDeleteMovie={handleDeleteMovie}
//                       isSearchSavedMovies={isSearchSavedMovies}
//                       setIsSearchSavedMovies={setIsSearchSavedMovies}
//                       filteredSavedMovies={filteredSavedMovies}
//                       savedMovies={savedMovies}
//                       setFilteredSavedMovies={setFilteredSavedMovies}
//                       isLoadingSavedMovies={isLoadingSavedMovies}
//                       setIsLoadingSavedMovies={setIsLoadingSavedMovies}
//                       isLoadingMovies={isLoadingMovies}
//                     />
//                   }
//                 />
//               }
//             />
//             <Route
//               path="/profile"
//               element={
//                 <ProtectedRoute
//                   isLoggedIn={isLoggedIn}
//                   element={
//                     <ProfilePage
//                       isLoggedIn={isLoggedIn}
//                       isLoading={isLoading}
//                       handleUpdateUser={handleUpdateUser}
//                       isEdit={isEdit}
//                       setIsEdit={setIsEdit}
//                       handleLogout={handleLogout}
//                       error={error}
//                       setError={setError}
//                     />
//                   }
//                 />
//               }
//             />
//             <Route
//               path="/signup"
//               element={
//                 isLoggedIn && location.pathname === "/signup" ? (
//                   navigate("/movies")
//                 ) : (
//                   <RegisterPage
//                     handleRegister={handleRegister}
//                     isLoading={isLoading}
//                     error={error}
//                     setError={setError}
//                   />
//                 )
//               }
//             />
//             <Route
//               path="/signin"
//               element={
//                 isLoggedIn && location.pathname === "/signin" ? (
//                   navigate("/movies")
//                 ) : (
//                   <LoginPage
//                     handleLogin={handleLogin}
//                     isLoading={isLoading}
//                     error={error}
//                     setError={setError}
//                   />
//                 )
//               }
//             />
//             <Route path="*" element={<NotFoundPage />} />
//           </Routes>
//         </div>
//         <InfoPopup
//           isOpen={isSuccessPopup}
//           onClose={closePopupSuccess}
//           isError={isError}
//           error={successPopupText}
//         />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }
