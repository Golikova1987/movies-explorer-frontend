import Input from "../Input/Input.jsx";
import AuthForm from "../AuthForm/AuthForm.jsx";

export default function Register() {
  return (
    <AuthForm
      title="Добро пожаловать!"
      name="register"
      textButton="Зарегистрироваться"
      textUnderButton="Уже зарегистрированы?"
      textLink="Войти"
      path="/signin"
    >
      <Input
        classNameInput="form__input"
        classNameLabel="form__label"
        type="text"
        name="name"
        placeholder="Имя"
        label="Имя"
        required
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
        required
        defaultValue="pochta@yandex.ru"
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
        required
        defaultValue="12345678912345"
      >
        <span className="form__error">Что-то пошло не так...</span>
      </Input>
    </AuthForm>
  );
}
