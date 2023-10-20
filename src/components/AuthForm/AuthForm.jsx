import { Link } from "react-router-dom";
import "./AuthForm.css";
import Form from "../Forms/Form";
import Button from "../Buttons/Button";
import logo from "../../images/logo.svg";

export default function AuthForm({
  title,
  name,
  onSubmit,
  children,
  textButton,
  textLink,
  textUnderButton,
  path,
  isLoginForm,
  isValid,
  isValidLogin,
  status,
  statusLogin,
  isLoading,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <section className="form">
      <Link className="form__link form__link_type_logo" to="/">
        <img className="form__logo" src={logo} alt="Логотип"></img>
      </Link>
      <h1 className="form__title">{title}</h1>
      <Form
        className="form__auth"
        onSubmit={(e) => handleSubmit(e)}
        name={name}
      >
        {children}
        <div
          className={`form__container ${
            isLoginForm ? "form__container_type_login" : ""
          }`}
        >
          <p
            className={`form__error ${
              isLoginForm ? "form__error_type_login" : ""
            }`}
          >
            {isLoginForm ? statusLogin : status}
          </p>
          <Button
            className={`form__button ${
              isLoginForm ? "form__button_type_login" : ""
            }`}
            type="submit"
            text={textButton}
            disabled={(isLoginForm ? !isValidLogin : !isValid) || isLoading}
          />
          <p className="form__text">
            {textUnderButton}{" "}
            <Link className="form__link" to={path}>
              {textLink}
            </Link>
          </p>
        </div>
      </Form>
    </section>
  );
}