import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Button from "../Button/Button";

export default function Navigation() {
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const location = useLocation();

  const setActive = ({ isActive }) =>
    isActive
      ? "header__link header__link_type_auth header__link_active"
      : "header__link header__link_type_auth";
  const setProfile = ({ isActive }) =>
    isActive
      ? "header__link header__link_type_auth header__link_type_profile header__link_active"
      : "header__link header__link_type_auth header__link_type_profile";

  function handleOpenBurger() {
    setIsOpenBurger(true);
  };

  function handleCloseBurger() {
    setIsOpenBurger(false);
  };

  return (
    <>
      <Button
        className="header__button-burger"
        type="button"
        onClick={handleOpenBurger}
      />
      <nav
        className={`header__mobile ${
          isOpenBurger ? "header__mobile_active" : ""
        }`}
      >
        <div className="header__mobile-container">
          <Button
            className="header__button-exit"
            type="button"
            onClick={handleCloseBurger}
          />
          <ul className="header__mobile-list">
            <li>
              <NavLink className={setActive} to="/">
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink className={setActive} to="/movies">
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink className={setActive} to="/saved-movies">
                Сохраненные фильмы
              </NavLink>
            </li>
          </ul>
          <div className="header__link-profile header__link-profile_type_mobile">
            <NavLink className={setProfile} to="/profile">
              Аккаунт
            </NavLink>
            <div className="header__icon-profile"></div>
          </div>
        </div>
      </nav>
      <nav className="header__desktop">
        <ul className="header__list header__list_type_auth">
          <li>
            <NavLink className={setActive} to="/movies">
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink className={setActive} to="/saved-movies">
              Сохраненные фильмы
            </NavLink>
          </li>
          <li className="header__link-profile">
            <NavLink className={setActive} to="/profile">
              Аккаунт
            </NavLink>
            <div
              className={`header__icon-profile ${
                location.pathname === "/"
                  ? "header__icon-profile_type_main"
                  : ""
              }`}
            ></div>
          </li>
        </ul>
      </nav>
    </>
  );
}