import {  useNavigate , Outlet,Navigate } from 'react-router-dom'
import { useAuth } from '../Auth/AuthProvider'
import { useState , useEffect} from 'react';
import Login from '../Components/SetupUser/login';
import Navbar from '../Components/Misc/navbar';
import "./js.css"

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const {user} = useAuth();
  const [showComponent, setShowComponent] = useState(false); // Initially hidden
  

  useEffect(() => {
    // Set a timer to update state after a delay
    const timer = setTimeout(() => {
     
      setShowComponent(true); // Show component after delay
    }, 400); // 3 seconds delay

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run only on mount

  return (
  <>
   {showComponent ? (
        <>
       
         {
          user ? <Outlet/> : <Navigate to='/login'/>
         }
         
        </>
      ) : (
        <div class="loader-container">
  <div class="loader"></div>
</div>
      )}
   {/* { showComponent ?  <> <Navbar/> {true ? <Outlet/> : <Navigate to='/login'/>)}:(<div>Loading</div>)} */}
   
   </>)
//   const [trigger, settrigger] = useState(false);
//   useEffect(() => {

//     const timeoutId = setTimeout(() => {
//       if(!user){
//       settrigger(true)
//       }
//     }, 400);

//     // Cleanup function to clear the timeout if the component unmounts
//     return () => clearTimeout(timeoutId);
    

    
//   }, [user]);

//   const redirect = () => {
//     navigate('/login')

//   }
    
    
// return(
//   <>
//  <Navbar/>
//   {user && <Outlet/>}
//   {trigger && redirect()}
//   </>
// )

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

export default ProtectedRoutes;
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

