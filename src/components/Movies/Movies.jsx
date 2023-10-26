/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useCallback } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi";
// import { validateSearch } from "../../utils/filterData";
// import { handleCheckboxChange } from '../../utils/filterData';
// import useWidthResize from "../../hooks/useWidthResize";
// import {
//   DESKTOP,
//   AMOUNT_CARDS_FOR_DESKTOP,
//   ROW_OF_CARDS_FOR_DESKTOP,
//   AMOUNT_CARDS_FOR_TABLET,
//   ROW_OF_CARDS_FOR_TABLET,
//   MOBILE,
//   AMOUNT_CARDS_FOR_MOBILE,
//   ROW_OF_CARDS_FOR_MOBILE,
// } from "../../utils/constants.js";

export default function Movies ({
  savedMovies, 
  handleCreateMovie
  // isLoading,
  // isLoadingMovies,
  // movies,
  // handleCreateMovie,
  // savedMovies,
  // handleDeleteMovie,
  // setFilteredMovies,
  // isSearchMovies,
  // setIsSearchMovies,
  // filteredMovies,
}) {
  const [isLoading, setIsLoading] = useState(false);

  //Переменная состояния для карточек (список фильмов)
  const [listMovies, setListMovies] = useState([]);

  // для строки поиска из инпута и записывать в локал сторедж
  const [searchInput, setSearchInput] = useState('');

  //за состояние переключения короткометражек
  const [statusShort, setStatusShort] = useState(false);

  // длдя отрисовки фильмов фильтры
  const [filterListFilms, setFilterListFilms] = useState([]);

  //для серверной ошибки при запросе фильмов
  const [serverError, setServerError] = useState(false);

  const filterFilms = useCallback((search, statusShort, movies) => {
    setSearchInput(search);
    localStorage.setItem("text", JSON.stringify(search));
    localStorage.setItem("shorts", JSON.stringify(statusShort));
    localStorage.setItem("movies", JSON.stringify(movies));

    setFilterListFilms(movies.filter((movie) => {
      const searchText = movie.nameRU.toLowerCase().includes(search.toLowerCase());
      return statusShort ? (searchText && movie.duration <= 40) : searchText
    }));
  }, []);

  function handleMovies(search) {
    if (listMovies.length === 0) {
      setIsLoading(true);
      // Получаем фильмы
      moviesApi.getAllMovies()
        .then((res) => {
          setListMovies(res);
          setStatusShort(false);
          setServerError(false);
          filterFilms(search, statusShort, res);
        })
        .catch((err) => {
          setServerError(true);
          console.log(`Ошибка при поиске фильмов ${err}`);
        })
        .finally(() => setIsLoading(false));
    } else {
      filterFilms(search, statusShort, listMovies);
    };
  };

  function toggleSwitchShort() {
    if (statusShort) {
      setStatusShort(false);
      filterFilms(searchInput, false, listMovies);
    } else {
      setStatusShort(true);
      filterFilms(searchInput, true, listMovies);
    };
  };

  useEffect(() => {
    if (localStorage.movies && localStorage.shorts && localStorage.text) {
      const movies = JSON.parse(localStorage.movies);
      const search = JSON.parse(localStorage.text);
      const statusShort = JSON.parse(localStorage.shorts);

      setServerError(false);
      setListMovies(movies);
      setSearchInput(search);
      setStatusShort(statusShort);

      filterFilms(search, statusShort, movies);
    }
  }, [filterFilms]);

  return (
    <main>
      <SearchForm
        // name="search-movies"
        handleMovies={handleMovies}
        toggleSwitchShort={toggleSwitchShort}
        searchInput={searchInput}
        statusShort={statusShort}
        // nameError={nameError}
        // setSearchQueryFilteredMovies={setSearchQueryFilteredMovies}
        // searchQueryFilteredMovies={searchQueryFilteredMovies}
        // isCheckedFilteredMovies={isCheckedFilteredMovies}
        // handleSubmitSearchFilteredMovies={handleSubmitSearchFilteredMovies}
        // handleCheckboxChangeFilteredMovies={handleCheckboxChangeFilteredMovies}
      />
      <MoviesCardList
        savedMovies={savedMovies}
        searchInput={searchInput}
        handleCreateMovie={handleCreateMovie}
        isLoading={isLoading}
        filterListFilms={filterListFilms}
        serverError={serverError}
        // handleCreateMovie={handleCreateMovie}
        // savedMovies={savedMovies}
        // handleDeleteMovie={handleDeleteMovie}
        // isSearchMovies={isSearchMovies}
        // handleShowCards={handleShowCards}
        // isLoading={isLoading}
        // visibleCardsCount={visibleCardsCount}
        // isLoadingMovies={isLoadingMovies}
        // filteredMovies={filteredMovies}
        // setFilteredMovies={setFilteredMovies}
      />
    </main>
  );
}


