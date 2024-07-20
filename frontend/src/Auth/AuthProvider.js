// AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {auth,db} from './firebase';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth"
import Register from '../Components/SetupUser/signup'
import { signupuser } from '../Dbqueries/qprofile';
import axios from 'axios';
import { setDoc,doc } from 'firebase/firestore';
//const axios = require('axios');

const AuthContext = createContext();

const authUser = auth.currentUser;

const AuthProvider = ({ children }) => {
  const [reloadCounter, setReloadCounter] = useState(0);
  const [user, setUser] = useState(null);
 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth ,(authUser) => {
      setUser(authUser);
      
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    try{
      
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    //console.log('provide');
    } catch(error){
      if(error.code === "auth/invalid-email"){
       
        return "User inValid"
      }
        else{
          return [error.code]
        }

    }
  
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const register = async (email, password,username) => {
    const pic =[
    {id:1 , url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Oliver&backgroundColor=8d5524,a26d3d,b68655,cb9e6e,eac393,f5cfa0,ffdbac&mouthColor=c98276,d29985,e35d6a'},
    {id:2 , url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Annie&backgroundColor=8d5524,a26d3d,b68655,cb9e6e,eac393,f5cfa0,ffdbac&mouthColor=c98276,d29985,e35d6a'},
    {id:3, url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Tiger&backgroundColor=8d5524,a26d3d,b68655,cb9e6e,eac393,f5cfa0,ffdbac&mouthColor=c98276,d29985,e35d6a'},
    {id:4, url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Buddy&backgroundColor=8d5524,a26d3d,b68655,cb9e6e,eac393,f5cfa0,ffdbac&mouthColor=c98276,d29985,e35d6a'},
    {id:5 , url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=kitty&backgroundColor=eac393,f5cfa0,ffdbac,ffdfbf&mouthColor=c98276,d29985,transparent'},
    {id:6 , url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Sadie&backgroundColor=eac393,f5cfa0,ffdbac,ffdfbf&mouthColor=c98276,d29985,transparent'},
    {id:7, url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Fluffy&backgroundColor=eac393,f5cfa0,ffdbac,ffdfbf&mouthColor=c98276,d29985,transparent'},
    {id:8, url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Trouble&backgroundColor=eac393,f5cfa0,ffdbac,ffdfbf&mouthColor=c98276,d29985,transparent'}
  ]
  const num = Math.floor(Math.random() * (8));
    try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await setDoc(doc(db,"users",userCredential.user.uid),{
      uid:userCredential.user.uid,
      username:username,
      email:email,
      profilepic:pic[num].url
    });
    await setDoc(doc(db,"userchats",userCredential.user.uid),{});
    
     console.log(userCredential.user)
    
  
     const response = await signupuser(username,password,email,userCredential.user.uid,pic[num].url);
     return "User created";
   
     } 
     catch (error) {
      if(error.code === "auth/email-already-in-use"){
       
        return "User Declined";
      
    }
      else{
        console.error(error.code)
      }
  
  }
  
  
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  // });
};
//register(email,username,password);

  //   try {
  //     await auth.createUserWithEmailAndPassword(email, password);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const value = {
    user,
    signIn,
    signOut,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth  };
