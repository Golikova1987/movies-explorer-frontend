/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useCallback } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi";

export default function Movies ({
  savedMovies, 
  handleCreateMovie
}) {

  const [searchInput, setSearchInput] = useState('');
  const [serverError, setServerError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);//индикатор загрузки
  const [allMovies, setAllMovies] = useState([]);//массив с фильмами
  const [isCheckboxActive, setCheckboxActive] = useState(false);//состояние переключения короткометражек
  const [filteredMovies, setFilteredMovies] = useState([]);//фильтр для отрисовки фильмов

  const filterMovies = useCallback((search, isCheckboxActive, movies) => {
    setSearchInput(search);
    localStorage.setItem("text", JSON.stringify(search));
    localStorage.setItem("shorts", JSON.stringify(isCheckboxActive));
    localStorage.setItem("movies", JSON.stringify(movies));

    setFilteredMovies(movies.filter((movie) => {
      const searchText = movie.nameRU.toLowerCase().includes(search.toLowerCase());
      return isCheckboxActive ? (searchText && movie.duration <= 40) : searchText
    }));
  }, []);

  function handleMovies(search) {
    if (allMovies.length === 0) {
      setIsLoading(true);
      moviesApi.getAllMovies()
        .then((res) => {
          setAllMovies(res);
          setCheckboxActive(false);
          setServerError(false);
          filterMovies(search, isCheckboxActive, res);
        })
        .catch((err) => {
          setServerError(true);
          console.log(`Ошибка при поиске фильмов ${err}`);
        })
        .finally(() => setIsLoading(false));
    } else {
      filterMovies(search, isCheckboxActive, allMovies);
    };
  };

  function toggleSwitchShort() {
    if (isCheckboxActive) {
      setCheckboxActive(false);
      filterMovies(searchInput, false, allMovies);
    } else {
      setCheckboxActive(true);
      filterMovies(searchInput, true, allMovies);
    };
  };

  useEffect(() => {
    if (localStorage.movies && localStorage.shorts && localStorage.text) {
      const movies = JSON.parse(localStorage.movies);
      const search = JSON.parse(localStorage.text);
      const isCheckboxActive = JSON.parse(localStorage.shorts);

      setServerError(false);
      setAllMovies(movies);
      setSearchInput(search);
      setCheckboxActive(isCheckboxActive);

      filterMovies(search, isCheckboxActive, movies);
    }
  }, [filterMovies]);

  return (
    <main>
      <SearchForm
        handleMovies={handleMovies}
        toggleSwitchShort={toggleSwitchShort}
        searchInput={searchInput}
        isCheckboxActive={isCheckboxActive}
      />
      <MoviesCardList
        savedMovies={savedMovies}
        searchInput={searchInput}
        handleCreateMovie={handleCreateMovie}
        isLoading={isLoading}
        filteredMovies={filteredMovies}
        serverError={serverError}
      />
    </main>
  );
}