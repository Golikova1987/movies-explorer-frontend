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

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const path = location.pathname;

  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const checkUser = () => {
    mainApi
      .getUserInfo()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
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
      Promise.all([moviesApi.getAllMovies(), mainApi.getMovies()])
        .then(([movies, savedMovies]) => {
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
    checkUser();
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
      .then(() => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
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
      .then(() => {
        handleLogin(email, password);
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

  const handleUpdateUser = (name, email) => {
    setIsLoading(true);
    mainApi
      .editUserInfo(name, email)
      .then((userInfo) => {
        setCurrentUser(userInfo);
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



  // useEffect(() => {
  //   checkUser();
  // }, [isLoggedIn]);

  // useEffect(() => {
  //   setIsLoadingMovies(true);
  //   if (localStorage.token) {
  //     Promise.all([mainApi.getUserInfo(localStorage.token), mainApi.getMovies(localStorage.token)])
  //       .then(([userInfo, savedMovies]) => {
  //         setCurrentUser(userInfo);
  //         setMovies(movies);
  //         setSavedMovies(savedMovies);
  //         setFilteredSavedMovies(savedMovies);
  //         setIsLoadingMovies(true);
  //       })
  //       .catch((err) => {
  //         setIsLoadingMovies(false);
  //         console.log(`Возникла ошибка: ${err}`);
  //       });
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [isLoggedIn]);

  // function checkUser() {
  //   const jwt = localStorage.getItem("token");
  //   if (jwt) {
  //     mainApi
  //     .checkToken(jwt)
  //     .then((res) => {
  //       if (res) {
  //         setCurrentUser(res);
  //         setIsLoggedIn(true);
  //         navigate(path, { replace: true });
  //       } else {
  //         setIsLoggedIn(false);
  //       }
  //     })
  //     .catch((err) => console.log(`Возникла ошибка: ${err}`));
  //   }
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsStatusPopupOpen(false);
  //   }, 2000);
  // }, [isStatusPopupOpen]);

  // const handleLogin = (email, password) => {
  //   setIsLoading(true);
  //   mainApi
  //     .login(email, password)
  //     .then(() => {
  //       setIsLoggedIn(true);
  //       // localStorage.setItem("isLoggedIn", JSON.stringify(true));
  //       localStorage.setItem('token', res.token);
  //       navigate("/movies",  { replace: true });
  //       setIsLoading(false);
  //       setIsStatusPopupOpen(true);
  //       setIsStatus(true);
  //       setTextPopup("Успешный вход в аккаунт. Добро пожаловать!");
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //       console.log(`Возникла ошибка: ${err}`);
  //       if (err === UNAUTHORIZED) {
  //         setStatus(UNAUTHORIZED_TEXT);
  //       } else if (err === SERVER_ERROR) {
  //         setStatus(SERVER_ERROR_TEXT);
  //       } else {
  //         setStatus("При авторизации произошла ошибка.");
  //       }
  //     });
  // };

  // const handleRegister = (name, email, password) => {
  //   setIsLoading(true);
  //   setIsStatus(true);
  //   mainApi
  //     .register(name, email, password)
  //     .then(() => {
  //       handleLogin(email, password);
  //       setIsLoading(false);
  //       setIsStatusPopupOpen(true);
  //       setIsStatus(true);
  //       setTextPopup("Регистрация прошла успешно. Добро пожаловать!");
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //       console.log(`Возникла ошибка: ${err}`);
  //       if (err === CONFLICT) {
  //         setStatus(CONFLICT_TEXT);
  //       } else if (err === SERVER_ERROR) {
  //         setStatus(SERVER_ERROR_TEXT);
  //       } else {
  //         setStatus("При регистрации пользователя произошла ошибка.");
  //       }
  //     });
  // };

  // const handleUpdateUser = (data) => {
  //   setIsLoading(true);
  //   mainApi
  //     .editUserInfo(data, localStorage.token)
  //     .then((userInfo) => {
  //       setCurrentUser(userInfo);
  //       setIsLoading(false);
  //       setIsEdit(false);
  //       setIsStatusPopupOpen(true);
  //       setIsStatus(true);
  //       setTextPopup("Данные успешно сохранены!");
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //       console.log(`Возникла ошибка: ${err}`);
  //       if (err === CONFLICT) {
  //         setStatus(CONFLICT_TEXT);
  //       } else if (err === SERVER_ERROR) {
  //         setStatus(SERVER_ERROR_TEXT);
  //       } else {
  //         setStatus("При обновлении профиля произошла ошибка.");
  //       }
  //     });
  // };

  const handleSignOut = () => {
    mainApi
      .deleteCookies()
      .then((res) => {
        if (res) {
          setIsLoggedIn(false);
          navigate("/");
          localStorage.clear();
          setFilteredMovies([]);
          setIsSearchMovies(false);
        }
      })
      .catch((err) => console.log(`Возникла ошибка: ${err}`));
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
        movieId
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
      .deleteMovie(id)
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

//laiv

// import React, { useState, useEffect, useCallback } from "react";
// import "./App.css";
// import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
// // import apiMovies from "../../utils/MoviesApi";
// import apiMain from "../../utils/MainApi";
// // import SendContext from '../context/SendContext';
// // import Preloader from '../Preloader/Preloader';
// import CurrentUserContext from "../../contexts/CurrentUserContext";
// import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

// import MainPage from "../../pages/Main";
// import MoviesPage from "../../pages/Movies";
// import SavedMoviesPage from "../../pages/SavedMovies";
// import LoginPage from "../../pages/Login";
// import RegisterPage from "../../pages/Register";
// import ProfilePage from "../../pages/Profile";
// import NotFound from "../../pages/NotFound";

// function App() {
// const [loggedIn, setLoggedIn] = useState(false);//пользователь залогинился
// const navigate = useNavigate();
// const [isSend, setIsSend] = useState(false);//отправка
// const [currentUser, setCurrentUser] = useState({});//объект usera
// const [savedMovies, setSavedMovies] = useState([]);//массив фильмов сохраненных
// const [isError, setIsError] = useState(false);
// const [isCheckToken, setIsCheckToken] = useState(true);//проверяет токен при каждом входе
// const [isSuccess, setIsSuccess] = useState(false);//уведомлен пользователя о успешном редактированиии профиля
// const [isEdit, setIsEdit] = useState(false);//редактирование профиля кнопка

// useEffect(() => {
//   if (localStorage.jwt) {
//     Promise.all([apiMain.getUserData(localStorage.jwt), apiMain.getMovies(localStorage.jwt)])
//       .then(([userData, dataMovies]) => {
//         setSavedMovies(dataMovies.reverse())
//         setCurrentUser(userData)
//         setLoggedIn(true)
//         setIsCheckToken(false)
//       })
//       .catch((err) => {
//         console.error(`Ошибка при загрузке начальных данных ${err}`)
//         setIsCheckToken(false)
//         localStorage.clear() 
//       })
//   } else {
//     setLoggedIn(false)
//     setIsCheckToken(false)
//     localStorage.clear()
//   }
// }, [loggedIn])

// const setSuccess = useCallback(() => {
//   setIsSuccess(false)
// }, [])

// function logOut() {
//   localStorage.clear()
//   setLoggedIn(false)
//   navigate('/')
// }

// function handleDeleteMovie(deletemovieId) {
//   apiMain.deleteMovie(deletemovieId, localStorage.jwt)
//     .then(() => {
//       setSavedMovies(savedMovies.filter(movie => { return movie._id !== deletemovieId }))
//     })
//     .catch((err) => console.error(`Ошибка при удалении фильма ${err}`))
// }

// function handleToggleMovie(data) {
//   const isAdd = savedMovies.some(element => data.id === element.movieId)
//   const seachClickMovie = savedMovies.filter((movie) => {
//     return movie.movieId === data.id
//   })
//   if (isAdd) {
//     handleDeleteMovie(seachClickMovie[0]._id)
//   } else {
//     apiMain.addMovie(data, localStorage.jwt)
//       .then(res => {
//         setSavedMovies([res, ...savedMovies])
//       })
//       .catch((err) => console.error(`Ошибка при установке лайка ${err}`))
//   }
// }

// function handleLogin(email, password) {
//   setIsSend(true)
//   apiMain.Main.authorization(email, password)
//     .then(res => {
//       localStorage.setItem('jwt', res.token)
//       setLoggedIn(true)
//       navigate('/movies')
//       window.scrollTo(0, 0)
//     })
//     .catch((err) => {
//       setIsError(true)
//       console.error(`Ошибка авторизации ${err}`)
//     })
//     .finally(() => setIsSend(false))
// }

// function handleRegister(name, email, password) {
//   setIsSend(true)
//   apiMain.registration(name, email, password)
//     .then((res) => {
//       if (res) {
//         setLoggedIn(false)
//         apiMain.authorization(email, password)
//           .then(res => {
//             localStorage.setItem('jwt', res.token)
//             setLoggedIn(true)
//             navigate('movies')
//             window.scrollTo(0, 0)
//           })
//           .catch((err) => {
//             setIsError(true)
//             console.error(`Ошибка при авторизации после регистрации ${err}`)
//           })
//           .finally(() => setIsSend(false))
//       }
//     })
//     .catch((err) => {
//       setIsError(true)
//       console.error(`Ошибка при регистрации ${err}`)
//     })
//     .finally(() => setIsSend(false))
// }

// function editUserData(name, email) {
//   setIsSend(true)
//   apiMain.setUserInfo(name, email, localStorage.jwt)
//     .then(res => {
//       setCurrentUser(res)
//       setIsSuccess(true)
//       setIsEdit(false)
//     })
//     .catch((err) => {
//       setIsError(true)
//       console.error(`Ошибка при редактировании данных пользователя ${err}`)
//     })
//     .finally(() => setIsSend(false))
// }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page__container">
//         {/* {isCheckToken ? <Preloader/> : */}
//           <Routes>
//             <Route path="/" 
//               element={<MainPage 
//                 name='home' 
//                 loggedIn={loggedIn} 
//                 />} />
//             <Route
//               path="/movies"
//               element={
//                 <ProtectedRoute
//                   loggedIn={loggedIn}
//                   element={MoviesPage}
//                   name='movies'
//                   savedMovies={savedMovies}
//                   addMovie={handleToggleMovie}
//                   setIsError={setIsError}
//                 />
//               }
//             />
//             <Route
//               path="/saved-movies"
//               element={
//                 <ProtectedRoute
//                   loggedIn={loggedIn}
//                   element={SavedMoviesPage}
//                   name='savedmovies'
//                   setIsError={setIsError}
//                   onDelete={handleDeleteMovie}
//                 />
//               }
//             />
//             <Route
//               path="/signup" element={
//                 loggedIn ? <Navigate to='/movies' replace /> :
//               <RegisterPage
//                 name='signup'
//                 onRegister={handleRegister}
//                 setIsError={setIsError}
//               />
//               }
//             />
//             <Route
//               path="/signin" element={
//                 loggedIn ? <Navigate to='/movies' replace /> :
//                 <LoginPage
//                   name='signin'
//                   onLogin={handleLogin}
//                   setIsError={setIsError}
//                 />
//               }
//             />
//             <Route
//               path="/profile"
//               element={<ProtectedRoute
//                   loggedIn={loggedIn}
//                   element={ProfilePage}
//                   name='profile'
//                   logOut={logOut}
//                   editUserData={editUserData}
//                   setIsError={setIsError}
//                   isSuccess={isSuccess}
//                   setSuccess={setSuccess}
//                   setIsEdit={setIsEdit}
//                 />
//               }
//             />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         {/* } */}
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// export default App;





// import React, { useState, useEffect } from "react";
// import "./App.css";
// import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
// import InfoTooltip from "../InfoTooltip/InfoTooltip";
// // import {
// //   ProtectedRouteAuthorized,
// //   ProtectedRouteUnauthorized,
// // } from "../ProtectedRoute/ProtectedRoute";
// import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
// import CurrentUserContext from "../../contexts/CurrentUserContext";

// import MainPage from "../../pages/Main";
// import MoviesPage from "../../pages/Movies";
// import SavedMoviesPage from "../../pages/SavedMovies";
// import LoginPage from "../../pages/Login";
// import RegisterPage from "../../pages/Register";
// import ProfilePage from "../../pages/Profile";
// import NotFound from "../../pages/NotFound";
// // import apiMain from "../../utils/MainApi";
// import * as mainApi from "../../utils/MainApi";
// import * as moviesApi from "../../utils/MoviesApi";

// import {
//   CONFLICT,
//   SERVER_ERROR,
//   UNAUTHORIZED,
//   SERVER_ERROR_TEXT,
//   CONFLICT_TEXT,
//   UNAUTHORIZED_TEXT,
// } from "../../utils/errors";
// // import apiMovies from "../../utils/MoviesApi";

// function App() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isStatus, setIsStatus] = useState(false);
//   const [isStatusPopupOpen, setIsStatusPopupOpen] = useState(false);
//   const [textPopup, setTextPopup] = useState("");
//   const [status, setStatus] = useState("");
//   const [currentUser, setCurrentUser] = useState({});
//   const [loggedIn, setLoggedIn] = useState(
//     JSON.parse(localStorage.getItem("loggedIn")) || false
//   );
//   const [isLoadingMovies, setIsLoadingMovies] = useState(false);
//   const [isLoadingSavedMovies, setIsLoadingSavedMovies] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [movies, setMovies] = useState([]);
//   const [filteredMovies, setFilteredMovies] = useState(
//     JSON.parse(localStorage.getItem("filteredMovies")) || []
//   );
//   const [savedMovies, setSavedMovies] = useState([]);
//   const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
//   const [isSearchMovies, setIsSearchMovies] = useState(false);
//   const [isSearchSavedMovies, setIsSearchSavedMovies] = useState(false);


//   const checkUser = () => {
//     mainApi
//       .getUserInfo()
//       .then((res) => {
//         if (res) {
//           setLoggedIn(true);
//           localStorage.setItem("loggedIn", JSON.stringify(true));
//           setCurrentUser(res);
//         } else {
//           setLoggedIn(false);
//         }
//       })
//       .catch((err) => console.log(`Возникла ошибка: ${err}`));
//   };

//   useEffect(() => {
//     setIsLoadingMovies(true);
//     if (loggedIn) {
//       Promise.all([moviesApi.getAllMovies(), mainApi.getMovies()])
//         .then(([movies, savedMovies]) => {
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
//   }, [loggedIn]);

//   useEffect(() => {
//     checkUser();
//   }, [loggedIn]);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsStatusPopupOpen(false);
//     }, 2000);
//   }, [isStatusPopupOpen]);


//   const handleLogin = (email, password) => {
//     setIsLoading(true);
//     mainApi
//       .login(email, password)
//       .then(() => {
//         setLoggedIn(true);
//         localStorage.setItem("loggedIn", JSON.stringify(true));
//         navigate("/movies");
//         setIsLoading(false);
//         setIsStatusPopupOpen(true);
//         setIsStatus(true);
//         setTextPopup("Успешный вход в аккаунт. Добро пожаловать!");
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         console.log(`Возникла ошибка: ${err}`);
//         if (err === UNAUTHORIZED) {
//           setStatus(UNAUTHORIZED_TEXT);
//         } else if (err === SERVER_ERROR) {
//           setStatus(SERVER_ERROR_TEXT);
//         } else {
//           setStatus("При авторизации произошла ошибка.");
//         }
//       });
//   };

//   const handleRegister = (name, email, password) => {
//     setIsLoading(true);
//     setIsStatus(true);
//     mainApi
//       .register(name, email, password)
//       .then(() => {
//         handleLogin(email, password);
//         setIsLoading(false);
//         setIsStatusPopupOpen(true);
//         setIsStatus(true);
//         setTextPopup("Регистрация прошла успешно. Добро пожаловать!");
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         console.log(`Возникла ошибка: ${err}`);
//         if (err === CONFLICT) {
//           setStatus(CONFLICT_TEXT);
//         } else if (err === SERVER_ERROR) {
//           setStatus(SERVER_ERROR_TEXT);
//         } else {
//           setStatus("При регистрации пользователя произошла ошибка.");
//         }
//       });
//   };

//   const handleUpdateUser = (name, email) => {
//     setIsLoading(true);
//     mainApi
//       .editUserInfo(name, email)
//       .then((userInfo) => {
//         setCurrentUser(userInfo);
//         setIsLoading(false);
//         setIsEdit(false);
//         setIsStatusPopupOpen(true);
//         setIsStatus(true);
//         setTextPopup("Данные успешно сохранены!");
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         console.log(`Возникла ошибка: ${err}`);
//         if (err === CONFLICT) {
//           setStatus(CONFLICT_TEXT);
//         } else if (err === SERVER_ERROR) {
//           setStatus(SERVER_ERROR_TEXT);
//         } else {
//           setStatus("При обновлении профиля произошла ошибка.");
//         }
//       });
//   };

//   const handleSignOut = () => {
//     mainApi
//       .deleteCookies()
//       .then((res) => {
//         if (res) {
//           setLoggedIn(false);
//           navigate("/");
//           localStorage.clear();
//           setFilteredMovies([]);
//           setIsSearchMovies(false);
//         }
//       })
//       .catch((err) => console.log(`Возникла ошибка: ${err}`));
//   };

//   const handleCreateMovie = (
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
//   ) => {
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
//         movieId
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

//   const handleDeleteMovie = (id, setIsSave) => {
//     setIsLoadingMovies(true);
//     mainApi
//       .deleteMovie(id)
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
//         console.log(`Возникла ошибка: ${err}`);
//       });
//   };

//   const closeStatusPopup = () => {
//     setIsStatusPopupOpen(false);
//   };

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page__container">
//         <Routes>
//           <Route path="/" element={<MainPage loggedIn={loggedIn} />} />
//           <Route
//             path="/movies"
//             element={
//               <ProtectedRoute
//                 loggedIn={loggedIn}
//                 element={<MoviesPage 
//                   loggedIn={loggedIn} 
//                   movies={movies}
//                   isSearchMovies={isSearchMovies}
//                   filteredMovies={filteredMovies}
//                   setFilteredMovies={setFilteredMovies}
//                   savedMovies={savedMovies}
//                   setIsSearchMovies={setIsSearchMovies}
//                   handleCreateMovie={handleCreateMovie}
//                   handleDeleteMovie={handleDeleteMovie}
//                   isLoading={isLoading}
//                   isLoadingMovies={isLoadingMovies}
//                 />}
//               />
//             }
//           />
//           <Route
//             path="/saved-movies"
//             element={
//               <ProtectedRoute
//                 loggedIn={loggedIn}
//                 element={<SavedMoviesPage 
//                   loggedIn={loggedIn} 
//                   filteredSavedMovies={filteredSavedMovies}
//                   savedMovies={savedMovies}
//                   setFilteredSavedMovies={setFilteredSavedMovies}
//                   handleDeleteMovie={handleDeleteMovie}
//                   isSearchSavedMovies={isSearchSavedMovies}
//                   setIsSearchSavedMovies={setIsSearchSavedMovies}
//                   isLoadingSavedMovies={isLoadingSavedMovies}
//                   setIsLoadingSavedMovies={setIsLoadingSavedMovies}
//                   isLoadingMovies={isLoadingMovies}
//                 />}
//               />
//             }
//           />
//           <Route
//             path="/signup"
//             element={
//               loggedIn && location.pathname === "/signup" ? (
//                 navigate("/movies")
//               ) : (
//                 <RegisterPage
//                   handleRegister={handleRegister}
//                   status={status}
//                   setStatus={setStatus}
//                   isLoading={isLoading}
//                 />
//               )
//             }
//           />
//           <Route
//             path="/signin"
//             element={
//               loggedIn && location.pathname === "/signin" ? (
//                 navigate("/movies")
//               ) : (
//                 <LoginPage 
//                   handleLogin={handleLogin}
//                   status={status}
//                   setStatus={setStatus}
//                   isLoading={isLoading} 
//                 />
//               )
//             }
//           />
//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute
//                 loggedIn={loggedIn}
//                 element={
//                   <ProfilePage 
//                   loggedIn={loggedIn} 
//                   handleSignOut={handleSignOut}
//                   status={status}
//                   setStatus={setStatus}
//                   isLoading={isLoading}
//                   handleUpdateUser={handleUpdateUser}
//                   isEdit={isEdit}
//                   setIsEdit={setIsEdit}
//                   />
//                 }
//               />
//             }
//           />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>
//       <InfoTooltip
//           isOpen={isStatusPopupOpen}
//           onClose={closeStatusPopup}
//           isStatus={isStatus}
//           status={textPopup}
//         />
//     </CurrentUserContext.Provider>
//   );
// }

// export default App;

