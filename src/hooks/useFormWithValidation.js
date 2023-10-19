/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';

const useFormWithValidation = (initialValues, validationRules) => {
    const [values, setValues] = useState(initialValues || {});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        const validationRuleList = validationRules[name];
        let customError = '';

        if (validationRuleList) {
            for (const validationRule of validationRuleList) {
                const regex = new RegExp(validationRule.regex);
                const isValidValue = regex.test(value);
                if (!isValidValue) {
                    customError = validationRule.message;
                    break;
                }
            }
        }

        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: customError });
        setIsValid(target.closest("form").checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    useEffect(() => {
        if (initialValues) {
            setValues(initialValues);
        }
    }, []);

    return { values, handleChange, errors, isValid, resetForm };
};

export default useFormWithValidation;


// import { useCallback, useState } from "react";

// export default function useFormValidation() {
//   const [value, setValue] = useState({})
//   const [error, setError] = useState({})
//   const [isValid, setIsValid] = useState(false)
//   const [isInputValid, setIsInputValid] = useState({})
//   //console.log(isValid)

//   function handleChange(event) {
//     //console.log(event.target.form)
//     const name = event.target.name
//     const value = event.target.value
//     const validationMessage = event.target.validationMessage
//     const valid = event.target.validity.valid
//     const form = event.target.form

//     setValue((oldValue) => {
//       return { ...oldValue, [name] : value }
//     })

//     setError((oldError) => {
//       return { ...oldError, [name] : validationMessage }
//     })

//     setIsInputValid((oldIsInputValid) => {
//       return { ...oldIsInputValid, [name] : valid }
//     })

//     setIsValid(form.checkValidity())
//   }

//     function reset(data={}) {
//       setValue(data)
//       setError({})
//       setIsValid(false)
//       setIsInputValid({})
//     }

//     const setValues = useCallback((name, value) => {
//       setValue((oldValue) => {
//         return { ...oldValue, [name] : value }
//       })
//     },[])

//   return { value, error, isValid, isInputValid, handleChange, reset, setValues }

// }


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