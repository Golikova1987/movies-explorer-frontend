import './MoviesCardList.css';
import { useLocation } from "react-router-dom";
import MoviesCard from '../MoviesCard/MoviesCard';
import movieOne from '../../images/movie1.png';
import movieTwo from '../../images/movie2.png';
import movieThree from '../../images/movie3.png';
import movieFour from '../../images/movie4.png';
import './MoviesCardList.css';


export default function MoviesCardList() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/movies" && (
        <section className="movies" aria-label="список фильмов">
          <ul className="movies__card-list">
            <MoviesCard
              poster={movieOne}
              name="Пираты карибского моря"
              duration="1ч42м"
              isSave={true}
            />
            <MoviesCard
              poster={movieTwo}
              name="Человек муравей"
              duration="1ч42м"
              isSave={true}
            />
            <MoviesCard
              poster={movieThree}
              name="Великий Гэтсби"
              duration="1ч42м"
              isSave={true}
            />
            <MoviesCard
              poster={movieFour}
              name="Мортал Комбат"
              duration="1ч42м"
              isSave={true}
            />
          </ul>
          <button className="movies__button" type="button">Ещё</button>
        </section>
      )}

      {location.pathname === "/saved-movies" && (
        <section className="movies" aria-label="Список сохранённых фильмов">
          <ul className="movies__card-list">
            <MoviesCard
              poster={movieOne}
              name="Пираты карибского моря"
              duration="1ч42м"
              isSave={true}
            />
            <MoviesCard
              poster={movieFour}
              name="Мортал Комбат"
              duration="1ч42м"
              isSave={true}
            />
          </ul>
        </section>
      )}
    
    </>
  );
}