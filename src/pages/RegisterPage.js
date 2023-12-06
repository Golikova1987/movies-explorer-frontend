import Register from '../components/Register/Register';

function RegisterPage({ handleRegister, error, setError, isLoading }) {
    return (
        <Register handleRegister={handleRegister} error={error} setError={setError} isLoading={isLoading} />
    );
};

export default RegisterPage;
