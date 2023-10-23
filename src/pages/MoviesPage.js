import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Movies from '../components/Movies/Movies';

function MoviesPage({
    isLoggedIn,
    handleDeleteMovie,
    setFilteredMovies,
    isSearchMovies,
    setIsSearchMovies,
    isLoading,
    isLoadingMovies,
    filteredMovies,
    movies,
    handleCreateMovie,
    savedMovies,
}) {
    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <Movies
                movies={movies}
                isLoading={isLoading}
                isLoadingMovies={isLoadingMovies}
                filteredMovies={filteredMovies}
                setFilteredMovies={setFilteredMovies}
                handleCreateMovie={handleCreateMovie}
                savedMovies={savedMovies}
                handleDeleteMovie={handleDeleteMovie}
                isSearchMovies={isSearchMovies}
                setIsSearchMovies={setIsSearchMovies}
            />
            <Footer />
        </>
    );
};

export default MoviesPage;