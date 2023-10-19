/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import AuthForm from "../AuthForm/AuthForm";
import Input from "../Inputs/Input";
import useFormWithValidation from "../../hooks/useFormWithValidation";

const Register = ({ handleRegister, status, setStatus, isLoading }) => {
  const initialValues = {
    "auth-name": "",
    "auth-email": "",
    "auth-password": "",
  };

  const validationRules = {
    "auth-name": [
      {
        regex: /^(?!\s*$).+/,
        message: "Поле обязательно для заполнения",
      },
      {
        regex: /^[A-Za-zА-Яа-я\s-]+$/,
        message:
          "Поле может содержать только латиницу, кириллицу, пробел или дефис",
      },
      {
        regex: /^.{2,30}$/,
        message: "Поле должно содержать от 2 до 30 символов",
      },
    ],
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
      {
        regex: /^.{8,}$/,
        message: "Пароль должен содержать как минимум 8 символов",
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
        title="Добро пожаловать!"
        name="auth-reg"
        onSubmit={() =>
          handleRegister(
            values["auth-name"],
            values["auth-email"],
            values["auth-password"]
          )
        }
        textButton="Зарегистрироваться"
        textParagraph="Уже зарегистрированы?"
        textLink="Войти"
        path="/signin"
        isValid={isValid}
        status={status}
        isLoading={isLoading}
      >
        <Input
          classNameInput={`auth-form__input ${
            errors["auth-name"] && "auth-form__input_type_error"
          }`}
          classNameLabel="auth-form__label"
          type="text"
          name="auth-name"
          placeholder="Имя"
          label="Имя"
          required="required"
          maxLength="30"
          minLength="2"
          value={values["auth-name"]}
          onChange={(e) => handleChange(e)}
        >
          <span className="auth-form__input-error">{errors["auth-name"]}</span>
        </Input>
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

export default Register;


// import Input from "../Input/Input.jsx";
// import AuthForm from "../AuthForm/AuthForm.jsx";
// import useFormValidation from "../../hooks/useFormValidation.js";

// export default function Register({ onRegister, setIsError, name }) {
//   const { value, error, isInputValid, isValid, handleChange, } = useFormValidation();
  
//   function onSubmit(evt) {
//     evt.preventDefault()
//     onRegister(value.name, value.email, value.password)
//   };

//   return (
//     <AuthForm
//       title="Добро пожаловать!"
//       // name="signup"
//       textButton="Зарегистрироваться"
//       textUnderButton="Уже зарегистрированы?"
//       textLink="Войти"
//       path="/signin"
//       onSubmit={onSubmit}
//       setIsError={setIsError}
//       name={name}
//       isValid={isValid}
//     >
//       <Input
//         classNameInput="form__input"
//         classNameLabel="form__label"
//         type="text"
//         name="name"
//         placeholder="Имя"
//         label="Имя"
//         required="required"
//         minLength="2"
//         maxLength="30"
//         value={value.name}
//         isInputValid={isInputValid.name}
//         error={error.name}
//         onChange={(evt) => {
//           handleChange(evt)
//           setIsError(false)
//         }}
//       >
//         <span className="form__error"></span>
//       </Input>
//       <Input
//         classNameInput="form__input"
//         classNameLabel="form__label"
//         type="email"
//         name="email"
//         label="E-mail"
//         placeholder="E-mail"
//         required="required"
//         value={value.email}
//         isInputValid={isInputValid.email}
//         error={error.email}
//         onChange={(evt) => {
//           handleChange(evt)
//           setIsError(false)
//         }}
//       >
//         <span className="form__error"></span>
//       </Input>
//       <Input
//         classNameInput="form__input form__input_type_error"
//         classNameLabel="form__label"
//         name="password"
//         type="password"
//         placeholder="Пароль"
//         label="Пароль"
//         required="required"
//         value={value.password}
//         isInputValid={isInputValid.password}
//         error={error.password}
//         onChange={(evt) => {
//           handleChange(evt)
//           setIsError(false)
//         }}
//       >
//         <span className="form__error"></span>
//       </Input>
//     </AuthForm>
//   );
// }



// import Input from "../Input/Input.jsx";
// import AuthForm from "../AuthForm/AuthForm.jsx";
// import useFormValidation from "../../hooks/useFormValidation.js";
// import { useEffect } from "react";

// const Register = ({ handleRegister, status, setStatus, isLoading }) => {
//   const initialValues = {
//     "name": "",
//     "email": "",
//     "password": "",
//   };

//   const validationRules = {
//     "name": [
//       {
//         regex: /^(?!\s*$).+/,
//         message: "Поле обязательно для заполнения",
//       },
//       {
//         regex: /^[A-Za-zА-Яа-я\s-]+$/,
//         message:
//           "Поле может содержать только латиницу, кириллицу, пробел или дефис",
//       },
//       {
//         regex: /^.{2,30}$/,
//         message: "Поле должно содержать от 2 до 30 символов",
//       },
//     ],
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
//       {
//         regex: /^.{8,}$/,
//         message: "Пароль должен содержать как минимум 8 символов",
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
//       <AuthForm
//         title="Добро пожаловать!"
//         name="register"
//         onSubmit={() =>
//           handleRegister(
//             values["name"],
//             values["email"],
//             values["password"]
//           )
//         }
//         textButton="Зарегистрироваться"
//         textParagraph="Уже зарегистрированы?"
//         textLink="Войти"
//         path="/signin"
//         isValid={isValid}
//         status={status}
//         isLoading={isLoading}
//       >
//         <Input
//           classNameInput={`form__input ${
//             errors["name"] && "form__input_type_error"
//           }`}
//           classNameLabel="form__label"
//           type="text"
//           name="name"
//           placeholder="Имя"
//           label="Имя"
//           required="required"
//           maxLength="30"
//           minLength="2"
//           value={values["name"]}
//           onChange={(e) => handleChange(e)}
//         >
//           <span className="form__error">{errors["name"]}</span>
//         </Input>
//         <Input
//           classNameInput={`form__input ${
//             errors["email"] && "form__input_type_error"
//           }`}
//           classNameLabel="form__label"
//           type="email"
//           name="email"
//           placeholder="E-mail"
//           required="required"
//           label="E-mail"
//           value={values["email"]}
//           onChange={(e) => handleChange(e)}
//         >
//           <span className="form__error">{errors["email"]}</span>
//         </Input>
//         <Input
//           classNameInput={`form__input ${
//             errors["password"] && "form__input_type_error"
//           }`}
//           classNameLabel="form__label"
//           type="password"
//           name="password"
//           placeholder="Пароль"
//           required="required"
//           label="Пароль"
//           value={values["password"]}
//           onChange={(e) => handleChange(e)}
//         >
//           <span className="form__error">
//             {errors["password"]}
//           </span>
//         </Input>
//       </AuthForm>
//   );
// };

// export default Register;


