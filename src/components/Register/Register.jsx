/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import AuthForm from "../AuthForm/AuthForm";
import Input from "../Input/Input";
import useFormValidation from "../../hooks/useFormValidation";

export default function Register({ handleRegister, error, setError, isLoading }) {
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

  const { values, handleChange, errors, isValid } = useFormValidation(
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
        title="Добро пожаловать!"
        name="register"
        onSubmit={() =>
          handleRegister(
            values["auth-name"],
            values["auth-email"],
            values["auth-password"]
          )
        }
        textButton="Зарегистрироваться"
        textUnderButton="Уже зарегистрированы?"
        textLink="Войти"
        path="/signin"
        isValid={isValid}
        error={error}
        isLoading={isLoading}
      >
        <Input
          classNameInput={`form__input ${
            errors["auth-name"] && "form__input_type_error"
          }`}
          classNameLabel="form__label"
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
          <span className="form__input-error">{errors["auth-name"]}</span>
        </Input>
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
          minLength="8"
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

// export default function Register({ handleRegister, error, setError, isLoading }) {

//   const { values, handleChange, errors, isValid, resetForm } = useFormValidation();

//   useEffect(() => {
//     resetForm();
//   }, [resetForm]);

//     useEffect(() => {
//     return () => {
//       setError("");
//     };
//   }, []);

//   function handleRegisterSubmit(evt) {
//     // Запрещаем браузеру переходить по адресу формы
//     evt.preventDefault();
//     handleRegister({
//       name: values.name,
//       email: values.email,
//       password: values.password,
//     });
//   }

//   return (
//     <main>
//       <AuthForm
//         title="Добро пожаловать!"
//         name="register"
//         handleSubmit={handleRegisterSubmit}
//         textButton="Зарегистрироваться"
//         textUnderButton="Уже зарегистрированы?"
//         textLink="Войти"
//         path="/signin"
//         disabled={!isValid}
//         error={error}
//         isLoading={isLoading}
//       >
//         <Input
//           classNameInput="form__input"
//           classNameLabel="form__label"
//           type="text"
//           name="name"
//           id="name"
//           placeholder="Имя"
//           label="Имя"
//           pattern="^[A-Za-zА-Яа-яЁё\-\s]+$"
//           required
//           maxLength="30"
//           minLength="2"
//           value={values.name || ""}
//           onChange={handleChange}
//         >
//           <span className={`form__input-error ${!isValid && errors.name ? "form__input_type_error" : ""}`}>{errors.name}</span>
//         </Input>
//         <Input
//           classNameInput="form__input"
//           classNameLabel="form__label"
//           type="email"
//           name="email"
//           placeholder="E-mail"
//           required
//           label="E-mail"
//           value={values.email || ""}
//           onChange={handleChange}
//           autoComplete="off"
//           id="email"
//           pattern='[a-z0-9_]+@[a-z]+\.[a-z]{2,}$'
//         >
//           <span className={`form__input-error ${!isValid && errors.email ? "form__input_type_error" : ""}`}>{errors.email}</span>
//         </Input>
//         <Input
//           classNameInput="form__input"
//           classNameLabel="form__label"
//           type="password"
//           name="password"
//           placeholder="Пароль"
//           minLength="8"
//           label="Пароль"
//           value={values.password || ""}
//           onChange={handleChange}
//           autoComplete="off"
//           id="password"
//           required
//         >
//           <span className={`form__input-error ${!isValid && errors.password ? "form__input_type_error" : ""}`}> 
//             {errors.password}
//           </span>
//         </Input>
//       </AuthForm>
//     </main>
//   );
// }