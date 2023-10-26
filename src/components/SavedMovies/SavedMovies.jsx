/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect, useCallback } from "react";
// import { useLocation } from "react-router-dom";
// import { validateSearch, handleCheckboxChange } from "../../utils/filterData";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function SavedMovies({
  // savedMovies,
  savedMovies,
  handleDeleteMovie
  // setFilteredSavedMovies,
  // handleDeleteMovie,
  // isLoadingSavedMovies,
  // setIsLoadingSavedMovies,
  // isLoadingMovies,
  // filteredSavedMovies,
  // isSearchSavedMovies,
  // setIsSearchSavedMovies,
}) {

  // для строки поиска из инпута и записывать в локал сторедж
  const [searchInput, setSearchInput] = useState('');

  //за состояние переключения короткометражек
  const [statusShort, setStatusShort] = useState(false);

  // длдя отрисовки фильмов фильтры
  const [filterListFilms, setFilterListFilms] = useState([]);

  const filterFilms = useCallback((search, statusShort, movies) => {
    setSearchInput(search);
    setFilterListFilms(movies.filter((movie) => {
      const searchText = movie.nameRU.toLowerCase().includes(search.toLowerCase());
      return statusShort ? (searchText && movie.duration <= 40) : searchText
    }));
  }, []);

  function handleMovies(search) {
    filterFilms(search, statusShort, savedMovies);
  };

  function toggleSwitchShort() {
    if (statusShort) {
      setStatusShort(false);
      filterFilms(searchInput, false, savedMovies);
    } else {
      setStatusShort(true);
      filterFilms(searchInput, true, savedMovies);
    };
  };

  useEffect(() => {
    filterFilms(searchInput, statusShort, savedMovies);
  }, [filterFilms, savedMovies, statusShort, searchInput]);
  

  return (
    <main>
      <SearchForm
        // name="search-form-saved-movies"
        // setSearchQueryFilteredMovies={setSearchQuerySavedMovies}
        // searchQueryFilteredMovies={searchQuerySavedMovies}
        // isCheckedFilteredMovies={isCheckedSavedMovies}
        // handleSubmitSearchFilteredMovies={handleSubmitSearchSavedMovies}
        // handleCheckboxChangeFilteredMovies={handleCheckboxChangeSavedMovies}
        // nameError={nameError}
        handleMovies={handleMovies}
        toggleSwitchShort={toggleSwitchShort}
        savedMovies={savedMovies}
        statusShort={statusShort}
        searchInput={searchInput}
      />
      <MoviesCardList
        // isSearchSavedMovies={isSearchSavedMovies}
        // isLoadingSavedMovies={isLoadingSavedMovies}
        // setIsLoadingSavedMovies={setIsLoadingSavedMovies}
        // isLoadingMovies={isLoadingMovies}
        // filteredSavedMovies={filteredSavedMovies}
        // savedMovies={savedMovies}
        handleDeleteMovie={handleDeleteMovie}
        filterListFilms={filterListFilms}
      />
    </main>
  );
}



// /* eslint-disable react-hooks/exhaustive-deps */
// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { validateSearch, handleCheckboxChange } from "../../utils/filterData";
// import SearchForm from "../SearchForm/SearchForm";
// import MoviesCardList from "../MoviesCardList/MoviesCardList";

// export default function SavedMovies({
//   savedMovies,
//   setFilteredSavedMovies,
//   handleDeleteMovie,
//   isLoadingSavedMovies,
//   setIsLoadingSavedMovies,
//   isLoadingMovies,
//   filteredSavedMovies,
//   isSearchSavedMovies,
//   setIsSearchSavedMovies,
// }) {
//   const location = useLocation();
//   const [searchQuerySavedMovies, setSearchQuerySavedMovies] = useState(
//     localStorage.getItem("searchQuerySavedMovies") || ""
//   );
//   const [isCheckedSavedMovies, setIsCheckedSavedMovies] = useState(
//     localStorage.getItem("isShortFilmSavedMovies") === "true"
//   );
//   const [nameError, setNameError] = useState("");
//   const isSaveInLocalStorage = false;

//   function handleSubmitSearchSavedMovies(e) {
//     e.preventDefault();
//     setNameError("");
//     setIsSearchSavedMovies(true);
//     setIsLoadingSavedMovies(true);
//     validateSearch(
//       isSaveInLocalStorage,
//       searchQuerySavedMovies,
//       "searchQuerySavedMovies",
//       setNameError,
//       setFilteredSavedMovies,
//       savedMovies,
//       isCheckedSavedMovies,
//       "savedFilteredMovies",
//       savedMovies
//     );
//   };

//   function handleCheckboxChangeSavedMovies(isChecked) {
//     setIsLoadingSavedMovies(true);
//     handleCheckboxChange(
//       isSaveInLocalStorage,
//       "searchQuerySavedMovies",
//       isChecked,
//       setIsCheckedSavedMovies,
//       "isShortFilmSavedMovies",
//       savedMovies,
//       searchQuerySavedMovies,
//       setFilteredSavedMovies,
//       "savedFilteredMovies"
//     );
//   };

//   useEffect(() => {
//     setFilteredSavedMovies(savedMovies);
//     setIsSearchSavedMovies(false);
//   }, [location.pathname]);

//   return (
//     <main>
//       <SearchForm
//         name="search-form-saved-movies"
//         setSearchQueryFilteredMovies={setSearchQuerySavedMovies}
//         searchQueryFilteredMovies={searchQuerySavedMovies}
//         isCheckedFilteredMovies={isCheckedSavedMovies}
//         handleSubmitSearchFilteredMovies={handleSubmitSearchSavedMovies}
//         handleCheckboxChangeFilteredMovies={handleCheckboxChangeSavedMovies}
//         nameError={nameError}
//       />
//       <MoviesCardList
//         isSearchSavedMovies={isSearchSavedMovies}
//         isLoadingSavedMovies={isLoadingSavedMovies}
//         setIsLoadingSavedMovies={setIsLoadingSavedMovies}
//         isLoadingMovies={isLoadingMovies}
//         filteredSavedMovies={filteredSavedMovies}
//         savedMovies={savedMovies}
//         handleDeleteMovie={handleDeleteMovie}
//       />
//     </main>
//   );
// }