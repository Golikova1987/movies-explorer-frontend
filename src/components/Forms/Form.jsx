const Form = ({ children, name, onSubmit, className }) => {
  return (
      <form className={className} name={name} onSubmit={onSubmit} noValidate>
          {children}
      </form>
  )
}

export default Form;



//laiv

// import { useContext, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import CurrentUserContext from "../../contexts/CurrentUserContext";
// // import ErrorContext from "../../contexts/ErrorContext";
// // import SendContext from "../../contexts/SendContext";

// export default function Form({ children, name, onSubmit, className, setSuccess, setIsEdit, setIsError,  }) {
//   const { pathname } = useLocation()
//   // const isError = useContext(ErrorContext)
//   // const isSend = useContext(SendContext)
//   // const currentUser = useContext(CurrentUserContext);

//   useEffect(() => {
//     setIsError(false)
//   }, [setIsError])

//   useEffect(() => {
//     if (pathname === '/profile') {
//       setSuccess(false)
//       setIsEdit(false)
//     }
//   }, [setSuccess, setIsEdit, pathname])

//   return (
//       <form className={className} name={name} onSubmit={onSubmit} noValidate>
//           {children}
//       </form>
//   );
// }