/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { validateSearch } from "../../utils/filterData";
import { handleCheckboxChange } from '../../utils/filterData';
import useWidthResize from "../../hooks/useWidthResize";
import {
  DESKTOP,
  AMOUNT_CARDS_FOR_DESKTOP,
  ROW_OF_CARDS_FOR_DESKTOP,
  AMOUNT_CARDS_FOR_TABLET,
  ROW_OF_CARDS_FOR_TABLET,
  MOBILE,
  AMOUNT_CARDS_FOR_MOBILE,
  ROW_OF_CARDS_FOR_MOBILE,
} from "../../utils/constants.js";

export default function Movies ({
  isLoading,
  isLoadingMovies,
  movies,
  handleCreateMovie,
  savedMovies,
  handleDeleteMovie,
  setFilteredMovies,
  isSearchMovies,
  setIsSearchMovies,
  filteredMovies,
}) {
  const windowWidth = useWidthResize();

  const [searchQueryFilteredMovies, setSearchQueryFilteredMovies] = useState(
    localStorage.getItem("searchQueryFilteredMovies") || ""
  );
  const [isCheckedFilteredMovies, setIsCheckedFilteredMovies] = useState(
    localStorage.getItem("isShortFilmFilteredMovies") === "true"
  );
  const [nameError, setNameError] = useState("");
  const isSaveInLocalStorage = true;

  function handleSubmitSearchFilteredMovies(e) {
    e.preventDefault();
    setNameError("");
    setIsSearchMovies(true);
    validateSearch(
      isSaveInLocalStorage,
      searchQueryFilteredMovies,
      "searchQueryFilteredMovies",
      setNameError,
      setFilteredMovies,
      movies,
      isCheckedFilteredMovies,
      "filteredMovies",
      []
    );
  };

  function handleCheckboxChangeFilteredMovies(isChecked) {
    handleCheckboxChange(
      isSaveInLocalStorage,
      "searchQueryFilteredMovies",
      isChecked,
      setIsCheckedFilteredMovies,
      "isShortFilmFilteredMovies",
      movies,
      searchQueryFilteredMovies,
      setFilteredMovies,
      "filteredMovies"
    );
  };

  const isDesktop = windowWidth >= DESKTOP;
  const isMobile = windowWidth <= MOBILE;

  function calculateCardCount() {
    if (isMobile) {
      if (filteredMovies.length <= AMOUNT_CARDS_FOR_MOBILE) {
        return filteredMovies.length;
      } else {
        return AMOUNT_CARDS_FOR_MOBILE;
      }
    } else if (isDesktop) {
      if (filteredMovies.length <= AMOUNT_CARDS_FOR_DESKTOP) {
        return filteredMovies.length;
      } else {
        return AMOUNT_CARDS_FOR_DESKTOP;
      }
    } else {
      if (filteredMovies.length <= AMOUNT_CARDS_FOR_TABLET) {
        return filteredMovies.length;
      } else {
        return AMOUNT_CARDS_FOR_TABLET;
      }
    }
  };

  function calculateCardCountStep() {
    if (isMobile) {
      return ROW_OF_CARDS_FOR_MOBILE;
    } else if (isDesktop) {
      return ROW_OF_CARDS_FOR_DESKTOP;
    }
    return ROW_OF_CARDS_FOR_TABLET;
  };

  const cardsToShowInitial = calculateCardCount();
  const cardsToShow = calculateCardCountStep();

  const [visibleCardsCount, setVisibleCardsCount] =
    useState(cardsToShowInitial);

  useEffect(() => {
    setVisibleCardsCount(cardsToShowInitial);
  }, [filteredMovies]);

  useEffect(() => {
    if (visibleCardsCount % cardsToShow !== 0) {
      setVisibleCardsCount(
        visibleCardsCount +
          (cardsToShow -
            (visibleCardsCount -
              Math.floor(visibleCardsCount / cardsToShow) * cardsToShow))
      );
    }
  }, [cardsToShow]);

  function handleShowCards() {
    setVisibleCardsCount(visibleCardsCount + cardsToShow);
  };

  return (
    <main>
      <SearchForm
        name="search-movies"
        nameError={nameError}
        setSearchQueryFilteredMovies={setSearchQueryFilteredMovies}
        searchQueryFilteredMovies={searchQueryFilteredMovies}
        isCheckedFilteredMovies={isCheckedFilteredMovies}
        handleSubmitSearchFilteredMovies={handleSubmitSearchFilteredMovies}
        handleCheckboxChangeFilteredMovies={handleCheckboxChangeFilteredMovies}
      />
      <MoviesCardList
        handleCreateMovie={handleCreateMovie}
        savedMovies={savedMovies}
        handleDeleteMovie={handleDeleteMovie}
        isSearchMovies={isSearchMovies}
        handleShowCards={handleShowCards}
        isLoading={isLoading}
        visibleCardsCount={visibleCardsCount}
        isLoadingMovies={isLoadingMovies}
        filteredMovies={filteredMovies}
        setFilteredMovies={setFilteredMovies}
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