import './FilterCheckbox.css';
import Input from '../Input/Input';

export default function FilterCheckbox() {
  return (
    <Input
      classNameLabel="search__label-switch"
      classNameInput="search__input-checkbox"
      type="checkbox"
      name="search-checkbox"
      tabIndex="0"
    >
      <span className="search__slider"></span>
    </Input>
  );
}