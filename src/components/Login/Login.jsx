import AuthForm from "../AuthForm/AuthForm.jsx";
import Input from "../Input/Input.jsx";

export default function Login({ setLoggedIn }) {
  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <AuthForm
      title="Рады видеть!"
      name="login"
      textButton="Войти"
      textUnderButton="Ещё не зарегистрированы?"
      textLink="Регистрация"
      path="/signup"
      onSubmit={handleLogin}
      loginForm={true}
    >
      <Input
        classNameInput="form__input"
        classNameLabel="form__label"
        type="email"
        name="email"
        placeholder="E-mail"
        label="E-mail"
        required
        defaultValue="pochta@yandex.ru"
      >
        <span className="form__error"></span>
      </Input>
      <Input
        classNameInput="form__input"
        classNameLabel="form__label"
        type="password"
        name="password"
        label="Пароль"
        placeholder="Пароль"
        required
        defaultValue="12345678912345"
      >
        <span className="form__error"></span>
      </Input>
    </AuthForm>
  );
}
