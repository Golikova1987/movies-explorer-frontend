import SavedMovies from '../components/SavedMovies/SavedMovies';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function SavedMoviesPage ({
    isLoggedIn,
    savedMovies,
    handleDeleteMovie,
}) {
    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <SavedMovies
                savedMovies={savedMovies}
                handleDeleteMovie={handleDeleteMovie}
            />
            <Footer />
        </>
    );
};

export default SavedMoviesPage;