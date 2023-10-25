/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import AuthForm from "../AuthForm/AuthForm";
import Input from "../Input/Input";
import useFormValidation from "../../hooks/useFormValidation";

export default function Login({ handleLogin, error, setError, isLoading }) {
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

  const { handleChange, values, errors, isValid } = useFormValidation(
    initialValues,
    validationRules
  );

  useEffect(() => {
    return () => {
      setError("");
    };
  }, []);

  return (
    <main>
      <AuthForm
        title="Рады видеть!"
        name="login"
        onSubmit={() =>
          handleLogin(values["auth-email"], values["auth-password"])
        }
        textButton="Войти"
        textUnderButton="Ещё не зарегистрированы?"
        textLink="Регистрация"
        path="/signup"
        isFormLogin={true}
        isValidLogin={isValid}
        errorLogin={error}
        isLoading={isLoading}
      >
        <Input
          classNameInput={`form__input ${
            errors["auth-email"] && "form__input_type_error"
          }`}
          classNameLabel="form__label"
          type="email"
          name="auth-email"
          placeholder="E-mail"
          required="required"
          label="E-mail"
          value={values["auth-email"]}
          onChange={(e) => handleChange(e)}
        >
          <span className="form__input-error">{errors["auth-email"]}</span>
        </Input>
        <Input
          classNameInput={`form__input ${
            errors["auth-password"] && "form__input_type_error"
          }`}
          classNameLabel="form__label"
          type="password"
          name="auth-password"
          placeholder="Пароль"
          required="required"
          label="Пароль"
          value={values["auth-password"]}
          onChange={(e) => handleChange(e)}
        >
          <span className="form__input-error">
            {errors["auth-password"]}
          </span>
        </Input>
      </AuthForm>
    </main>
  );
}


// /* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect } from "react";
// import AuthForm from "../AuthForm/AuthForm";
// import Input from "../Input/Input";
// import useFormValidation from "../../hooks/useFormValidation";

// export default function Login({ handleLogin, error, setError, isLoading }) {
//   const initialValues = {
//     "auth-email": "",
//     "auth-password": "",
//   };

//   const validationRules = {
//     "auth-email": [
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
//     "auth-password": [
//       {
//         regex: /^(?!\s*$).+/,
//         message: "Поле обязательно для заполнения",
//       },
//     ],
//   };

//   const { handleChange, values, errors, isValid } = useFormValidation(
//     initialValues,
//     validationRules
//   );

//   useEffect(() => {
//     return () => {
//       setError("");
//     };
//   }, []);

//   return (
//     <main>
//       <AuthForm
//         title="Рады видеть!"
//         name="login"
//         onSubmit={() =>
//           handleLogin(values["auth-email"], values["auth-password"])
//         }
//         textButton="Войти"
//         textUnderButton="Ещё не зарегистрированы?"
//         textLink="Регистрация"
//         path="/signup"
//         isFormLogin={true}
//         isValidLogin={isValid}
//         errorLogin={error}
//         isLoading={isLoading}
//       >
//         <Input
//           classNameInput={`form__input ${
//             errors["auth-email"] && "form__input_type_error"
//           }`}
//           classNameLabel="form__label"
//           type="email"
//           name="auth-email"
//           placeholder="E-mail"
//           required="required"
//           label="E-mail"
//           value={values["auth-email"]}
//           onChange={(e) => handleChange(e)}
//         >
//           <span className="form__input-error">{errors["auth-email"]}</span>
//         </Input>
//         <Input
//           classNameInput={`form__input ${
//             errors["auth-password"] && "form__input_type_error"
//           }`}
//           classNameLabel="form__label"
//           type="password"
//           name="auth-password"
//           placeholder="Пароль"
//           required="required"
//           label="Пароль"
//           value={values["auth-password"]}
//           onChange={(e) => handleChange(e)}
//         >
//           <span className="form__input-error">
//             {errors["auth-password"]}
//           </span>
//         </Input>
//       </AuthForm>
//     </main>
//   );
// }