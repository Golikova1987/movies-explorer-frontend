import React from "react";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import NavPage from "../NavPage/NavPage";
import Portfolio from "../Portfolio/Portfolio";
// import Register from "../Register/Register";
// import Login from "../Login/Login";
// import SavedMovies from "../SavedMovies/SavedMovies";
// import Profile from "../Profile/Profile";
// import Error from '../Error/Error';
// import Movies from "../Movies/Movies";

const Main = () => {
  return (
    <main className="main">
      <Promo />
      <NavPage />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
};

export default Main;

// export default function Main({
//   name,
//   onRegister,
//   onLogin,
//   logOut,
//   editUserData,
//   setIsError,
//   savedMovies,
//   onDelete,
//   addMovie,
//   isSuccess,
//   setSuccess,
//   setIsEdit,
//   isEdit
// }) {
//   return (
//     <main className="content">
//       {{
//         home:
//           <>
//             <Promo/>
//             <NavTab/>
//             <AboutProject/>
//             <Techs/>
//             <AboutMe/>
//             <Portfolio/>
//           </>,
//         signin: <Login name={name} onLogin={onLogin} setIsError={setIsError}/>,
//         signup: <Register name={name} onRegister={onRegister} setIsError={setIsError}/>,
//         // error: <Error/>,
//         profile: <Profile
//           name={name}
//           logOut={logOut}
//           editUserData={editUserData}
//           isSuccess={isSuccess}
//           setIsSuccess={setSuccess}
//           setIsEdit={setIsEdit}
//           isEdit={isEdit}
//         />,
//         movies:
//           <>
//             <Movies savedMovies={savedMovies} addMovie={addMovie} setIsError={setIsError}/>
//           </>,
//         savedmovies:
//           <>
//             <SavedMovies savedMovie={savedMovies} onDelete={onDelete} setIsError={setIsError}  />
//           </>
//       }[name]}
//     </main>
//   );
// }


// export default function Main() {
//   return (
//     <main className="content">
//       <Promo/>
//       <NavTab/>
//       <AboutProject/>
//       <Techs/>
//       <AboutMe/>
//       <Portfolio/>
//     </main>
//   );
// }

