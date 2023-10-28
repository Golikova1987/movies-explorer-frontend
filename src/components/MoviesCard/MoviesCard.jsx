import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import countTimeMovie from "../../utils/countTimeMovie";

export default function MoviesCard({
  movie,
  handleCreateMovie,
  handleDeleteMovie,
  savedMovies,
}) {
  const { pathname } = useLocation();
  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    if (pathname === "/movies")
      setIsSave(savedMovies.some((element) => movie.id === element.movieId));
  }, [savedMovies, movie.id, setIsSave, pathname]);

  function handleSaveClick() {
    if (savedMovies.some((element) => movie.id === element.movieId)) {
      setIsSave(true);
      handleCreateMovie(movie);
    } else {
      setIsSave(false);
      handleCreateMovie(movie);
    }
  }

  return (
    <li
      className={
        pathname === "/movies"
          ? "movies__card movies__card_type_unsaved"
          : "movies__card movies__card_type_saved"
      }
    >
      <a
        className="movies__trailer"
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movies__poster"
          src={
            pathname === "/movies"
              ? `https://api.nomoreparties.co${movie.image.url}`
              : movie.image
          }
          alt={movie.nameRU}
        ></img>
      </a>
      {pathname === "/movies" ? (
        <Button
          className={`movies__save-button ${
            isSave
              ? "movies__save-button_type_save"
              : "movies__save-button_type_choose"
          }`}
          type="button"
          text={!isSave && "Сохранить"}
          onClick={handleSaveClick}
        />
      ) : (
        <Button
          className="movies__save-button movies__save-button_type_delete"
          type="button"
          onClick={() => handleDeleteMovie(movie._id)}
        />
      )}
      <div className="movies__info">
        <h2 className="movies__name">{movie.nameRU}</h2>
        <div className="movies__container-duration">
          <p className="movies__duration">{countTimeMovie(movie.duration)}</p>
        </div>
      </div>
    </li>
  );
}

