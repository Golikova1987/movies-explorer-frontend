import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import { useState, useEffect } from "react";
import ResultSearch from "../ResultSearch/ResultSearch";
import Preloader from "../Preloader/Preloader";
import Button from "../Button/Button";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  handleDeleteMovie,
  isSearchMovies,
  handleShowCards,
  isSearchSavedMovies,
  visibleCardsCount,
  isLoadingSavedMovies,
  setIsLoadingSavedMovies,
  isLoadingMovies,
  filteredMovies,
  savedMovies,
  filteredSavedMovies,
  handleCreateMovie,
}) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [filteredMovies]);

  useEffect(() => {
    if (isLoadingSavedMovies) {
      setTimeout(() => {
        setIsLoadingSavedMovies(false);
      }, 1500);
    }
  }, [filteredSavedMovies, isLoadingSavedMovies, setIsLoadingSavedMovies]);

  const savedMoviesIds = savedMovies.map((item) => item.movieId);

  const findIdDb = (id) => {
    const foundItem = savedMovies.find((item) => item.movieId === id);
    return foundItem ? foundItem._id : null;
  };

  return (
    <>
      {location.pathname === "/movies" &&
        (isLoadingMovies ? (
          filteredMovies.length !== 0 &&
          localStorage.getItem("searchQueryFilteredMovies") !== "" ? (
            isLoading ? (
              <Preloader />
            ) : (
              <section className="movies" aria-label="фильмы">
                <ul className="movies__card-list">
                  {filteredMovies
                    .slice(0, visibleCardsCount)
                    .map(({ id, ...props }) => (
                      <MoviesCard
                        movie={props}
                        key={id}
                        handleCreateMovie={handleCreateMovie}
                        handleDeleteMovie={handleDeleteMovie}
                        isSaveMovie={savedMoviesIds.includes(id)}
                        movieIdDb={findIdDb(id)}
                        movieId={id}
                      />
                    ))}
                </ul>
                {filteredMovies.length > visibleCardsCount && (
                  <Button
                    className="movies__button"
                    text="Ещё"
                    onClick={handleShowCards}
                    type="button"
                  />
                )}
              </section>
            )
          ) : (
            isSearchMovies &&
            (isLoading ? <Preloader /> : <ResultSearch isError={false} />)
          )
        ) : (
          <ResultSearch isError={true} />
        ))}

      {location.pathname === "/saved-movies" &&
        (isLoadingMovies ? (
          filteredSavedMovies.length !== 0 ? (
            isLoadingSavedMovies ? (
              <Preloader />
            ) : (
              <section className="movies" aria-label="сохраненные фильмы">
                <ul className="movies__card-list">
                  {filteredSavedMovies.map(({ movieId, _id, ...props }) => (
                    <MoviesCard
                      movie={props}
                      movieId={movieId}
                      key={movieId}
                      handleDeleteMovie={handleDeleteMovie}
                      isSaveMovie={savedMoviesIds.includes(movieId)}
                      movieIdDb={_id}
                    />
                  ))}
                </ul>
              </section>
            )
          ) : (
            isSearchSavedMovies &&
            (isLoadingSavedMovies ? (
              <Preloader />
            ) : (
              <ResultSearch isError={false} />
            ))
          )
        ) : (
          <ResultSearch isError={true} />
        ))}
    </>
  );
}