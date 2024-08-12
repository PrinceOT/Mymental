
import './App.scss';
import { BrowserRouter as Router, Route, Switch, NavLink, Routes, BrowserRouter } from 'react-router-dom';
//import './Components/Assess.css'
//import Nav from './Components/Nav'
import Selfform from './Components/Information/Assessment2'
import Navbar from './Components/Misc/navbar';
//import Quiz from './Components/Assessment'
import React from 'react';
//import {logo1} from './Components/mymentall.jpg'
import LineChart from './Components/Information/Tracker';
import './Components/Navbar.css'; // Import your CSS file for styling


import Register from './Components/SetupUser/signup';
import Login from './Components/SetupUser/login';


import HomePage from './Components/Familiarity/Gaming/Gampepage';
import GameEmbed from './Components/Familiarity/Gaming/Gameplay';


import Feed from './Components/Social/Timeline/Feed';
import Profile from './Components/Profile/Profile';
import ProfileEdit from './Components/Profile/ProfileEdit';
import Support from './Components/Information/support';
import ProtectedRoutes from './Auth/protectedRoutes';

import Chat from './Components/Social/Message/Chat';
import { AuthProvider, useAuth } from './Auth/AuthProvider';
import PublicRoutes from './Auth/publicRoutes';


function App() {
  const {user} = useAuth()
  
 // lnAWdfOMpJtQ3Tm8 lnAWdfOMpJtQ3Tm8


  return ( 
    
    
   
<BrowserRouter style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
 <Navbar/>
 {/* <Navbar/>  */}

{/* <Navbar/> */}

<Routes>

<Route  element={    <ProtectedRoutes user={user}/> }>

<Route path = '/mymental' element={    <Feed/> }/>
<Route path = '/mymental/tracker' element={  <LineChart/>}></Route>

<Route path = '/mymental/profile' element={<Profile/>}/>
<Route path = '/mymental/profile/edit' element={<ProfileEdit/>}/>

</Route>
<Route path = '/message' element={<Chat/>}/>
<Route  element={    <PublicRoutes user={user}/> }>
<Route path = '/login' element={<Login/>}></Route>
<Route path='/register' element={<Register/>}></Route> 
</Route>



{/* </Route> */}
<Route path="*" element={<p style={{margin:"300px"}}>There's nothing here: 404!</p>} />



<Route path = '/assessment' element={<Selfform/>}></Route>
<Route path = '/gameview' element={<HomePage/>}></Route>
{/* //<Route path = '/game' element={<GameView {...score}/>}></Route> */}

<Route path = '/gameplay' element={<GameEmbed/>}></Route>

<Route path = '/mymental/getsupport' element={<Support style={{marginLeft:"100px"}}/>}></Route>




</Routes>

</BrowserRouter>

   
  );
}

export default App;
