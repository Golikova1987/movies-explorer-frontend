//import React, { useCallback } from "./react";
import React from "react";
import { useCallback } from "react";

//хук управления формой и валидации формы
function useFormValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());

    if (name === 'name') {
      if (!target.checkValidity()) {
        setErrors({ ...errors, [name]: 'Поле "Имя" должно содержать только латиницу, кириллицу, пробел и дефис. Количество символов: минимум 2' });
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    }

    if (name === 'password') {
      if (!target.checkValidity()) {
        setErrors({ ...errors, [name]: 'Минимальная длина символов для пароля: 6' });
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    }


    if (name === 'search') {
      if (value === null || value === '') {
        setErrors({ ...errors, [name]: 'Нужно ввести ключевое слово' });
    } else {
      setErrors({ ...errors, [name]: '' });
    }
  }

  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { setValues, values, handleChange, errors, isValid, resetForm };
}

export default useFormValidation;

// /* eslint-disable react-hooks/exhaustive-deps */
// import { useCallback, useEffect, useState } from 'react';

// const useFormValidation = (initialValues, validationRules) => {
//     const [values, setValues] = useState(initialValues || {});
//     const [errors, setErrors] = useState({});
//     const [isValid, setIsValid] = useState(false);

//     const handleChange = (event) => {
//         const target = event.target;
//         const name = target.name;
//         const value = target.value;

//         const validationRuleList = validationRules[name];
//         let customError = '';

//         if (validationRuleList) {
//             for (const validationRule of validationRuleList) {
//                 const regex = new RegExp(validationRule.regex);
//                 const isValidValue = regex.test(value);
//                 if (!isValidValue) {
//                     customError = validationRule.message;
//                     break;
//                 }
//             }
//         }

//         setValues({ ...values, [name]: value });
//         setErrors({ ...errors, [name]: customError });
//         setIsValid(target.closest("form").checkValidity());
//     };

//     const resetForm = useCallback(
//         (newValues = {}, newErrors = {}, newIsValid = false) => {
//             setValues(newValues);
//             setErrors(newErrors);
//             setIsValid(newIsValid);
//         },
//         [setValues, setErrors, setIsValid]
//     );

//     useEffect(() => {
//         if (initialValues) {
//             setValues(initialValues);
//         }
//     }, []);

//     return { values, handleChange, errors, isValid, resetForm };
// };

// export default useFormValidation;