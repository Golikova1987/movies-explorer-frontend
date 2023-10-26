import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import { useState, useEffect } from "react";
// import ResultSearch from "../ResultSearch/ResultSearch";
import Preloader from "../Preloader/Preloader";
import Button from "../Button/Button";
import MoviesCard from "../MoviesCard/MoviesCard";

import {
  Max_Width_Screen,
  Center_Width_Screen,
  Mobile_Width_Screen,
} from "../../utils/constants";
import displayMovies from "../../utils/displayMovies";
// import { Button } from "react-scroll";

export default function MoviesCardList({
  filterListFilms,
  savedMovies,
  isLoading,
  serverError,
  handleDeleteMovie,
  handleCreateMovie,
  searchInput,
  // handleDeleteMovie,
  // isSearchMovies,
  // handleShowCards,
  // isSearchSavedMovies,
  // visibleCardsCount,
  // isLoadingSavedMovies,
  // setIsLoadingSavedMovies,
  // isLoadingMovies,
  // filteredMovies,
  // savedMovies,
  // filteredSavedMovies,
  // handleCreateMovie,
}) {
  const { pathname } = useLocation();
  const [isNumber, setIsNumber] = useState("");
  const movies = filterListFilms.slice(0, isNumber);

  useEffect(() => {
    if (pathname === "/movies") {
      setIsNumber(displayMovies().cards);

      function resizeDisplayMovies() {
        if (window.innerWidth >= Max_Width_Screen) {
          setIsNumber(displayMovies().cards);
        }
        if (window.innerWidth < Max_Width_Screen) {
          setIsNumber(displayMovies().cards);
        }
        if (window.innerWidth < Center_Width_Screen) {
          setIsNumber(displayMovies().cards);
        }
        if (window.innerWidth < Mobile_Width_Screen) {
          setIsNumber(displayMovies().cards);
        }
      }
      window.addEventListener("resize", resizeDisplayMovies);
      return () => window.removeEventListener("resize", resizeDisplayMovies);
    }
  }, [pathname, filterListFilms]);

  function handleAddButtonClick() {
    setIsNumber(isNumber + displayMovies().add);
  }

  return (
    <section className="movies">
      <ul className="movies__card-list">
        {isLoading ? (
          <Preloader />
        ) : pathname === "/movies" && movies.length !== 0 ? (
          movies.map((movie) => {
            return (
              <MoviesCard
                key={movie.id}
                movie={movie}
                handleCreateMovie={handleCreateMovie}
                savedMovies={savedMovies}
              />
            );
          })
        ) : filterListFilms.length !== 0 ? (
          filterListFilms.map((movie) => {
            return (
              <MoviesCard
                key={movie._id}
                movie={movie}
                handleDeleteMovie={handleDeleteMovie}
              />
            );
          })
        ) : serverError ? (
          <span className="movies__card-error">
            «Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз»
          </span>
        ) : pathname === "/movies" && searchInput.length === 0 ? (
          <span className="movies__card-error">
            «Для получения списка фильмов выполните поиск»
          </span>
        ) : pathname === "/movies" ? (
          <span className="movies__card-error">
            «Ничего не найдено.<br></br>
            Для получения списка фильмов выполните верный поиск»
          </span>
        ) : (
          <span className="movies__card-error">«Нет сохраненных фильмов»</span>
        )}
      </ul>

      {/* <div className="moviescardlist__btn-container"> */}
      {pathname === "/movies" && (
        <Button
          className={`movies__button ${
            isNumber >= filterListFilms.length && "movies__button_hidden"
          }`}
          onClick={handleAddButtonClick}
          type="button"
        >
          Ещё
        </Button>
      )}
      {/* </div> */}
    </section>
  );
}

// import { useLocation } from "react-router-dom";
// import "./MoviesCardList.css";
// import { useState, useEffect } from "react";
// import ResultSearch from "../ResultSearch/ResultSearch";
// import Preloader from "../Preloader/Preloader";
// import Button from "../Button/Button";
// import MoviesCard from "../MoviesCard/MoviesCard";

// export default function MoviesCardList({
//   handleDeleteMovie,
//   isSearchMovies,
//   handleShowCards,
//   isSearchSavedMovies,
//   visibleCardsCount,
//   isLoadingSavedMovies,
//   setIsLoadingSavedMovies,
//   isLoadingMovies,
//   filteredMovies,
//   savedMovies,
//   filteredSavedMovies,
//   handleCreateMovie,
// }) {
//   const location = useLocation();
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1500);
//   }, [filteredMovies]);

//   useEffect(() => {
//     if (isLoadingSavedMovies) {
//       setTimeout(() => {
//         setIsLoadingSavedMovies(false);
//       }, 1500);
//     }
//   }, [filteredSavedMovies, isLoadingSavedMovies, setIsLoadingSavedMovies]);

//   const savedMoviesIds = savedMovies.map((item) => item.movieId);

//   const findIdDb = (id) => {
//     const foundItem = savedMovies.find((item) => item.movieId === id);
//     return foundItem ? foundItem._id : null;
//   };

//   return (
//     <>
//       {location.pathname === "/movies" &&
//         (isLoadingMovies ? (
//           filteredMovies.length !== 0 &&
//           localStorage.getItem("searchQueryFilteredMovies") !== "" ? (
//             isLoading ? (
//               <Preloader />
//             ) : (
//               <section className="movies" aria-label="фильмы">
//                 <ul className="movies__card-list">
//                   {filteredMovies
//                     .slice(0, visibleCardsCount)
//                     .map(({ id, ...props }) => (
//                       <MoviesCard
//                         movie={props}
//                         key={id}
//                         handleCreateMovie={handleCreateMovie}
//                         handleDeleteMovie={handleDeleteMovie}
//                         isSaveMovie={savedMoviesIds.includes(id)}
//                         movieIdDb={findIdDb(id)}
//                         movieId={id}
//                       />
//                     ))}
//                 </ul>
//                 {filteredMovies.length > visibleCardsCount && (
//                   <Button
//                     className="movies__button"
//                     text="Ещё"
//                     onClick={handleShowCards}
//                     type="button"
//                   />
//                 )}
//               </section>
//             )
//           ) : (
//             isSearchMovies &&
//             (isLoading ? <Preloader /> : <ResultSearch isError={false} />)
//           )
//         ) : (
//           <ResultSearch isError={true} />
//         ))}

//       {location.pathname === "/saved-movies" &&
//         (isLoadingMovies ? (
//           filteredSavedMovies.length !== 0 ? (
//             isLoadingSavedMovies ? (
//               <Preloader />
//             ) : (
//               <section className="movies" aria-label="сохраненные фильмы">
//                 <ul className="movies__card-list">
//                   {filteredSavedMovies.map(({ movieId, _id, ...props }) => (
//                     <MoviesCard
//                       movie={props}
//                       movieId={movieId}
//                       key={movieId}
//                       handleDeleteMovie={handleDeleteMovie}
//                       isSaveMovie={savedMoviesIds.includes(movieId)}
//                       movieIdDb={_id}
//                     />
//                   ))}
//                 </ul>
//               </section>
//             )
//           ) : (
//             isSearchSavedMovies &&
//             (isLoadingSavedMovies ? (
//               <Preloader />
//             ) : (
//               <ResultSearch isError={false} />
//             ))
//           )
//         ) : (
//           <ResultSearch isError={true} />
//         ))}
//     </>
//   );
// }
