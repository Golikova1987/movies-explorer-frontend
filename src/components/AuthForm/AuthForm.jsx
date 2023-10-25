import { Link } from "react-router-dom";
import "./AuthForm.css";
import Form from "../Form/Form";
import Button from "../Button/Button";
import logo from "../../images/logo.svg";

export default function AuthForm({
  title,
  name,
  textLink,
  textUnderButton,
  onSubmit,
  children,
  isLoading,
  textButton,
  path,
  isFormLogin,
  isValid,
  isValidLogin,
  isError,
  error,
  errorLogin,
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
            isFormLogin ? "form__container_type_login" : ""
          }`}
        >
          <p
            className={`form__error ${
              isFormLogin ? "form__error_type_login" : ""
            }`}
          >
            {isFormLogin ? errorLogin : error}
          </p>
          <Button
            className={`form__button ${
              isFormLogin ? "form__button_type_login" : ""
            }`}
            type="submit"
            text={textButton}
            disabled={(isFormLogin ? !isValidLogin : !isValid) || isLoading}
            // disabled={!isValid || isLoading || isError}
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


// import { Link } from "react-router-dom";
// import "./AuthForm.css";
// import Form from "../Form/Form";
// import Button from "../Button/Button";
// import logo from "../../images/logo.svg";

// export default function AuthForm({
//   title,
//   name,
//   textLink,
//   textUnderButton,
//   onSubmit,
//   children,
//   isLoading,
//   textButton,
//   path,
//   isFormLogin,
//   isValid,
//   isValidLogin,
//   error,
//   errorLogin,
// }) {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit();
//   };

//   return (
//     <section className="form">
//       <Link className="form__link form__link_type_logo" to="/">
//         <img className="form__logo" src={logo} alt="Логотип"></img>
//       </Link>
//       <h1 className="form__title">{title}</h1>
//       <Form
//         className="form__auth"
//         onSubmit={(e) => handleSubmit(e)}
//         name={name}
//       >
//         {children}
//         <div
//           className={`form__container ${
//             isFormLogin ? "form__container_type_login" : ""
//           }`}
//         >
//           <p
//             className={`form__error ${
//               isFormLogin ? "form__error_type_login" : ""
//             }`}
//           >
//             {isFormLogin ? errorLogin : error}
//           </p>
//           <Button
//             className={`form__button ${
//               isFormLogin ? "form__button_type_login" : ""
//             }`}
//             type="submit"
//             text={textButton}
//             disabled={(isFormLogin ? !isValidLogin : !isValid) || isLoading}
//           />
//           <p className="form__text">
//             {textUnderButton}{" "}
//             <Link className="form__link" to={path}>
//               {textLink}
//             </Link>
//           </p>
//         </div>
//       </Form>
//     </section>
//   );
// }