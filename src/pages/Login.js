import Login from '../components/Login/Login';

function LoginPage({ setLoggedIn }) {
    return (
        <main>
            <Login setLoggedIn={setLoggedIn} />
        </main>
    );
}

export default LoginPage;