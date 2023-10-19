import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import { useState, useEffect } from "react";
import Button from "../Buttons/Button";
import MoviesCard from "../MoviesCard/MoviesCard";
import ResultSearch from "../ResultSearch/ResultSearch";
import Preloader from "../Preloader/Preloader";

const MoviesCardList = ({
  filteredMovies,
  savedMovies,
  filteredSavedMovies,
  handleCreateMovie,
  handleDeleteMovie,
  isSearchMovies,
  handleShowCards,
  isSearchSavedMovies,
  visibleCardsCount,
  isLoadingSavedMovies,
  setIsLoadingSavedMovies,
  isLoadingMovies,
}) => {
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
                <ul className="movies__list">
                  {filteredMovies
                    .slice(0, visibleCardsCount)
                    .map(({ id, ...props }) => (
                      <MoviesCard
                        movie={props}
                        isSaveMovie={savedMoviesIds.includes(id)}
                        movieIdDb={findIdDb(id)}
                        movieId={id}
                        key={id}
                        handleCreateMovie={handleCreateMovie}
                        handleDeleteMovie={handleDeleteMovie}
                      />
                    ))}
                </ul>
                {filteredMovies.length > visibleCardsCount && (
                  <Button
                    className="movies__button"
                    type="button"
                    text="Ещё"
                    onClick={handleShowCards}
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
                <ul className="movies__list">
                  {filteredSavedMovies.map(({ movieId, _id, ...props }) => (
                    <MoviesCard
                      movie={props}
                      isSaveMovie={savedMoviesIds.includes(movieId)}
                      movieIdDb={_id}
                      movieId={movieId}
                      key={movieId}
                      handleDeleteMovie={handleDeleteMovie}
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
};

export default MoviesCardList;


// import './MoviesCardList.css';
// import { useLocation } from "react-router-dom";
// import MoviesCard from '../MoviesCard/MoviesCard';
// import movieOne from '../../images/movie1.png';
// import movieTwo from '../../images/movie2.png';
// import movieThree from '../../images/movie3.png';
// import movieFour from '../../images/movie4.png';
// import './MoviesCardList.css';


// export default function MoviesCardList() {
//   const location = useLocation();
//   return (
//     <>
//       {location.pathname === "/movies" && (
//         <section className="movies" aria-label="список фильмов">
//           <ul className="movies__card-list">
//             <MoviesCard
//               poster={movieOne}
//               name="Пираты карибского моря"
//               duration="1ч42м"
//               isSave={true}
//             />
//             <MoviesCard
//               poster={movieTwo}
//               name="Человек муравей"
//               duration="1ч42м"
//               isSave={true}
//             />
//             <MoviesCard
//               poster={movieThree}
//               name="Великий Гэтсби"
//               duration="1ч42м"
//               isSave={true}
//             />
//             <MoviesCard
//               poster={movieFour}
//               name="Мортал Комбат"
//               duration="1ч42м"
//               isSave={true}
//             />
//           </ul>
//           <button className="movies__button" type="button">Ещё</button>
//         </section>
//       )}

//       {location.pathname === "/saved-movies" && (
//         <section className="movies" aria-label="Список сохранённых фильмов">
//           <ul className="movies__card-list">
//             <MoviesCard
//               poster={movieOne}
//               name="Пираты карибского моря"
//               duration="1ч42м"
//               isSave={true}
//             />
//             <MoviesCard
//               poster={movieFour}
//               name="Мортал Комбат"
//               duration="1ч42м"
//               isSave={true}
//             />
//           </ul>
//         </section>
//       )}
    
//     </>
//   );
// }



// import './MoviesCardList.css';
// import { useLocation } from "react-router-dom";
// import MoviesCard from '../MoviesCard/MoviesCard';
// // import movieOne from '../../images/movie1.png';
// // import movieTwo from '../../images/movie2.png';
// // import movieThree from '../../images/movie3.png';
// // import movieFour from '../../images/movie4.png';
// import { useState, useEffect } from "react";
// import ResultSearch from "../ResultSearch/ResultSearch";
// import Preloader from "../Preloader/Preloader";
// import './MoviesCardList.css';
// import Button from '../Button/Button';


// export default function MoviesCardList({ 
//   filteredMovies,
//   savedMovies,
//   filteredSavedMovies,
//   handleCreateMovie,
//   handleDeleteMovie,
//   isSearchMovies,
//   handleShowCards,
//   isSearchSavedMovies,
//   visibleCardsCount,
//   isLoadingSavedMovies,
//   setIsLoadingSavedMovies,
//   isLoadingMovies,
// }) {
//   const location = useLocation();

//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1500);
//   }, [filteredMovies]);

//   useEffect(() => {
//     if (isLoadingSavedMovies) {
//       setTimeout(() => {
//         setIsLoadingSavedMovies(false);
//       }, 1500);
//     }
//   }, [filteredSavedMovies, isLoadingSavedMovies, setIsLoadingSavedMovies]);

//   const savedMoviesIds = savedMovies.map((item) => item.movieId);

//   const findIdDb = (id) => {
//     const foundItem = savedMovies.find((item) => item.movieId === id);
//     return foundItem ? foundItem._id : null;
//   };

//   return (
//     <>
//       {location.pathname === "/movies" &&
//         (isLoadingMovies ? (
//           filteredMovies.length !== 0 &&
//           localStorage.getItem("searchQueryFilteredMovies") !== "" ? (
//             isLoading ? (
//               <Preloader />
//             ) : (
//               <section className="movies" aria-label="список фильмов">
//                 <ul className="movies__card-list">
//                   {filteredMovies
//                     .slice(0, visibleCardsCount)
//                     .map(({ id, ...props }) => (
//                       <MoviesCard
//                         movie={props}
//                         isSaveMovie={savedMoviesIds.includes(id)}
//                         movieIdDb={findIdDb(id)}
//                         movieId={id}
//                         key={id}
//                         handleCreateMovie={handleCreateMovie}
//                         handleDeleteMovie={handleDeleteMovie}
//                       />
//                     ))}
//                 </ul>
//                 {filteredMovies.length > visibleCardsCount && (
//                   <Button
//                     className="movies__button"
//                     type="button"
//                     text="Ещё"
//                     onClick={handleShowCards}
//                   />
//                 )}
//               </section>
//             )
//           ) : (
//             isSearchMovies &&
//             (isLoading ? <Preloader /> : <ResultSearch isError={false} />)
//           )
//         ) : (
//           <ResultSearch isError={true} />
//         ))}

//       {location.pathname === "/saved-movies" &&
//         (isLoadingMovies ? (
//           filteredSavedMovies.length !== 0 ? (
//             isLoadingSavedMovies ? (
//               <Preloader />
//             ) : (
//               <section className="movies" aria-label="Список сохраненных фильмов">
//                 <ul className="movies__card-list">
//                   {filteredSavedMovies.map(({ movieId, _id, ...props }) => (
//                     <MoviesCard
//                       movie={props}
//                       isSaveMovie={savedMoviesIds.includes(movieId)}
//                       movieIdDb={_id}
//                       movieId={movieId}
//                       key={movieId}
//                       handleDeleteMovie={handleDeleteMovie}
//                     />
//                   ))}
//                 </ul>
//               </section>
//             )
//           ) : (
//             isSearchSavedMovies &&
//             (isLoadingSavedMovies ? (
//               <Preloader />
//             ) : (
//               <ResultSearch isError={false} />
//             ))
//           )
//         ) : (
//           <ResultSearch isError={true} />
//         ))}
//     </>
//   );
// };