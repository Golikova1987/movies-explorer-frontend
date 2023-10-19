/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { validateSearch, handleCheckboxChange } from "../../utils/filterData";

const SavedMovies = ({
  savedMovies,
  setFilteredSavedMovies,
  handleDeleteMovie,
  filteredSavedMovies,
  isSearchSavedMovies,
  setIsSearchSavedMovies,
  isLoadingSavedMovies,
  setIsLoadingSavedMovies,
  isLoadingMovies,
}) => {
  const location = useLocation();
  const [searchQuerySavedMovies, setSearchQuerySavedMovies] = useState(
    localStorage.getItem("searchQuerySavedMovies") || ""
  );
  const [isCheckedSavedMovies, setIsCheckedSavedMovies] = useState(
    localStorage.getItem("isShortFilmSavedMovies") === "true"
  );
  const [nameError, setNameError] = useState("");
  const isSaveInLocalStorage = false;

  // useEffect(() => {
  //   localStorage.setItem("searchQuerySavedMovies", searchQuerySavedMovies);
  // }, [searchQuerySavedMovies]);

  // useEffect(() => {
  //   localStorage.setItem(
  //     "isShortFilmSavedMovies",
  //     JSON.stringify(isCheckedSavedMovies)
  //   );
  // }, [isCheckedSavedMovies]);

  const handleSubmitSearchSavedMovies = (e) => {
    e.preventDefault();
    setNameError("");
    setIsSearchSavedMovies(true);
    setIsLoadingSavedMovies(true);
    validateSearch(
      isSaveInLocalStorage,
      searchQuerySavedMovies,
      "searchQuerySavedMovies",
      setNameError,
      setFilteredSavedMovies,
      savedMovies,
      isCheckedSavedMovies,
      "savedFilteredMovies",
      savedMovies
    );
  };

  const handleCheckboxChangeSavedMovies = (isChecked) => {
    setIsLoadingSavedMovies(true);
    handleCheckboxChange(
      isSaveInLocalStorage,
      "searchQuerySavedMovies",
      isChecked,
      setIsCheckedSavedMovies,
      "isShortFilmSavedMovies",
      savedMovies,
      searchQuerySavedMovies,
      setFilteredSavedMovies,
      "savedFilteredMovies"
    );
  };

  useEffect(() => {
    setFilteredSavedMovies(savedMovies);
    setIsSearchSavedMovies(false);
  }, [location.pathname]);

  return (
    <main>
      <SearchForm
        name="search-form-saved-movies"
        handleSubmitSearchFilteredMovies={handleSubmitSearchSavedMovies}
        handleCheckboxChangeFilteredMovies={handleCheckboxChangeSavedMovies}
        nameError={nameError}
        setSearchQueryFilteredMovies={setSearchQuerySavedMovies}
        searchQueryFilteredMovies={searchQuerySavedMovies}
        isCheckedFilteredMovies={isCheckedSavedMovies}
      />
      <MoviesCardList
        filteredSavedMovies={filteredSavedMovies}
        savedMovies={savedMovies}
        handleDeleteMovie={handleDeleteMovie}
        isSearchSavedMovies={isSearchSavedMovies}
        isLoadingSavedMovies={isLoadingSavedMovies}
        setIsLoadingSavedMovies={setIsLoadingSavedMovies}
        isLoadingMovies={isLoadingMovies}
      />
    </main>
  );
};

export default SavedMovies;



// import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import SearchForm from "../SearchForm/SearchForm";

// export default function SavedMovies () {
//   return (
//     <div className="saved-movies">
//       <SearchForm/>
//       <MoviesCardList/>
//     </div>
//   );
// }



// import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import SearchForm from "../SearchForm/SearchForm";
// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { validateSearch, handleCheckboxChange } from "../../utils/filterData";

// export default function SavedMovies ({
//   savedMovies,
//   setFilteredSavedMovies,
//   handleDeleteMovie,
//   filteredSavedMovies,
//   isSearchSavedMovies,
//   setIsSearchSavedMovies,
//   isLoadingSavedMovies,
//   setIsLoadingSavedMovies,
//   isLoadingMovies,
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

//   const handleSubmitSearchSavedMovies = (e) => {
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

//   const handleCheckboxChangeSavedMovies = (isChecked) => {
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
//     <div className="saved-movies">
//       <SearchForm
//         name="search-form-saved-movies"
//         handleSubmitSearchFilteredMovies={handleSubmitSearchSavedMovies}
//         handleCheckboxChangeFilteredMovies={handleCheckboxChangeSavedMovies}
//         nameError={nameError}
//         setSearchQueryFilteredMovies={setSearchQuerySavedMovies}
//         searchQueryFilteredMovies={searchQuerySavedMovies}
//         isCheckedFilteredMovies={isCheckedSavedMovies}
//       />
//       <MoviesCardList
//         filteredSavedMovies={filteredSavedMovies}
//         savedMovies={savedMovies}
//         handleDeleteMovie={handleDeleteMovie}
//         isSearchSavedMovies={isSearchSavedMovies}
//         isLoadingSavedMovies={isLoadingSavedMovies}
//         setIsLoadingSavedMovies={setIsLoadingSavedMovies}
//         isLoadingMovies={isLoadingMovies}
//       />
//     </div>
//   );
// }