import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import Button from "../Button/Button";
import MoviesCard from "../MoviesCard/MoviesCard";

import {
  Max_Width_Screen,
  Center_Width_Screen,
  Mobile_Width_Screen,
} from "../../utils/constants";
import displayMovies from "../../utils/displayMovies";

export default function MoviesCardList({
  isLoading,
  filteredMovies,
  savedMovies,
  serverError,
  handleDeleteMovie,
  searchInput,
  handleCreateMovie,
}) {
  const { pathname } = useLocation();
  const [isNumberMovies, setNumberMovies] = useState("");
  const movies = filteredMovies.slice(0, isNumberMovies);

  useEffect(() => {
    if (pathname === "/movies") {
      setNumberMovies(displayMovies().cards);

      function resizeDisplayMovies() {
        if (window.innerWidth >= Max_Width_Screen) {
          setNumberMovies(displayMovies().cards);
        }
        if (window.innerWidth < Max_Width_Screen) {
          setNumberMovies(displayMovies().cards);
        }
        if (window.innerWidth < Center_Width_Screen) {
          setNumberMovies(displayMovies().cards);
        }
        if (window.innerWidth < Mobile_Width_Screen) {
          setNumberMovies(displayMovies().cards);
        }
      }
      window.addEventListener("resize", resizeDisplayMovies);
      return () => window.removeEventListener("resize", resizeDisplayMovies);
    }
  }, [pathname, filteredMovies]);

  function handleAddButtonClick() {
    setNumberMovies(isNumberMovies + displayMovies().add);
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
        ) : filteredMovies.length !== 0 ? (
          filteredMovies.map((movie) => {
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
            «Ничего не найдено»
          </span>
        ) : (
          <span className="movies__card-error">«Нет сохраненных фильмов»</span>
        )}
      </ul>

      {pathname === "/movies" && (
        <Button
          className={`movies__button ${
            isNumberMovies >= filteredMovies.length && "movies__button_hidden"
          }`}
          onClick={handleAddButtonClick}
          type="button"
        >
          Ещё
        </Button>
      )}
    </section>
  );
}