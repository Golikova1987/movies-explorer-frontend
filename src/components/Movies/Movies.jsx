/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
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
import useResizeWidth from "../../hooks/useResizeWidth";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { validateSearch, handleCheckboxChange } from "../../utils/filterData";

const Movies = ({
  movies,
  filteredMovies,
  handleCreateMovie,
  savedMovies,
  handleDeleteMovie,
  setFilteredMovies,
  isSearchMovies,
  setIsSearchMovies,
  isLoading,
  isLoadingMovies,
}) => {
  const windowWidth = useResizeWidth();

  const [searchQueryFilteredMovies, setSearchQueryFilteredMovies] = useState(
    localStorage.getItem("searchQueryFilteredMovies") || ""
  );
  const [isCheckedFilteredMovies, setIsCheckedFilteredMovies] = useState(
    localStorage.getItem("isShortFilmFilteredMovies") === "true"
  );
  const [nameError, setNameError] = useState("");
  const isSaveInLocalStorage = true;

  // useEffect(() => {
  //   localStorage.setItem(
  //     "searchQueryFilteredMovies",
  //     searchQueryFilteredMovies
  //   );
  // }, [searchQueryFilteredMovies]);

  // useEffect(() => {
  //   localStorage.setItem(
  //     "isShortFilmFilteredMovies",
  //     JSON.stringify(!isCheckedFilteredMovies)
  //   );
  // }, [isCheckedFilteredMovies]);

  const handleSubmitSearchFilteredMovies = (e) => {
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

  const handleCheckboxChangeFilteredMovies = (isChecked) => {
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

  const calculateCardCount = () => {
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

  const calculateCardCountStep = () => {
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

  const handleShowCards = () => {
    setVisibleCardsCount(visibleCardsCount + cardsToShow);
  };

  return (
    <main>
      <SearchForm
        name="search-form-movies"
        handleSubmitSearchFilteredMovies={handleSubmitSearchFilteredMovies}
        handleCheckboxChangeFilteredMovies={handleCheckboxChangeFilteredMovies}
        nameError={nameError}
        setSearchQueryFilteredMovies={setSearchQueryFilteredMovies}
        searchQueryFilteredMovies={searchQueryFilteredMovies}
        isCheckedFilteredMovies={isCheckedFilteredMovies}
      />
      <MoviesCardList
        filteredMovies={filteredMovies}
        setFilteredMovies={setFilteredMovies}
        handleCreateMovie={handleCreateMovie}
        savedMovies={savedMovies}
        handleDeleteMovie={handleDeleteMovie}
        isSearchMovies={isSearchMovies}
        handleShowCards={handleShowCards}
        isLoading={isLoading}
        visibleCardsCount={visibleCardsCount}
        isLoadingMovies={isLoadingMovies}
      />
    </main>
  );
};

export default Movies;


//laif

// import SearchForm from "../SearchForm/SearchForm";
// import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import { useCallback, useState } from "react";
// import apiMovies from '../../utils/MoviesApi';
// import { useEffect } from "react";

// export default function Movies ({ setIsError, addMovie, savedMovies }) {
//   const [allMovies, setAllMovies] = useState([])
//   const [filteredMovies, setFilteredMovies] = useState([])
//   const [searchedMovie, setSearchedMovie] = useState('')
//   const [isCheck, setIsCheck] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [serverError, setSetverError] = useState(false)
//   const [firstEntrance, setFirstEntrance] = useState(true)

//   const filter = useCallback((search, isCheck, movies) => {
//     setSearchedMovie(search)
//     localStorage.setItem('movie', JSON.stringify(search))
//     localStorage.setItem('shorts', JSON.stringify(isCheck))
//     localStorage.setItem('allmovies', JSON.stringify(movies))
//     setFilteredMovies(movies.filter((movie) => {
//       const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
//       return isCheck ? (searchName && movie.duration <= 40) : searchName
//     }))
//   }, [])

//   function searchMovies(search) {
//     if (allMovies.length === 0) {
//       setIsLoading(true)
//       apiMovies.getMovies()
//         .then((res) => {
//           setAllMovies(res)
//           setIsCheck(false)
//           setSetverError(false)
//           setFirstEntrance(false)
//           filter(search, isCheck, res)
//         })
//         .catch(err => {
//           setSetverError(true)
//           console.error(`Ошибка при поиске фильмов ${err}`)
//         })
//         .finally(() => setIsLoading(false))
//     } else {
//       filter(search, isCheck, allMovies)
//     }
//   }

//   useEffect(() => {
//     if (localStorage.allMovies && localStorage.shorts && localStorage.movie) {
//       const movies = JSON.parse(localStorage.allMovies)
//       const search = JSON.parse(localStorage.movie)
//       const isCheck = JSON.parse(localStorage.shorts)
//       setSetverError(false)
//       setFirstEntrance(false)
//       setSearchedMovie(search)
//       setIsCheck(isCheck)
//       setAllMovies(movies)
//       filter(search, isCheck, movies)
//     }
//   }, [filter])

//   function changeShort() {
//     if (isCheck) {
//       setIsCheck(false)
//       filter(searchedMovie, true, allMovies)
//     }
//   }

//   return (
//     <>
//       <SearchForm
//         isCheck={isCheck}
//         searchMovies={searchMovies}
//         searchedMovie={searchedMovie}
//         changeShort={changeShort}
//         setIsError={setIsError}
//         firstEntrance={firstEntrance}
//       />
//       <MoviesCardList
//         movies={filteredMovies}
//         addMovie={addMovie}
//         savedMovies={savedMovies}
//         isLoading={isLoading}
//         serverError={serverError}
//         firstEntrance={firstEntrance}
//       />
//     </>
//   );
// }



// import SearchForm from "../SearchForm/SearchForm";
// import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import { useEffect, useState } from "react";

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

// import useResizeWidth from "../../hooks/useResizeWidth";
// import { validateSearch, handleCheckboxChange } from "../../utils/filterData";

// export default function Movies ({ 
//   movies,
//   filteredMovies,
//   handleCreateMovie,
//   savedMovies,
//   handleDeleteMovie,
//   setFilteredMovies,
//   isSearchMovies,
//   setIsSearchMovies,
//   isLoading,
//   isLoadingMovies,
// }) {
//   const windowWidth = useResizeWidth();

//   const [searchQueryFilteredMovies, setSearchQueryFilteredMovies] = useState(
//     localStorage.getItem("searchQueryFilteredMovies") || ""
//   );
//   const [isCheckedFilteredMovies, setIsCheckedFilteredMovies] = useState(
//     localStorage.getItem("isShortFilmFilteredMovies") === "true"
//   );
//   const [nameError, setNameError] = useState("");
//   const isSaveInLocalStorage = true;

//   const handleSubmitSearchFilteredMovies = (e) => {
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

//   const handleCheckboxChangeFilteredMovies = (isChecked) => {
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

//   const calculateCardCount = () => {
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

//   const calculateCardCountStep = () => {
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

//   const handleShowCards = () => {
//     setVisibleCardsCount(visibleCardsCount + cardsToShow);
//   };

//   return (
//     <>
//       <SearchForm
//         name="search-form-movies"
//         handleSubmitSearchFilteredMovies={handleSubmitSearchFilteredMovies}
//         handleCheckboxChangeFilteredMovies={handleCheckboxChangeFilteredMovies}
//         nameError={nameError}
//         setSearchQueryFilteredMovies={setSearchQueryFilteredMovies}
//         searchQueryFilteredMovies={searchQueryFilteredMovies}
//         isCheckedFilteredMovies={isCheckedFilteredMovies}
//       />
//       <MoviesCardList
//         filteredMovies={filteredMovies}
//         setFilteredMovies={setFilteredMovies}
//         handleCreateMovie={handleCreateMovie}
//         savedMovies={savedMovies}
//         handleDeleteMovie={handleDeleteMovie}
//         isSearchMovies={isSearchMovies}
//         handleShowCards={handleShowCards}
//         isLoading={isLoading}
//         visibleCardsCount={visibleCardsCount}
//         isLoadingMovies={isLoadingMovies}
//       />
//     </>
//   );
// }