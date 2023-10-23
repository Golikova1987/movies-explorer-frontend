import { useState } from "react";
import "./SearchForm.css";
import Input from "../Input/Input";
import Form from "../Form/Form";
import Button from "../Button/Button";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({
  name,
  nameError,
  isCheckedFilteredMovies,
  handleSubmitSearchFilteredMovies,
  handleCheckboxChangeFilteredMovies,
  setSearchQueryFilteredMovies,
  searchQueryFilteredMovies,
}) {
  const [isFocused, setIsFocused] = useState(false);

  function handleFocus() {
    setIsFocused(true);
  };

  function handleBlur() {
    setIsFocused(false);
  };

  return (
    <section className="search-form" aria-label="поиск фильмов">
      <Form
        className="search-form__form"
        name={name}
        onSubmit={(e) => handleSubmitSearchFilteredMovies(e)}
      >
        <div
          className={`search-form__container ${
            isFocused ? "search-form__container_focus" : ""
          }`}
        >
          <div
            className={`search-form__container-input ${
              isFocused ? "search-form__container-input_focus" : ""
            }`}
          >
            <div className="search-form__icon"></div>
            <Input
              classNameLabel="search-form__label"
              classNameInput="search-form__input"
              type="search"
              name="search-input"
              placeholder="Фильм"
              required="required"
              value={searchQueryFilteredMovies}
              onChange={(e) => setSearchQueryFilteredMovies(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <Button className="search-form__button" type="submit" text="Найти" />
          </div>
          <div className="search-form__filter">
            <FilterCheckbox
              name={`${name}-checkbox`}
              isChecked={isCheckedFilteredMovies}
              setCheckbox={handleCheckboxChangeFilteredMovies}
            />
            <p className="search-form__filter-title">Короткометражки</p>
          </div>
        </div>
      </Form>
      <p className="search__error">{nameError}</p>
    </section>
  );
}
