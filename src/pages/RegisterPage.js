import Register from '../components/Register/Register';

const RegisterPage = ({ handleRegister, status, setStatus, isLoading }) => {
    return (
        <Register handleRegister={handleRegister} status={status} setStatus={setStatus} isLoading={isLoading} />
    );
};

export default RegisterPage;

// import Register from '../components/Register/Register';

// function RegisterPage({ onRegister, setIsError, name }) {
//     return (
//         <main>
//             <Register name={name} onRegister={onRegister} setIsError={setIsError}/>
//         </main>
//     );
// }

// export default RegisterPage;


// import Register from "../components/Register/Register";

// function RegisterPage({ handleRegister, status, setStatus, isLoading }) {
//   return (
//     <main>
//       <Register
//         handleRegister={handleRegister}
//         status={status}
//         setStatus={setStatus}
//         isLoading={isLoading}
//       />
//     </main>
//   );
// }

// export default RegisterPage;
