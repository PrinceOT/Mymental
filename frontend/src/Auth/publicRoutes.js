import {  useNavigate , Outlet } from 'react-router-dom'
import { useAuth } from '../Auth/AuthProvider'
import { useState , useEffect} from 'react';
import Login from '../Components/SetupUser/login';
import Navbar from '../Components/Misc/navbar';

const PublicRoutes = ({user}) => {
  const navigate = useNavigate();
  const [trigger, settrigger] = useState(false);
  useEffect(() => {

    const timeoutId = setTimeout(() => {
      if(user){
      settrigger(true)
      }
    }, 450);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
    

    
  }, [user]);

  const redirect = () => {
    navigate('/')

  }
    
    
return(
  <>
  {!user && <Outlet/>}
  {trigger && redirect()}
  </>
)

    // if(user){
    //   // console.log(user)
    //   return children
    // };
    // //console.log(user)
    //  return(<>{!user && <Navigate to="/login" replace={true}/> }</> );
    
    // useEffect(() => {
    //   if(user){
    //     setauth(user);
    //     console.log(auth)
    //   }
    //   console.log(user)
    // }, [user]);
    
   
};

export default PublicRoutes;
// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import {auth} from './firebase'; // Path to your firebase.js file
// import {onAuthStateChanged} from "firebase/auth"
// import { useAuth } from './AuthProvider';

// const RequireAuth = ({ children }) => {
//   const [auth, setauth] = useState(null);
//   const {user} = useAuth();

//   useEffect(() => {
//     if(user){
//         console.log(user);
// setauth(user)
//     }
    
//   }, [user]);

// //   if (!auth) {
// //     console.log(user);
// //     return <Navigate to="/login" />;
// //   }

//   return <>{children}</>;
// };

