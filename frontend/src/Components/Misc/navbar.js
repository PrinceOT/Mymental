// components/Navbar.js
import React from 'react';
import { useState , useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {IonIcon} from '@ionic/react'
import { home,reader, gameController, trendingUp, statsChart, person ,help, chatbubbleEllipses,power} from 'ionicons/icons';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthProvider';
//import './Navbar.css'; // Import your CSS file for styling 

import logo from '../../logol.png'


const Navbar = () => {
  const {  signOut,user } = useAuth();
  const location = useLocation();
  const [log, setlog] = useState(true);
  //console.log(location.pathname)
  useEffect(() => {setlog(true);
    if(location.pathname === "/login" || location.pathname === "/register" ){
      setlog(false)
    }
    
  }, [location]);
  return(
  <>
  {/* <body>
  <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
  </body> */}
   {log && <nav id="navbar">
    <ul class="navbar-items flexbox-col">
      <li class="navbar-logo flexbox-left">
        <a class="navbar-item-inner flexbox">
          {/* <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 1438.88 1819.54">
            <polygon points="925.79 318.48 830.56 0 183.51 1384.12 510.41 1178.46 925.79 318.48" />
            <polygon points="1438.88 1663.28 1126.35 948.08 111.98 1586.26 0 1819.54 1020.91 1250.57 1123.78 1471.02 783.64 1663.28 1438.88 1663.28" />
          </svg> */}
          <img src={logo} />
        </a>
      </li>
     
      <li class="navbar-item flexbox-left">
        <a class="navbar-item-inner flexbox-left" href='/mymental'>
          
          <div class="navbar-item-inner-icon-wrapper flexbox">
          <IonIcon icon={home}></IonIcon>
          </div> 
          <span class="link-text">Home</span>
        </a> 
      </li>
     
      <li class="navbar-item flexbox-left">
        <a class="navbar-item-inner flexbox-left" href='/assessment'> 
          <div class="navbar-item-inner-icon-wrapper flexbox">
          <IonIcon icon={reader}></IonIcon>
          </div> 
          <span class="link-text">Self Assess</span>  
        </a> 
      </li>
      
      <li class="navbar-item flexbox-left">
        <a class="navbar-item-inner flexbox-left" href='/gameview'>
          <div class="navbar-item-inner-icon-wrapper flexbox">
          <IonIcon icon={gameController}></IonIcon>
          </div>
          <span class="link-text">Games</span>
        </a>
      </li>
      <li class="navbar-item flexbox-left">
        <a class="navbar-item-inner flexbox-left" href='/mymental/tracker'>
          <div class="navbar-item-inner-icon-wrapper flexbox">
          <IonIcon icon={statsChart}></IonIcon>
          </div>
          <span class="link-text">Tracker</span>
        </a>
      </li>
      <li class="navbar-item flexbox-left">
        <a class="navbar-item-inner flexbox-left" href='/mymental/getsupport'>
          <div class="navbar-item-inner-icon-wrapper flexbox">
          <IonIcon icon={help}></IonIcon>
          </div>
          <span class="link-text">Support</span>
        </a>
      </li>
      <li class="navbar-item flexbox-left">
        <a class="navbar-item-inner flexbox-left" href='/message'>
          <div class="navbar-item-inner-icon-wrapper flexbox">
          <IonIcon icon={chatbubbleEllipses}></IonIcon>
          </div>
          <span class="link-text">Chat</span>
        </a>
      </li>
      <li class="navbar-item flexbox-left">
        <a class="navbar-item-inner flexbox-left" href='/mymental/profile'>
          <div class="navbar-item-inner-icon-wrapper flexbox">
          <IonIcon icon={person}></IonIcon>
          </div>
          <span class="link-text">Profile</span>
        </a>
      </li>
      <li class="navbar-item flexbox-left">
        <a class="navbar-item-inner flexbox-left" onClick={signOut} href='/login'>
          <div class="navbar-item-inner-icon-wrapper flexbox">
          <IonIcon icon={power}></IonIcon>
          </div>
          <span class="link-text">Log out</span>
        </a>
      </li>
    </ul>
  </nav>}

{/* <body>
  <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
  </body> */}
</>);
};


export default Navbar;
