import { useEffect } from "react";
import "./SearchForm.css";
// import Input from "../Input/Input";
// import Form from "../Form/Form";
// import Button from "../Button/Button";
import { useLocation } from 'react-router-dom';
import useFormValidation from "../../hooks/useFormValidation";
// import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm(
  {
    handleMovies,
    toggleSwitchShort,
    searchInput,
    savedMovies,
    statusShort
    // name,
    // nameError,
    // isCheckedFilteredMovies,
    // handleSubmitSearchFilteredMovies,
    // handleCheckboxChangeFilteredMovies,
    // setSearchQueryFilteredMovies,
    // searchQueryFilteredMovies,
    // isChecked,
  }
) {
  const { pathname } = useLocation();

  const { values, handleChange, resetForm, errors } = useFormValidation();

  function handleMoviesSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
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
            {/* <span className="search-form__error">{errors.search || ""}</span> */}
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
                checked={statusShort}
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



// import { useState } from "react";
// import "./SearchForm.css";
// import Input from "../Input/Input";
// import Form from "../Form/Form";
// import Button from "../Button/Button";
// import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

// export default function SearchForm({
//   name,
//   nameError,
//   isCheckedFilteredMovies,
//   handleSubmitSearchFilteredMovies,
//   handleCheckboxChangeFilteredMovies,
//   setSearchQueryFilteredMovies,
//   searchQueryFilteredMovies,
// }) {
//   const [isFocused, setIsFocused] = useState(false);

//   function handleFocus() {
//     setIsFocused(true);
//   };

//   function handleBlur() {
//     setIsFocused(false);
//   };

//   return (
//     <section className="search-form" aria-label="поиск фильмов">
//       <Form
//         className="search-form__form"
//         name={name}
//         onSubmit={(e) => handleSubmitSearchFilteredMovies(e)}
//       >
//         <div
//           className={`search-form__container ${
//             isFocused ? "search-form__container_focus" : ""
//           }`}
//         >
//           <div
//             className={`search-form__container-input ${
//               isFocused ? "search-form__container-input_focus" : ""
//             }`}
//           >
//             <div className="search-form__icon"></div>
//             <Input
//               classNameLabel="search-form__label"
//               classNameInput="search-form__input"
//               type="search"
//               name="search-input"
//               placeholder="Фильм"
//               required="required"
//               value={searchQueryFilteredMovies}
//               onChange={(e) => setSearchQueryFilteredMovies(e.target.value)}
//               onFocus={handleFocus}
//               onBlur={handleBlur}
//             />
//             <Button className="search-form__button" type="submit" text="Найти" />
//           </div>
//           <div className="search-form__filter">
//             <FilterCheckbox
//               name={`${name}-checkbox`}
//               isChecked={isCheckedFilteredMovies}
//               setCheckbox={handleCheckboxChangeFilteredMovies}
//             />
//             <p className="search-form__filter-title">Короткометражки</p>
//           </div>
//         </div>
//       </Form>
//       <p className="search__error">{nameError}</p>
//     </section>
//   );
// }
