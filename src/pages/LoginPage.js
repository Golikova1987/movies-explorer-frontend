import Login from '../components/Login/Login';

function LoginPage({ handleLogin, error, setError, isLoading }) {
    return (
        <Login handleLogin={handleLogin} error={error} setError={setError} isLoading={isLoading} />
    );
};

export default LoginPage;