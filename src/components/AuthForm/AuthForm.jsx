import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import Form from "../Form/Form.jsx";
import "./AuthForm.css";
import Button from "../Button/Button.jsx";


export default function AuthForm({ title, onSubmit, name, children, textButton, textUnderButton, textLink, path, loginForm }) {
  return (
    <section className="form">
      <Link className="form__link form__link_type_logo" to="/">
        <img className="form__logo" src={logo} alt="Логотип"></img>
      </Link>
      <h1 className="form__title">{title}</h1>
      <Form className="form__auth" onSubmit={onSubmit} name={name}>
        {children}
        <div
          className={`form__container ${
            loginForm ? "form__container_type_login" : ""
          }`}
        >
          <Button 
            className={`form__button ${
              loginForm ? "form__button_type_login" : ""
            }`}
            type="submit"
            text={textButton}
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