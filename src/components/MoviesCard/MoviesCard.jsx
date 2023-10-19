import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { BASE_URL_MOVIES_API } from "../../utils/constants";
import "./MoviesCard.css";
import Button from "../Buttons/Button";

const MoviesCard = ({
  movie,
  movieId,
  handleCreateMovie,
  handleDeleteMovie,
  isSaveMovie,
  movieIdDb,
}) => {
  const [isSave, setIsSave] = useState(isSaveMovie);
  const location = useLocation();

  const handleClickSave = () => {
    handleCreateMovie(
      movie.country,
      movie.director,
      movie.duration,
      movie.year,
      movie.description,
      `${BASE_URL_MOVIES_API}${movie.image.url}`,
      movie.trailerLink,
      `${BASE_URL_MOVIES_API}${movie.image.formats.thumbnail.url}`,
      movie.nameRU,
      movie.nameEN,
      movieId,
      setIsSave
    );
  };

  const handleClickDelete = () => {
    handleDeleteMovie(movieIdDb, setIsSave);
  };

  const countTime = (duration) => {
    const hour = Math.trunc(duration / 60);
    const minutes = duration - 60 * hour;
    const res = `${hour}ч ${minutes}м`;
    return res;
  };

  return (
    <li
      className={
        location.pathname === "/movies"
          ? "movies__card movies__card_type_unsaved"
          : "movies__card movies__card_type_saved"
      }
    >
      <Link
        className="movies__link"
        to={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movies__img"
          src={
            location.pathname === "/movies"
              ? `${BASE_URL_MOVIES_API}${movie.image.url}`
              : movie.image
          }
          alt={movie.nameRU}
        ></img>
      </Link>
      {location.pathname === "/movies" ? (
        <Button
          className={`movies__button-save ${
            isSave
              ? "movies__button-save_type_save"
              : "movies__button-save_type_choose"
          }`}
          type="button"
          text={!isSave && "Сохранить"}
          onClick={!isSave ? handleClickSave : handleClickDelete}
        />
      ) : (
        <Button
          className="movies__button-save movies__button-save_type_delete"
          type="button"
          onClick={handleClickDelete}
        />
      )}
      <div className="movies__container-title">
        <h2 className="movies__title">{movie.nameRU}</h2>
        <div className="movies__container-time">
          <p className="movies__time">{countTime(movie.duration)}</p>
        </div>
      </div>
    </li>
  );
};

export default MoviesCard;



// import { useLocation } from "react-router-dom";
// import './MoviesCard.css';
// import { Link } from "react-router-dom";
// import Button from "../Button/Button";

// export default function MoviesCard ({ poster, name, duration, isSave }) {
//   const location = useLocation();

//   const handleMovieSaved = () => {
    
//   };

//   return (
//     <li className="movie">
//       <Link
//         className="movie__trailer"
//         to="https://www.youtube.com/watch?v=Vdqnm9HL6zA"
//         target="_blanck"
//         rel="noreferrer"
//       >
//         <img className="movie__poster" src={poster} alt={name}></img>
//       </Link>
//       {location.pathname === '/saved-movies' ? (
//           <Button
//             type="button"
//             className="movie__save-button movie__save-button_type_delete"
//           ></Button>
//         ) : (
//           <Button
//             type="button"
//             className={
//               isSave
//                 ? "movie__save-button movie__save-button_type_save"
//                 : "movie__save-button movie__save-button_type_saved"
//             }
//             onClick={handleMovieSaved}
//           >Сохранить</Button>
//         )}
//       <div className="movie__info">
//         <h2 className="movie__name">{name}</h2>
//         <div className="movie__container-duration">
//           <p className="movie__duration">{duration}</p>
//         </div>
//       </div>
//     </li>
//   );
// }



// import { useLocation } from "react-router-dom";
// import { useState } from "react";
// import './MoviesCard.css';
// import { Link } from "react-router-dom";
// import { BASE_URL_MOVIES_API } from "../../utils/constants";
// import Button from "../Button/Button";

// export default function MoviesCard ({ 
//   movie,
//   movieId,
//   handleCreateMovie,
//   handleDeleteMovie,
//   isSaveMovie,
//   movieIdDb, 
// }) {

//   const [isSave, setIsSave] = useState(isSaveMovie);
//   const location = useLocation();

//   const handleClickSave = () => {
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

//   const handleClickDelete = () => {
//     handleDeleteMovie(movieIdDb, setIsSave);
//   };

//   const countTime = (duration) => {
//     const hour = Math.trunc(duration / 60);
//     const minutes = duration - 60 * hour;
//     const res = `${hour}ч ${minutes}м`;
//     return res;
//   };

//   return (
//     <li className="movie">
//       <Link
//         className="movie__trailer"
//         to={movie.trailerLink}
//         target="_blanck"
//         rel="noreferrer"
//       >
//         <img className="movie__poster" 
//           src={
//             location.pathname === "/movies"
//               ? `${BASE_URL_MOVIES_API}${movie.image.url}`
//               : movie.image
//           }
//           alt={movie.nameRU}></img>
//       </Link>
//       {location.pathname === '/movies' ? (
//           <Button
//             type="button"
//             className={`movie__save-button ${
//               isSave
//               ? "movie__save-button movie__save-button_type_save"
//               : "movie__save-button movie__save-button_type_saved"
//             }`}
//             text={!isSave && "Сохранить"}
//             onClick={!isSave ? handleClickSave : handleClickDelete}
//           />
//         ) : (
//           <Button
//             type="button"
//             className={"movie__save-button movie__save-button_type_delete"}
//             onClick={handleClickDelete}
//           />
//         )}
//       <div className="movie__info">
//         <h2 className="movie__name">{movie.nameRU}</h2>
//         <div className="movie__container-duration">
//           <p className="movie__duration">{countTime(movie.duration)}</p>
//         </div>
//       </div>
//     </li>
//   );
// }