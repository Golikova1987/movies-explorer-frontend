import SavedMovies from '../components/SavedMovies/SavedMovies';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function SavedMoviesPage({ loggedIn }) {
    return (
        <>
            <Header loggedIn={loggedIn} />
            <main>
                <SavedMovies />
            </main>
            <Footer />
        </>
    );
}

export default SavedMoviesPage;