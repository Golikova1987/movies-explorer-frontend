import { Link } from "react-router-dom";
import "./AuthForm.css";
import Form from "../Forms/Form";
import Button from "../Buttons/Button";
import logo from "../../images/logo.svg";

const AuthForm = ({
  title,
  name,
  onSubmit,
  children,
  textButton,
  textLink,
  textParagraph,
  path,
  isLoginForm,
  isValid,
  isValidLogin,
  status,
  statusLogin,
  isLoading,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <section className="auth-form">
      <Link className="auth-form__link auth-form__link_type_logo" to="/">
        <img className="auth-form__logo" src={logo} alt="Логотип"></img>
      </Link>
      <h1 className="auth-form__heading">{title}</h1>
      <Form
        className="auth-form__form"
        onSubmit={(e) => handleSubmit(e)}
        name={name}
      >
        {children}
        <div
          className={`auth-form__container ${
            isLoginForm ? "auth-form__container_type_login" : ""
          }`}
        >
          <p
            className={`auth-form__error ${
              isLoginForm ? "auth-form__error_type_login" : ""
            }`}
          >
            {isLoginForm ? statusLogin : status}
          </p>
          <Button
            className={`auth-form__button ${
              isLoginForm ? "auth-form__button_type_login" : ""
            }`}
            type="submit"
            text={textButton}
            disabled={(isLoginForm ? !isValidLogin : !isValid) || isLoading}
          />
          <p className="auth-form__text">
            {textParagraph}{" "}
            <Link className="auth-form__link" to={path}>
              {textLink}
            </Link>
          </p>
        </div>
      </Form>
    </section>
  );
};

export default AuthForm;


//laiv

// import { Link } from "react-router-dom";
// import logo from "../../images/logo.svg";
// import Form from "../Form/Form.jsx";
// import "./AuthForm.css";
// import Button from "../Button/Button.jsx";
// import { useContext } from "react";
// import SendContext from "../../contexts/SendContext";
// import ErrorContext from "../../contexts/ErrorContext";


// export default function AuthForm({ title, onSubmit, name, children, textButton, textUnderButton, textLink, path, loginForm, isValid, setIsError }) {
//   const isSend = useContext(SendContext)
//   const isError = useContext(ErrorContext)

//   return (
//     <section className="form">
//       <Link className="form__link form__link_type_logo" to="/">
//         <img className="form__logo" src={logo} alt="Логотип"></img>
//       </Link>
//       <h1 className="form__title">{title}</h1>
//       <Form className="form__auth" onSubmit={onSubmit} name={name} isValid={isValid} setIsError={setIsError}>
//         {children}
//         <div
//           className={`form__container ${
//             loginForm ? "form__container_type_login" : ""
//           }`}
//         >
//           <Button 
//             className={`form__button ${
//               loginForm ? "form__button_type_login" : ""
//             }`}
//             type="submit"
//             text={textButton}
//             disabled={!isValid || isSend || isError}
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


// import { Link } from "react-router-dom";
// import logo from "../../images/logo.svg";
// import Form from "../Form/Form.jsx";
// import "./AuthForm.css";
// import Button from "../Button/Button.jsx";


// const AuthForm = ({ 
//   title,
//   onSubmit, 
//   name, 
//   children, 
//   textButton, 
//   textUnderButton, 
//   textLink, 
//   path,  
//   isLoginForm,
//   isValidLogin,
//   isValid,
//   status,
//   statusLogin,
//   isLoading 
// }) => {

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
//             isLoginForm ? "form__container_type_login" : ""
//           }`}
//         >
//           <p
//             className={`form__error ${
//               isLoginForm ? "form__error_type_login" : ""
//             }`}
//           >
//             {isLoginForm ? statusLogin : status}
//           </p>
//           <Button 
//             className={`form__button ${
//               isLoginForm ? "form__button_type_login" : ""
//             }`}
//             type="submit"
//             text={textButton}
//             disabled={(isLoginForm ? !isValidLogin : !isValid) || isLoading}
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

// export default AuthForm;