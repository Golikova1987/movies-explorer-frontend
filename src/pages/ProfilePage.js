import Header from '../components/Header/Header';
import Profile from '../components/Profile/Profile';

const ProfilePage = ({
    isLoggedIn,
    handleSignOut,
    status,
    setStatus,
    isLoading,
    handleUpdateUser,
    isEdit,
    setIsEdit,
}) => {
    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <Profile
                handleSignOut={handleSignOut}
                status={status}
                setStatus={setStatus}
                isLoading={isLoading}
                handleUpdateUser={handleUpdateUser}
                isEdit={isEdit}
                setIsEdit={setIsEdit} />
        </>
    );
};

export default ProfilePage;


// import Header from '../components/Header/Header';
// import Profile from '../components/Profile/Profile';

// function ProfilePage({ loggedIn, logOut, editUserData, isSuccess, setSuccess, setIsEdit, isEdit, name }) {
//     return (
//         <>
//             <Header loggedIn={loggedIn} />
//             <main>
//                 <Profile 
//                     logOut={logOut}
//                     editUserData={editUserData}
//                     isSuccess={isSuccess}
//                     setIsSuccess={setSuccess}
//                     setIsEdit={setIsEdit}
//                     isEdit={isEdit}
//                     name={name} 
//                 />
//             </main>
//         </>
//     );
// }

// export default ProfilePage;

// import Header from "../components/Header/Header";
// import Profile from "../components/Profile/Profile";

// function ProfilePage({
//   loggedIn,
//   handleSignOut,
//   status,
//   setStatus,
//   isLoading,
//   handleUpdateUser,
//   isEdit,
//   setIsEdit,
// }) {
//   return (
//     <>
//       <Header loggedIn={loggedIn} />
//       <main>
//         <Profile
//           handleSignOut={handleSignOut}
//           status={status}
//           setStatus={setStatus}
//           isLoading={isLoading}
//           handleUpdateUser={handleUpdateUser}
//           isEdit={isEdit}
//           setIsEdit={setIsEdit}
//         />
//       </main>
//     </>
//   );
// }

// export default ProfilePage;
