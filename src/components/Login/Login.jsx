/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import AuthForm from "../AuthForm/AuthForm";
import Input from "../Inputs/Input";
import useFormWithValidation from "../../hooks/useFormWithValidation";

const Login = ({ handleLogin, status, setStatus, isLoading }) => {
  const initialValues = {
    "auth-email": "",
    "auth-password": "",
  };

  const validationRules = {
    "auth-email": [
      {
        regex: /^(?!\s*$).+/,
        message: "Поле обязательно для заполнения",
      },
      {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message:
          "Поле может содержать адрес электронной почты (например, test@test.test)",
      },
    ],
    "auth-password": [
      {
        regex: /^(?!\s*$).+/,
        message: "Поле обязательно для заполнения",
      },
    ],
  };

  const { values, handleChange, errors, isValid } = useFormWithValidation(
    initialValues,
    validationRules
  );

  useEffect(() => {
    return () => {
      setStatus("");
    };
  }, []);

  return (
    <main>
      <AuthForm
        title="Рады видеть!"
        name="auth-log"
        onSubmit={() =>
          handleLogin(values["auth-email"], values["auth-password"])
        }
        textButton="Войти"
        textParagraph="Ещё не зарегистрированы?"
        textLink="Регистрация"
        path="/signup"
        isLoginForm={true}
        isValidLogin={isValid}
        statusLogin={status}
        isLoading={isLoading}
      >
        <Input
          classNameInput={`auth-form__input ${
            errors["auth-email"] && "auth-form__input_type_error"
          }`}
          classNameLabel="auth-form__label"
          type="email"
          name="auth-email"
          placeholder="E-mail"
          required="required"
          label="E-mail"
          value={values["auth-email"]}
          onChange={(e) => handleChange(e)}
        >
          <span className="auth-form__input-error">{errors["auth-email"]}</span>
        </Input>
        <Input
          classNameInput={`auth-form__input ${
            errors["auth-password"] && "auth-form__input_type_error"
          }`}
          classNameLabel="auth-form__label"
          type="password"
          name="auth-password"
          placeholder="Пароль"
          required="required"
          label="Пароль"
          value={values["auth-password"]}
          onChange={(e) => handleChange(e)}
        >
          <span className="auth-form__input-error">
            {errors["auth-password"]}
          </span>
        </Input>
      </AuthForm>
    </main>
  );
};

export default Login;


//laif

// import AuthForm from "../AuthForm/AuthForm.jsx";
// import Input from "../Input/Input.jsx";

// export default function Login({ isValid, onSubmit, setIsError }) {
  
//   return (
//     <AuthForm
//       title="Рады видеть!"
//       name="signin"
//       textButton="Войти"
//       textUnderButton="Ещё не зарегистрированы?"
//       textLink="Регистрация"
//       path="/signup"
//       onSubmit={onSubmit}
//       setIsError={setIsError}
//       isValid={isValid}
//       loginForm={true}
//     >
//       <Input
//         classNameInput="form__input"
//         classNameLabel="form__label"
//         type="email"
//         name="email"
//         placeholder="E-mail"
//         label="E-mail"
//         required="required"
//         defaultValue="pochta@yandex.ru"
//       >
//         <span className="form__error"></span>
//       </Input>
//       <Input
//         classNameInput="form__input"
//         classNameLabel="form__label"
//         type="password"
//         name="password"
//         label="Пароль"
//         placeholder="Пароль"
//         required="required"
//         defaultValue="12345678912345"
//       >
//         <span className="form__error"></span>
//       </Input>
//     </AuthForm>
//   );
// }



// import AuthForm from "../AuthForm/AuthForm.jsx";
// import Input from "../Input/Input.jsx";
// import { useEffect } from "react";
// import useFormValidation from "../../hooks/useFormValidation";

// export default function Login({ handleLogin, status, setStatus, isLoading }) {
//   const initialValues = {
//     "email": "",
//     "password": "",
//   };

//   const validationRules = {
//     "email": [
//       {
//         regex: /^(?!\s*$).+/,
//         message: "Поле обязательно для заполнения",
//       },
//       {
//         regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//         message:
//           "Поле может содержать адрес электронной почты (например, test@test.test)",
//       },
//     ],
//     "password": [
//       {
//         regex: /^(?!\s*$).+/,
//         message: "Поле обязательно для заполнения",
//       },
//     ],
//   };

//   const { values, handleChange, errors, isValid } = useFormValidation(
//     initialValues,
//     validationRules
//   );

//   useEffect(() => {
//     return () => {
//       setStatus("");
//     };
//   }, []);

//   return (
//     <AuthForm
//       title="Рады видеть!"
//       name="login"
//       textButton="Войти"
//       textUnderButton="Ещё не зарегистрированы?"
//       textLink="Регистрация"
//       path="/signup"
//       onSubmit={() =>
//         handleLogin(values["email"], values["password"])
//       }
//       isLoginForm={true}
//       isValidLogin={isValid}
//       statusLogin={status}
//       isLoading={isLoading}
//     >
//       <Input
//         classNameInput={`form__input ${
//           errors["email"] && "form__input_type_error"
//         }`}
//         classNameLabel="form__label"
//         type="email"
//         name="email"
//         placeholder="E-mail"
//         label="E-mail"
//         required="required"
//         value={values["email"]}
//         onChange={(e) => handleChange(e)}
//       >
//         <span className="form__error">{errors["email"]}</span>
//       </Input>
//       <Input
//         classNameInput={`form__input ${
//           errors["password"] && "form__input_type_error"
//         }`}
//         classNameLabel="form__label"
//         type="password"
//         name="password"
//         label="Пароль"
//         placeholder="Пароль"
//         required="required"
//         value={values["password"]}
//         onChange={(e) => handleChange(e)}
//       >
//         <span className="form__error">{errors["password"]}</span>
//       </Input>
//     </AuthForm>
//   );
// }
