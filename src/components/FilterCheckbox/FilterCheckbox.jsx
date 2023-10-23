import "./FilterCheckbox.css";
import Input from "../Input/Input";

export default function FilterCheckbox({ name, isChecked, setCheckbox }) {
  return (
    <Input
      classNameLabel="search-form__label-switch"
      classNameInput="search-form__input-checkbox"
      type="checkbox"
      name={name}
      tabIndex="0"
      checked={isChecked}
      onChange={(e) => setCheckbox(e.target.checked)}
    >
      <span className="search__slider"></span>
    </Input>
  );
}
