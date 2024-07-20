import React, { createContext, useReducer } from 'react';

import { useAuth } from '../../../Auth/AuthProvider';
//const axios = require('axios');

 const ChatContext = createContext();

//const authUser = auth.currentUser;



 const ChatContextProvider = ({ children }) => {
    // const [reloadCounter, setReloadCounter] = useState(0);
    // const [user, setUser] = useState(null);
   const{user} = useAuth();
  
    // useEffect(() => {
    //   const unsubscribe = onAuthStateChanged(auth ,(authUser) => {
    //     setUser(authUser);
    //   });
  
    //   return () => unsubscribe();
    // }, []);
  const INITIAL_STATE = {
    chatId:"null",
    user:{}
  }
 const chatReducer = (state,action)=>{
  console.log(action);
    switch(action.type){
        case "CHANGE_USER":
            return{
                user:action.payload,
                chatId: user.uid > action.payload.uid 
                ? user.uid + action.payload.uid
                : action.payload.uid + user.uid,

            };

            default:
                return state;
    }
    
 }
 const [state,dispatch] = useReducer(chatReducer,INITIAL_STATE);

  
   
    return (<ChatContext.Provider value={{data:state,dispatch}}>{children}</ChatContext.Provider>);
  };
  export {ChatContextProvider,ChatContext}
  
  