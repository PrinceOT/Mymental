import React, { useRef ,useEffect,useState, useContext } from 'react'
import { auth , db} from '../../../Auth/firebase';
import {collection,onSnapshot,query,orderBy,doc} from 'firebase/firestore'
import Message from './Message';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../../../App.scss"
import Send from './Send';
import { useAuth } from '../../../Auth/AuthProvider';
import { ChatContext } from './ChatContext';
import Search from './Search';
import { format } from 'timeago.js';
import logo from '../../../logol.png'
import { emojify } from 'node-emoji';





const Chat = () => {
    const {user} = useAuth();
    const [messages,setMessages] = useState([]);
   
    const [chat,setChat] = useState(null);
   
    const {dispatch} = useContext(ChatContext);
    const {data} = useContext(ChatContext);

    useEffect(()=> {
      if(user && data.chatId){
      const getChats= () =>{
        
       
      const unsub = onSnapshot(doc(db,"userchats",user.uid),(doc)=>{
        setMessages(doc.data());
        console.log(doc.data())
 
      })
      
      return()=>{
        unsub();
      };
    };
   user.uid && getChats();
  

   

     const unSub = onSnapshot(doc(db,"messages",data.chatId),(doc)=>{
      doc.exists() && setChat(doc.data().messages);
      doc.exists() && console.log(doc.data().messages.date);
     });
    

       return () =>{
        unSub();
        }}

    },[user && data.chatId])

   const handleSelect = (u) =>{
    dispatch({type:"CHANGE_USER",payload:u.userInfo})
    
    
console.log(u);
    
    // var element = document.getElementByClassName("disscussion");
    // element.className = "discussion message-active"
    // element.classList.remove("discussion message-active");
    // element.classList.add("discussion");

    //console.log(element)
    //element.classList.toggle("discussion");
   }
    
    return(
        <div class="n">
  <div class="containerb">
    <div class="rows">
     

      <section class="discussions">
        <Search/>
        
        {/* <div class="discussion search">
          <div class="searchbar">
         
            <input type="text" placeholder="Search..."></input>
          </div>
        </div> */}
        {Object.entries(messages)?.sort((a,b)=>b[1].date - a[1].date).map((message) => (

        
        <div className="discussion" id='message' key={message[0]} onClick={()=>handleSelect(message[1])}>
          
            <img src={message[1].userInfo?.profilepic} class="photo"/>
            {/* <div class="online"></div> */}
         
          <div class="desc-contact">
            <p class="name">{message[1]?.userInfo?.username}</p>
            <p class="message">{message[1].lastMessage?.input}</p>
          </div>
          <div class="timer">{format((message[1]?.date)?.toDate())}</div>
        </div>
))}
        
      </section>
       { chat  ? (
      <section class="chat">
        <div class="header-chat">
         
          <img src={data.user?.profilepic} class="photo" >
          </img>
          <p class="name">{data.user?.username}</p>
          <i class="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
        </div>
        <div class="messages-chat"  style={{  overflow:"hidden"}}>
        {chat && chat.map((message)=>(
            <Message key={message.id} message={message}/>
        ))}
        </div>
       
        <Send/>
       {/* // <span ref={scroll}></span> */}
      </section> ):
      ( <section class="chat">
      <div style={{width:"80vw", height:"100vh",margin:"250px 150px",position:"relative", overflow:"hidden"}}>
         <img src={logo}/> 
         <h2 style={{fontWeight:"300",fontSize:"2rem"}}>Select or Search a chat and start chatting</h2>
         </div> 
      </section>)}
    </div>
  </div>
</div>
    );


};
export default Chat;