import Login from '../components/Login/Login';

const LoginPage = ({ handleLogin, status, setStatus, isLoading }) => {
    return (
        <Login handleLogin={handleLogin} status={status} setStatus={setStatus} isLoading={isLoading} />
    );
};

export default LoginPage;


// import Login from '../components/Login/Login';

// function LoginPage({ onLogin, setIsError, name }) {
//     return (
//         <main>
//             <Login onLogin={onLogin} setIsError={setIsError} name={name}/>
//         </main>
//     );
// }

// export default LoginPage;

// import Login from '../components/Login/Login';

// function LoginPage({ handleLogin, status, setStatus, isLoading }) {
//     return (
//         <main>
//             <Login handleLogin={handleLogin} status={status} setStatus={setStatus} isLoading={isLoading} />
//         </main>
//     );
// }

// export default LoginPage;