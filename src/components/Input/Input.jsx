const Input = ({
  type,
  name,
  placeholder,
  children,
  classNameLabel,
  classNameInput,
  label,
  value,
  defaultValue,
  required,
  disabled,
  tabIndex,
}) => {
  return (
    <label className={classNameLabel} tabIndex={tabIndex}>
      {label}
      <input
        className={classNameInput}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        required={required}
        minLength="2"
        maxLength="30"
        disabled={disabled}
      />
      {children}
    </label>
  );
};

export default Input;