import { useEffect } from "react";
import "./SearchForm.css";
import { useLocation } from 'react-router-dom';
import useFormValidation from "../../hooks/useFormValidation";

export default function SearchForm(
  {
    handleMovies,
    searchInput,
    savedMovies,
    toggleSwitchShort,
    isCheckboxActive
  }
) {
  const { pathname } = useLocation();

  const initialValues = {
    "search": "",
  };

  const validationRules = {
    "search": [
      {
        message: "Нужно ввести ключевое слово",
      },
    ],
  }

  const { values, handleChange, errors, resetForm } = useFormValidation(
    initialValues,
    validationRules
  );

  function handleMoviesSubmit(evt) {
    evt.preventDefault();
    handleMovies(evt.target.search.value);
  }

  useEffect(() => {
    if (pathname === "/saved-movies" && savedMovies.length === 0) {
      resetForm({ search: "" });
    } else {
      resetForm({ search: searchInput });
    }
  }, [searchInput, resetForm, pathname, savedMovies]);

  return (
    <section className="search-form">
      <form
        className="search-form__form"
        onSubmit={handleMoviesSubmit}
        noValidate
      >
        <div className="search-form__container">
          <div className="search-form__container-input">
            <div className="search-form__icon"></div>
            <input
              name="search"
              className="search-form__input"
              type="text"
              placeholder="Фильм"
              minLength="1"
              value={values.search || ""}
              onChange={(evt) => {
                handleChange(evt);
              }}
              required
            />
            <button
              className={`search-form__button ${
                savedMovies
                  ? pathname === "/saved-movies" && savedMovies.length === 0
                  : ""
              }`}
              type="submit"
            >
              Найти
            </button>
          </div>
          <div className="search-form__filter">
            <label className="search-form__label-switch">
              <input
                className="search-form__input-checkbox"
                onChange={toggleSwitchShort}
                type="checkbox"
                id="checkbox"
                name="checkbox"
                checked={isCheckboxActive}
              ></input>
              <span className="search-form__filter-title">Короткометражки</span>
            </label>
          </div>
        </div>
        <p className="search-form__error">{errors.search || ""}</p>
      </form>
    </section>
  );
}