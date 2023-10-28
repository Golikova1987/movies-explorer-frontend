import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Movies from '../components/Movies/Movies';

function MoviesPage({
    isLoggedIn,
    handleDeleteMovie,
    isLoading,
    handleCreateMovie,
    savedMovies,
}) {
    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <Movies
                isLoading={isLoading}
                handleCreateMovie={handleCreateMovie}
                savedMovies={savedMovies}
                handleDeleteMovie={handleDeleteMovie}
            />
            <Footer />
        </>
    );
};

export default MoviesPage;