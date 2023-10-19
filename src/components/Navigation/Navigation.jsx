import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Button from "../Buttons/Button";

const Navigation = () => {
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

  const handleOpenBurger = () => {
    setIsOpenBurger(true);
  };

  const handleCloseBurger = () => {
    setIsOpenBurger(false);
  };

  return (
    <>
      <Button
        className="header__burger"
        type="button"
        onClick={handleOpenBurger}
      />
      <nav
        className={`header__nav-mobile ${
          isOpenBurger ? "header__nav-mobile_active" : ""
        }`}
      >
        <div className="header__container-mobile">
          <Button
            className="header__burger-exit"
            type="button"
            onClick={handleCloseBurger}
          />
          <ul className="header__list-mobile">
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
          <div className="header__container-link header__container-link_type_mobile">
            <NavLink className={setProfile} to="/profile">
              Аккаунт
            </NavLink>
            <div className="header__icon-profile"></div>
          </div>
        </div>
      </nav>
      <nav className="header__nav-desktop">
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
          <li className="header__container-link">
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
};

export default Navigation;


// import { useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import Button from "../Button/Button";

// export default function Navigation() {
//   const [openBurger, setOpenBurger] = useState(false);
//   const location = useLocation();

//   const setActive = ({ isActive }) =>
//     isActive
//       ? "header__link header__link_type_auth header__link_active"
//       : "header__link header__link_type_auth";
      
//   const setProfile = ({ isActive }) =>
//     isActive
//       ? "header__link header__link_type_auth header__link_type_profile header__link_active"
//       : "header__link header__link_type_auth header__link_type_profile";

//   const handleOpenBurger = () => {
//     setOpenBurger(true);
//   };

//   const handleCloseBurger = () => {
//     setOpenBurger(false);
//   };

//   return (
//     <>
//       <Button
//         className="header__button-burger"
//         type="button"
//         onClick={handleOpenBurger}
//       />
//       <nav
//         className={`header__mobile ${
//           openBurger ? "header__mobile_active" : ""
//         }`}
//       >
//         <div className="header__mobile-container">
//           <Button
//             className="header__button-exit"
//             type="button"
//             onClick={handleCloseBurger}
//           />
//           <ul className="header__mobile-list">
//             <li>
//               <NavLink className={setActive} to="/">
//                 Главная
//               </NavLink>
//             </li>
//             <li>
//               <NavLink className={setActive} to="/movies">
//                 Фильмы
//               </NavLink>
//             </li>
//             <li>
//               <NavLink className={setActive} to="/saved-movies">
//                 Сохраненные фильмы
//               </NavLink>
//             </li>
//           </ul>
//           <div className="header__link-profile header__link-profile_type_mobile">
//             <NavLink className={setProfile} to="/profile">
//               Аккаунт
//             </NavLink>
//             <div className="header__icon-profile"></div>
//           </div>
//         </div>
//       </nav>
//       <nav className="header__desktop">
//         <ul className="header__list header__list_type_auth">
//           <li>
//             <NavLink className={setActive} to="/movies">
//               Фильмы
//             </NavLink>
//           </li>
//           <li>
//             <NavLink className={setActive} to="/saved-movies">
//               Сохраненные фильмы
//             </NavLink>
//           </li>
//           <li className="header__link-profile">
//             <NavLink className={setActive} to="/profile">
//               Аккаунт
//             </NavLink>
//             <div
//               className={`header__icon-profile ${
//                 location.pathname === "/"
//                   ? "header__icon-profile_type_main"
//                   : ""
//               }`}
//             ></div>
//           </li>
//         </ul>
//       </nav>
//     </>
//   );
// };