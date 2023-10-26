import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
// import { BASE_URL_MOVIES_API } from "../../utils/constants";
import Button from "../Button/Button";
import durationFilm from "../../utils/durationFilm";

export default function MoviesCard({
  movie,
  // movieId,
  // isSaveMovie,
  // movieIdDb,
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

  function handleLikeClick() {
    if (savedMovies.some((element) => movie.id === element.movieId)) {
      setIsSave(true);
      handleCreateMovie(movie);
    } else {
      setIsSave(false);
      handleCreateMovie(movie);
    }
  }

  /*function handleDeleteClick() {
      handleDeleteMovie(movieIdDb, setIsSave);
    };*/

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
          onClick={handleLikeClick}
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
          <p className="movies__duration">{durationFilm(movie.duration)}</p>
        </div>
      </div>
    </li>
  );
}

// import "./MoviesCard.css";
// import { useLocation } from "react-router-dom";
// import { useState } from "react";
// import { BASE_URL_MOVIES_API } from "../../utils/constants";
// import Button from "../Button/Button";

// export default function MoviesCard({
//   movie,
//   movieId,
//   isSaveMovie,
//   movieIdDb,
//   handleCreateMovie,
//   handleDeleteMovie,
// }) {
//   const [isSave, setIsSave] = useState(isSaveMovie);
//   const location = useLocation();

//   function handleSaveClick() {
//     handleCreateMovie(
//       movie.country,
//       movie.director,
//       movie.duration,
//       movie.year,
//       movie.description,
//       `${BASE_URL_MOVIES_API}${movie.image.url}`,
//       movie.trailerLink,
//       `${BASE_URL_MOVIES_API}${movie.image.formats.thumbnail.url}`,
//       movie.nameRU,
//       movie.nameEN,
//       movieId,
//       setIsSave
//     );
//   };

//   function handleDeleteClick() {
//     handleDeleteMovie(movieIdDb, setIsSave);
//   };

//   function countTime(duration) {
//     const hour = Math.trunc(duration / 60);
//     const minutes = duration - 60 * hour;
//     const res = `${hour}ч ${minutes}м`;
//     return res;
//   };

//   return (
//     <li
//       className={
//         location.pathname === "/movies"
//           ? "movies__card movies__card_type_unsaved"
//           : "movies__card movies__card_type_saved"
//       }
//     >
//       <a
//         className="movies__trailer"
//         href={movie.trailerLink}
//         target="_blank"
//         rel="noreferrer"
//       >
//         <img
//           className="movies__poster"
//           src={
//             location.pathname === "/movies"
//               ? `${BASE_URL_MOVIES_API}${movie.image.url}`
//               : movie.image
//           }
//           alt={movie.nameRU}
//         ></img>
//       </a>
//       {location.pathname === "/movies" ? (
//         <Button
//           className={`movies__save-button ${
//             isSave
//               ? "movies__save-button_type_save"
//               : "movies__save-button_type_choose"
//           }`}
//           type="button"
//           text={!isSave && "Сохранить"}
//           onClick={!isSave ? handleSaveClick : handleDeleteClick}
//         />
//       ) : (
//         <Button
//           className="movies__save-button movies__save-button_type_delete"
//           type="button"
//           onClick={handleDeleteClick}
//         />
//       )}
//       <div className="movies__info">
//         <h2 className="movies__name">{movie.nameRU}</h2>
//         <div className="movies__container-duration">
//           <p className="movies__duration">{countTime(movie.duration)}</p>
//         </div>
//       </div>
//     </li>
//   );
// }
