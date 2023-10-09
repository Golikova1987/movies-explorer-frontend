import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";

export default function SearchForm() {
  return (
    <section className="search-form" aria-label="поиск фильмов">
      <Form
        className="search-form__form"
        name="search-form"
      >
        <div className="search-form__container">
          <div className="search-form__container-input">
            <div className="search-form__icon"></div>
            <Input
              classNameLabel="search-form__label"
              classNameInput="search-form__input"
              type="search"
              name="search-input"
              placeholder="Фильм"
              required="required"
            />
            <Button className="search-form__button" type="submit" text="Найти" />
          </div>
          <div className="search-form__filter">
            <FilterCheckbox />
            <p className="search-form__filter-title">Короткометражки</p>
          </div>
        </div>
      </Form>
    </section>
  );
}