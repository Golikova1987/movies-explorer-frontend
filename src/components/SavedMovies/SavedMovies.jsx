/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect, useCallback } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function SavedMovies({
  savedMovies,
  handleDeleteMovie
}) {

  const [isCheckboxActive, setCheckboxActive] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const filterMovies = useCallback((search, isCheckboxActive, movies) => {
    setSearchInput(search);
    setFilteredMovies(movies.filter((movie) => {
      const searchText = movie.nameRU.toLowerCase().includes(search.toLowerCase());
      return isCheckboxActive ? (searchText && movie.duration <= 40) : searchText
    }));
  }, []);

  function handleMovies(search) {
    filterMovies(search, isCheckboxActive, savedMovies);
  };

  function toggleSwitchShort() {
    if (isCheckboxActive) {
      setCheckboxActive(false);
      filterMovies(searchInput, false, savedMovies);
    } else {
      setCheckboxActive(true);
      filterMovies(searchInput, true, savedMovies);
    };
  };

  useEffect(() => {
    filterMovies(searchInput, isCheckboxActive, savedMovies);
  }, [filterMovies, savedMovies, isCheckboxActive, searchInput]);
  

  return (
    <main>
      <SearchForm
        savedMovies={savedMovies}
        isCheckboxActive={isCheckboxActive}
        searchInput={searchInput}
        handleMovies={handleMovies}
        toggleSwitchShort={toggleSwitchShort}
      />
      <MoviesCardList
        handleDeleteMovie={handleDeleteMovie}
        filteredMovies={filteredMovies}
      />
    </main>
  );
}