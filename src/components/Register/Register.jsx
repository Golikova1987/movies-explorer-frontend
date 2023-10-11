import Input from "../Input/Input.jsx";
import AuthForm from "../AuthForm/AuthForm.jsx";

export default function Register() {
  const handleRegister = () => {};
  const handleChange = () => {};

  return (
    <AuthForm
      title="Добро пожаловать!"
      name="register"
      textButton="Зарегистрироваться"
      textUnderButton="Уже зарегистрированы?"
      textLink="Войти"
      path="/signin"
      onSubmit={handleRegister}
    >
      <Input
        classNameInput="form__input"
        classNameLabel="form__label"
        type="text"
        name="name"
        placeholder="Имя"
        label="Имя"
        required="required"
        minLength="2"
        maxLength="30"
        defaultValue="Виталий"
      >
        <span className="form__error"></span>
      </Input>
      <Input
        classNameInput="form__input"
        classNameLabel="form__label"
        type="email"
        name="email"
        label="E-mail"
        placeholder="E-mail"
        required="required"
        defaultValue="pochta@yandex.ru"
        onChange={handleChange}
      >
        <span className="form__error"></span>
      </Input>
      <Input
        classNameInput="form__input form__input_type_error"
        classNameLabel="form__label"
        name="password"
        type="password"
        placeholder="Пароль"
        label="Пароль"
        required="required"
        defaultValue="12345678912345"
        onChange={handleChange}
      >
        <span className="form__error">Что-то пошло не так...</span>
      </Input>
    </AuthForm>
  );
}
