import Main from '../components/Main/Main';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function MainPage({ loggedIn }) {
    return (
        <>
            <Header loggedIn={loggedIn} />
            <Main />
            <Footer />
        </>
    );
}

export default MainPage;