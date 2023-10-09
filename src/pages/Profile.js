import Header from '../components/Header/Header';
import Profile from '../components/Profile/Profile';

function ProfilePage({ loggedIn, setLoggedIn }) {
    return (
        <>
            <Header loggedIn={loggedIn} />
            <main>
                <Profile setLoggedIn={setLoggedIn} />
            </main>
        </>
    );
}

export default ProfilePage;