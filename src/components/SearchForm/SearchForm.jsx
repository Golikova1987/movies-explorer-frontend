import { useState } from "react";
import "./SearchForm.css";
import Input from "../Inputs/Input";
import Form from "../Forms/Form";
import Button from "../Buttons/Button";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = ({
  name,
  handleSubmitSearchFilteredMovies,
  handleCheckboxChangeFilteredMovies,
  nameError,
  setSearchQueryFilteredMovies,
  searchQueryFilteredMovies,
  isCheckedFilteredMovies,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <section className="search" aria-label="поиск фильмов">
      <Form
        className="search__form"
        name={name}
        onSubmit={(e) => handleSubmitSearchFilteredMovies(e)}
      >
        <div
          className={`search__form-container ${
            isFocused ? "search__form-container_focus" : ""
          }`}
        >
          <div
            className={`search__form-container-input ${
              isFocused ? "search__form-container-input_focus" : ""
            }`}
          >
            <div className="search__icon-search"></div>
            <Input
              classNameLabel="search__label"
              classNameInput="search__input"
              type="search"
              name="search-input"
              placeholder="Фильм"
              required="required"
              value={searchQueryFilteredMovies}
              onChange={(e) => setSearchQueryFilteredMovies(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <Button className="search__button" type="submit" text="Найти" />
          </div>
          <div className="search__checkbox-filter">
            <FilterCheckbox
              name={`${name}-checkbox`}
              isChecked={isCheckedFilteredMovies}
              setCheckbox={handleCheckboxChangeFilteredMovies}
            />
            <p className="search__checkbox-title">Короткометражки</p>
          </div>
        </div>
      </Form>
      <p className="search__error">{nameError}</p>
    </section>
  );
};

export default SearchForm;



// import './SearchForm.css';
// import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
// import Form from "../Form/Form";
// import Input from "../Input/Input";
// import Button from "../Button/Button";

// export default function SearchForm() {
//   return (
//     <section className="search-form" aria-label="поиск фильмов">
//       <Form
//         className="search-form__form"
//         name="search-form"
//       >
//         <div className="search-form__container">
//           <div className="search-form__container-input">
//             <div className="search-form__icon"></div>
//             <Input
//               classNameLabel="search-form__label"
//               classNameInput="search-form__input"
//               type="search"
//               name="search-input"
//               placeholder="Фильм"
//               required="required"
//             />
//             <Button className="search-form__button" type="submit" text="Найти" />
//           </div>
//           <div className="search-form__filter">
//             <FilterCheckbox />
//             <p className="search-form__filter-title">Короткометражки</p>
//           </div>
//         </div>
//       </Form>
//     </section>
//   );
// }



// import './SearchForm.css';
// import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
// import Form from "../Form/Form";
// import Input from "../Input/Input";
// import Button from "../Button/Button";
// import { useState } from "react";

// export default function SearchForm({
//   name,
//   handleSubmitSearchFilteredMovies,
//   handleCheckboxChangeFilteredMovies,
//   nameError,
//   setSearchQueryFilteredMovies,
//   searchQueryFilteredMovies,
//   isCheckedFilteredMovies,
// }) {
//   const [isFocused, setIsFocused] = useState(false);

//   const handleFocus = () => {
//     setIsFocused(true);
//   };

//   const handleBlur = () => {
//     setIsFocused(false);
//   };

//   return (
//     <section className="search-form" aria-label="поиск фильмов">
//       <Form
//         className="search-form__form"
//         name={name}
//         onSubmit={(e) => handleSubmitSearchFilteredMovies(e)}
//       >
//         <div className={`search-form__container ${
//             isFocused ? "search-form__container_focus" : ""
//           }`}>
//           <div className={`search-form__container-input ${
//               isFocused ? "search-form__container-input_focus" : ""
//             }`}>
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
//       <p className="search-form__error">{nameError}</p>
//     </section>
//   );
// }