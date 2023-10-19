import Main from '../components/Main/Main';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const MainPage = ({ isLoggedIn }) => {
    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <Main />
            <Footer />
        </>
    );
};

export default MainPage;


// import Main from '../components/Main/Main';
// import Header from '../components/Header/Header';
// import Footer from '../components/Footer/Footer';

// function MainPage({ isloggedIn }) {
//     return (
//         <>
//             <Header isloggedIn={isloggedIn} />
//             <Main />
//             <Footer />
//         </>
//     );
// }

// export default MainPage;