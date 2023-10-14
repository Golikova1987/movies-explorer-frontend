import { useLocation } from "react-router-dom";
import './MoviesCard.css';
import { Link } from "react-router-dom";
import Button from "../Button/Button";

export default function MoviesCard ({ poster, name, duration, isSave }) {
  const location = useLocation();

  const handleMovieSaved = () => {
    
  };

  return (
    <li className="movie">
      <Link
        className="movie__trailer"
        to="https://www.youtube.com/watch?v=Vdqnm9HL6zA"
        target="_blanck"
        rel="noreferrer"
      >
        <img className="movie__poster" src={poster} alt={name}></img>
      </Link>
      {location.pathname === '/saved-movies' ? (
          <Button
            type="button"
            className="movie__save-button movie__save-button_type_delete"
          ></Button>
        ) : (
          <Button
            type="button"
            className={
              isSave
                ? "movie__save-button movie__save-button_type_save"
                : "movie__save-button movie__save-button_type_saved"
            }
            onClick={handleMovieSaved}
          >Сохранить</Button>
        )}
      <div className="movie__info">
        <h2 className="movie__name">{name}</h2>
        <div className="movie__container-duration">
          <p className="movie__duration">{duration}</p>
        </div>
      </div>
    </li>
  );
}