// /* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from "react";
// import SearchForm from "../SearchForm/SearchForm";
// import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import { validateSearch } from "../../utils/filterData";
// import { handleCheckboxChange } from '../../utils/filterData';
// import useWidthResize from "../../hooks/useWidthResize";
// import {
//   DESKTOP,
//   AMOUNT_CARDS_FOR_DESKTOP,
//   ROW_OF_CARDS_FOR_DESKTOP,
//   AMOUNT_CARDS_FOR_TABLET,
//   ROW_OF_CARDS_FOR_TABLET,
//   MOBILE,
//   AMOUNT_CARDS_FOR_MOBILE,
//   ROW_OF_CARDS_FOR_MOBILE,
// } from "../../utils/constants.js";

// export default function Movies ({
//   isLoading,
//   isLoadingMovies,
//   movies,
//   handleCreateMovie,
//   savedMovies,
//   handleDeleteMovie,
//   setFilteredMovies,
//   isSearchMovies,
//   setIsSearchMovies,
//   filteredMovies,
// }) {
//   const windowWidth = useWidthResize();

//   const [searchQueryFilteredMovies, setSearchQueryFilteredMovies] = useState(
//     localStorage.getItem("searchQueryFilteredMovies") || ""
//   );
//   const [isCheckedFilteredMovies, setIsCheckedFilteredMovies] = useState(
//     localStorage.getItem("isShortFilmFilteredMovies") === "true"
//   );
//   const [nameError, setNameError] = useState("");
//   const isSaveInLocalStorage = true;

//   function handleSubmitSearchFilteredMovies(e) {
//     e.preventDefault();
//     setNameError("");
//     setIsSearchMovies(true);
//     validateSearch(
//       isSaveInLocalStorage,
//       searchQueryFilteredMovies,
//       "searchQueryFilteredMovies",
//       setNameError,
//       setFilteredMovies,
//       movies,
//       isCheckedFilteredMovies,
//       "filteredMovies",
//       []
//     );
//   };

//   function handleCheckboxChangeFilteredMovies(isChecked) {
//     handleCheckboxChange(
//       isSaveInLocalStorage,
//       "searchQueryFilteredMovies",
//       isChecked,
//       setIsCheckedFilteredMovies,
//       "isShortFilmFilteredMovies",
//       movies,
//       searchQueryFilteredMovies,
//       setFilteredMovies,
//       "filteredMovies"
//     );
//   };

//   const isDesktop = windowWidth >= DESKTOP;
//   const isMobile = windowWidth <= MOBILE;

//   function calculateCardCount() {
//     if (isMobile) {
//       if (filteredMovies.length <= AMOUNT_CARDS_FOR_MOBILE) {
//         return filteredMovies.length;
//       } else {
//         return AMOUNT_CARDS_FOR_MOBILE;
//       }
//     } else if (isDesktop) {
//       if (filteredMovies.length <= AMOUNT_CARDS_FOR_DESKTOP) {
//         return filteredMovies.length;
//       } else {
//         return AMOUNT_CARDS_FOR_DESKTOP;
//       }
//     } else {
//       if (filteredMovies.length <= AMOUNT_CARDS_FOR_TABLET) {
//         return filteredMovies.length;
//       } else {
//         return AMOUNT_CARDS_FOR_TABLET;
//       }
//     }
//   };

//   function calculateCardCountStep() {
//     if (isMobile) {
//       return ROW_OF_CARDS_FOR_MOBILE;
//     } else if (isDesktop) {
//       return ROW_OF_CARDS_FOR_DESKTOP;
//     }
//     return ROW_OF_CARDS_FOR_TABLET;
//   };

//   const cardsToShowInitial = calculateCardCount();
//   const cardsToShow = calculateCardCountStep();

//   const [visibleCardsCount, setVisibleCardsCount] =
//     useState(cardsToShowInitial);

//   useEffect(() => {
//     setVisibleCardsCount(cardsToShowInitial);
//   }, [filteredMovies]);

//   useEffect(() => {
//     if (visibleCardsCount % cardsToShow !== 0) {
//       setVisibleCardsCount(
//         visibleCardsCount +
//           (cardsToShow -
//             (visibleCardsCount -
//               Math.floor(visibleCardsCount / cardsToShow) * cardsToShow))
//       );
//     }
//   }, [cardsToShow]);

//   function handleShowCards() {
//     setVisibleCardsCount(visibleCardsCount + cardsToShow);
//   };

//   return (
//     <main>
//       <SearchForm
//         name="search-movies"
//         nameError={nameError}
//         setSearchQueryFilteredMovies={setSearchQueryFilteredMovies}
//         searchQueryFilteredMovies={searchQueryFilteredMovies}
//         isCheckedFilteredMovies={isCheckedFilteredMovies}
//         handleSubmitSearchFilteredMovies={handleSubmitSearchFilteredMovies}
//         handleCheckboxChangeFilteredMovies={handleCheckboxChangeFilteredMovies}
//       />
//       <MoviesCardList
//         handleCreateMovie={handleCreateMovie}
//         savedMovies={savedMovies}
//         handleDeleteMovie={handleDeleteMovie}
//         isSearchMovies={isSearchMovies}
//         handleShowCards={handleShowCards}
//         isLoading={isLoading}
//         visibleCardsCount={visibleCardsCount}
//         isLoadingMovies={isLoadingMovies}
//         filteredMovies={filteredMovies}
//         setFilteredMovies={setFilteredMovies}
//       />
//     </main>
//   );
// }