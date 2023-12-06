import "./Header.css";
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Header ({ isLoggedIn }) {
  const location = useLocation();

  return (
    <header
      className={`header ${
        location.pathname === "/" ? "header_type_background" : ""
      }`}
    >
      <div className="header__container">
        <Link className="header__link header__link_type_logo" to="/">
          <img className="header__logo" src={logo} alt="Логотип"></img>
        </Link>
        {isLoggedIn ? (
          <Navigation />
        ) : (
          <nav className='header__nav'>
            <ul className="header__list">
              <li className='header__item'>
                <Link className="header__link" to="/signup">
                  Регистрация
                </Link>
              </li>
              <li className='header__item'>
                <Link
                  className="header__link header__link_type_login"
                  to="/signin"
                >
                  Войти
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}