import Header from '../components/Header/Header';
import Profile from '../components/Profile/Profile';

function ProfilePage({
    isLoggedIn,
    handleLogout,
    error,
    setError,
    isLoading,
    handleUpdateUser,
    isEdit,
    setIsEdit,
}) {
    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <Profile
                handleLogout={handleLogout}
                error={error}
                setError={setError}
                isLoading={isLoading}
                handleUpdateUser={handleUpdateUser}
                isEdit={isEdit}
                setIsEdit={setIsEdit} />
        </>
    );
};

export default ProfilePage;
