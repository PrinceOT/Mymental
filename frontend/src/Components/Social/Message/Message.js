import React from "react";
import { useContext,useRef,useEffect } from "react";
import '../../../App.scss'
import { useAuth } from "../../../Auth/AuthProvider";
import { format } from "timeago.js";



const Message = ({message}) => {
  const {user} = useAuth();
    const messageClass = message.senderId === user.uid ? true : false
   //console.log(messageClass);
   const ref = useRef()
   
   useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"})


   },[message])
    return(
        <>
            {!messageClass ? (
        <div class="message">
        <div class="reply">
          <p class="text"> {message.input} </p>
          <p class="response-time"> {format((message.date)?.toDate())}</p>
        </div></div>):(

        <div class="message">
            <div class="response">
          <p class="text"> {message.input}</p>
          <p class="time"> {format((message.date)?.toDate())}</p>
        </div> </div>
        // 
        // <div class="message text-only">
        //   <div class="response">
        //     <p class="text"> Hey Megan ! It's been a while 😃</p>
        //   </div>
        // <
        // <div class="message text-only">
        //   
        //     <p class="text"> When can we meet ?</p>
        //   </div>
        // </div>
        // <p class="response-time time"> 15h04</p>
        // <div class="message">
        
        //   <p class="text"> 9 pm at the bar if possible 😳</p>
        // </div>
        // <p class="time"> 15h09</p>
            )}
      </>
    )
}
export default Message;